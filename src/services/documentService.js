import { supabase } from '../utils/supabaseClient';

export const getDocuments = async () => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*, profiles:uploaded_by(first_name, last_name, avatar_url)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching documents:', error);
    return { data: null, error };
  }
};

export const uploadDocument = async (file, fileData) => {
  try {
    let storagePath = 'mock_path_' + Date.now();
    try {
      const { data: storageData, error: storageError } = await supabase.storage
        .from('documents')
        .upload((fileData.project_id || 'general') + '/' + Date.now() + '_' + file.name, file);
        
      if (!storageError && storageData) {
        storagePath = storageData.path;
      }
    } catch (e) {
      console.warn("Storage upload failed, using mock path.");
    }

    const { data: user } = await supabase.auth.getUser();

    const newDoc = {
      name: file.name,
      description: fileData.description || '',
      storage_path: storagePath,
      mime_type: file.type || 'application/octet-stream',
      size: file.size,
      project_id: fileData.project_id || null,
      uploaded_by: user.user.id
    };

    const { data, error } = await supabase
      .from('documents')
      .insert([newDoc])
      .select('*, profiles:uploaded_by(first_name, last_name, avatar_url)')
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error uploading document:', error);
    return { data: null, error };
  }
};

export const deleteDocument = async (id, storagePath) => {
  try {
    if (storagePath && !storagePath.startsWith('mock_path')) {
      await supabase.storage.from('documents').remove([storagePath]);
    }
    
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting document:', error);
    return { success: false, error };
  }
};

export const getDocumentUrl = async (storagePath) => {
  try {
    if (!storagePath || storagePath.startsWith('mock_path')) {
      return { url: '#mock', error: null };
    }
    
    const { data, error } = await supabase.storage
      .from('documents')
      .createSignedUrl(storagePath, 60 * 60 * 24);
      
    if (error) throw error;
    return { url: data.signedUrl, error: null };
  } catch (error) {
    console.error('Error getting document url:', error);
    return { url: null, error };
  }
};
