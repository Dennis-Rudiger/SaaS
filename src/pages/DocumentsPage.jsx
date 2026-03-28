import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { getDocuments, uploadDocument, deleteDocument, getDocumentUrl } from '../services/documentService';
import { useAuth } from '../contexts/AuthContext';

const DocumentsPage = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docDescription, setDocDescription] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    const { data } = await getDocuments();
    if (data) {
      setDocuments(data);
    }
    setLoading(false);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const { data, error } = await uploadDocument(selectedFile, {
      description: docDescription
    });

    if (error) {
      alert("Error uploading: " + (error.message || JSON.stringify(error)));
    }

    if (data) {
      setDocuments([data, ...documents]);
      setShowUploadModal(false);
      setSelectedFile(null);
      setDocDescription('');
    }
    setUploading(false);
  };

  const handleDelete = async (id, path) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      const { success } = await deleteDocument(id, path);
      if (success) {
        setDocuments(documents.filter(d => d.id !== id));
      }
    }
  };

  const handleShare = async (doc) => {
    try {
      const { url } = await getDocumentUrl(doc.storage_path);
      if (url) {
        const shareUrl = url === '#mock' ? window.location.href + '?mock=' + doc.id : url;
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(doc.id);
        setTimeout(() => setCopiedId(null), 2000);
      } else {
        alert("Could not generate a share link.");
      }
    } catch (err) {
      console.error("Share error:", err);
      alert("Failed to copy link to clipboard.");
    }
  };

  const handleDownload = async (doc) => {
    const { url } = await getDocumentUrl(doc.storage_path);
    if (url && url !== '#mock') {
      window.open(url, '_blank');
    } else {
      alert('This is a mock upload, file not actually stored in bucket.');
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <DashboardLayout>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Docs & Reports</h1>
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>Upload, share, and manage your team's files.</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
          >
            <svg className='-ml-1 mr-2 h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12' />
            </svg>
            Upload File
          </button>
        </div>

        {loading ? (
          <div className='flex justify-center p-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
          </div>
        ) : documents.length === 0 ? (
          <div className='text-center py-16 bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700'>
            <svg className='mx-auto h-12 w-12 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
            </svg>
            <h3 className='mt-2 text-sm font-medium text-gray-900 dark:text-white'>No documents</h3>
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>Get started by uploading a new file.</p>
            <div className='mt-6'>
              <button
                onClick={() => setShowUploadModal(true)}
                className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              >
                Upload File
              </button>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {documents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col'
              >
                <div className='p-5 flex-1'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center space-x-3'>
                      <div className='flex-shrink-0'>
                        <span className='inline-flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'>
                          <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' />
                          </svg>
                        </span>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='text-sm font-medium text-gray-900 dark:text-white truncate' title={doc.name}>
                          {doc.name}
                        </p>
                        <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
                          {formatSize(doc.size)} � {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  {doc.description && (
                    <p className='mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
                      {doc.description}
                    </p>
                  )}
                  <div className='mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400'>
                     Uploaded by {doc.profiles ? doc.profiles.first_name + ' ' + doc.profiles.last_name : 'Unknown'}
                  </div>
                </div>
                <div className='bg-gray-50 dark:bg-gray-800/50 px-5 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between'>
                  <div className='flex space-x-3'>
                    <button
                      onClick={() => handleDownload(doc)}
                      className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors'
                      title='Download'
                    >
                      <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare(doc)}
                      className={`${copiedId === doc.id ? 'text-green-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'} transition-colors relative`}
                      title='Share link'
                    >
                      {copiedId === doc.id ? (
                        <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                        </svg>
                      ) : (
                        <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' />
                        </svg>
                      )}
                    </button>
                  </div>
                  {user && doc.uploaded_by === user.id && (
                    <button
                      onClick={() => handleDelete(doc.id, doc.storage_path)}
                      className='text-red-500 hover:text-red-700 transition-colors'
                      title='Delete'
                    >
                      <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                      </svg>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showUploadModal && (
        <div className='fixed inset-0 z-50 overflow-y-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
          <div className='flex items-center justify-center min-h-screen p-4 text-center sm:p-0'>
            <div className='fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity' aria-hidden='true' onClick={() => !uploading && setShowUploadModal(false)}></div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className='relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full'
            >
              <form onSubmit={handleUpload}>
                <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                      <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white' id='modal-title'>
                        Upload Document
                      </h3>
                      <div className='mt-4 space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                            Select File
                          </label>
                          <input 
                            type='file' 
                            ref={fileInputRef} 
                            onChange={handleFileSelect}
                            className='block w-full text-sm text-gray-500 dark:text-gray-400
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-md file:border-0
                              file:text-sm file:font-medium
                              file:bg-primary file:text-white
                              hover:file:bg-primary-dark cursor-pointer'
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor='description' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                            Description (Optional)
                          </label>
                          <textarea
                            id='description'
                            rows='3'
                            value={docDescription}
                            onChange={(e) => setDocDescription(e.target.value)}
                            className='shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2 border'
                            placeholder='Brief description of the document...'
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 dark:bg-gray-800/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200 dark:border-gray-700'>
                  <button
                    type='submit'
                    disabled={!selectedFile || uploading}
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50'
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                  <button
                    type='button'
                    onClick={() => setShowUploadModal(false)}
                    disabled={uploading}
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DocumentsPage;








