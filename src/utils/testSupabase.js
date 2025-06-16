import { supabase } from './supabaseClient';

// Checks if a table exists
export const checkTableExists = async (tableName) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .select('count')
      .limit(1)
      .single();
    
    // If the error code is 42P01, the table doesn't exist
    if (error && error.code === '42P01') {
      return false;
    }
    
    // Otherwise, assume the table exists (or there was a different error)
    return true;
  } catch (error) {
    console.error(`Error checking table ${tableName}:`, error);
    return false;
  }
};

// Tests the Supabase connection and credentials
export const testSupabaseConnection = async () => {
  try {
    // First, check if we can connect to Supabase at all
    const { data: versionData, error: versionError } = await supabase.rpc('version');
    
    if (versionError) {
      return { 
        success: false, 
        message: `Connection failed: ${versionError.message}`,
        error: versionError,
        advice: "Check your Supabase URL and anon key in the .env.local file."
      };
    }
    
    // Check if the subscription_tiers table exists
    const tableExists = await checkTableExists('subscription_tiers');
    
    if (!tableExists) {
      return { 
        success: false, 
        message: "Connection successful but required tables don't exist",
        error: { code: "MISSING_TABLES", message: "Database schema not initialized" },
        advice: "You need to run the SQL schema to create your database tables."
      };
    }
    
    // If we got here, both connection and tables exist
    return { 
      success: true, 
      message: 'Connection successful and database schema initialized!',
      data: { version: versionData, tablesExist: true }
    };
  } catch (error) {
    return { 
      success: false, 
      message: `Unexpected error: ${error.message}`,
      error
    };
  }
};

// Tests authentication
export const testSupabaseAuth = async (email, password) => {
  try {
    // Try to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      return { 
        success: false, 
        message: `Authentication failed: ${error.message}`,
        error 
      };
    }
    
    return { 
      success: true, 
      message: 'Authentication successful!',
      user: data.user 
    };
  } catch (error) {
    return { 
      success: false, 
      message: `Unexpected error: ${error.message}`,
      error 
    };
  }
};

// Create the initial database schema
export const createDatabaseSchema = async (schemaSql) => {
  try {
    // Try using exec_sql function if it exists
    try {
      const result = await supabase.rpc('exec_sql', { sql: schemaSql });
      
      if (!result.error) {
        return {
          success: true,
          message: 'Database schema created successfully using exec_sql!',
          data: result
        };
      }
    } catch (rpcError) {
      console.log('RPC method not available: ', rpcError.message);
    }
    
    // If we reach here, the approach failed - direct SQL execution isn't supported via REST API
    return {
      success: false,
      message: 'Could not apply schema automatically',
      error: new Error('The SQL execution function does not exist'),
      manualInstructions: true
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create schema: ${error.message}`,
      error,
      manualInstructions: true
    };
  }
};

// Updated function that just returns manual instructions since REST API SQL execution is not supported
export const createSqlExecFunction = async () => {
  return {
    success: false,
    message: 'Automatic SQL function creation is not supported',
    error: new Error('Direct SQL execution via API is not supported by Supabase'),
    manualInstructions: true
  };
};
