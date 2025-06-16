import React, { useState, useEffect } from 'react';
import { testSupabaseConnection, checkTableExists } from '../utils/testSupabase';

// The SQL schema from your schema.sql file
const schemaSql = `
-- Users profile table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  title TEXT,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscription tiers
CREATE TABLE IF NOT EXISTS public.subscription_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  billing_period TEXT NOT NULL,
  features JSONB,
  paypal_plan_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  tier_id UUID REFERENCES public.subscription_tiers(id) NOT NULL,
  status TEXT NOT NULL,
  paypal_subscription_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL,
  owner_id UUID REFERENCES auth.users(id) NOT NULL,
  client TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  project_id UUID REFERENCES public.projects(id) NOT NULL,
  assignee_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL,
  priority TEXT NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  completion_percentage INTEGER,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  task_id UUID REFERENCES public.tasks(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES public.teams(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  role TEXT NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (team_id, user_id)
);

-- Project team assignments
CREATE TABLE IF NOT EXISTS public.project_teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) NOT NULL,
  team_id UUID REFERENCES public.teams(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (project_id, team_id)
);

-- Events/Calendar
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  creator_id UUID REFERENCES auth.users(id) NOT NULL,
  project_id UUID REFERENCES public.projects(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event attendees
CREATE TABLE IF NOT EXISTS public.event_attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (event_id, user_id)
);

-- Documents
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  storage_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  project_id UUID REFERENCES public.projects(id),
  uploaded_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Insert starter subscription tier
INSERT INTO public.subscription_tiers (name, description, price, billing_period, features)
VALUES ('Starter', 'Basic features for small teams', 0, 'monthly', '{"projects": 3, "users": 5, "storage": "1GB"}')
ON CONFLICT DO NOTHING;
`;

// Function creation SQL
const functionSql = `
-- Create a function that can execute SQL
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS jsonb 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql;
  RETURN jsonb_build_object('success', true);
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Add a version function for testing connection
CREATE OR REPLACE FUNCTION version()
RETURNS text
LANGUAGE SQL
AS $$
  SELECT version();
$$;
`;

const SupabaseConnectionTest = () => {
  const [connectionResult, setConnectionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasCheckedTables, setHasCheckedTables] = useState(false);
  const [tablesExist, setTablesExist] = useState(false);

  useEffect(() => {
    // Check if tables exist when the component mounts
    const checkTables = async () => {
      const exists = await checkTableExists('subscription_tiers');
      setTablesExist(exists);
      setHasCheckedTables(true);
    };
    
    checkTables();
  }, []);

  const testConnection = async () => {
    setLoading(true);
    const result = await testSupabaseConnection();
    setConnectionResult(result);
    
    // Update tables exist state based on the test result
    if (result.data && typeof result.data.tablesExist === 'boolean') {
      setTablesExist(result.data.tablesExist);
      setHasCheckedTables(true);
    }
    
    setLoading(false);
  };

  // Copy SQL to clipboard
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    alert(`${type} SQL copied to clipboard!`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md my-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Supabase Connection Test</h2>
      
      {/* Connection Test */}
      <div className="mb-8 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Connection Status</h3>
        
        {hasCheckedTables ? (
          <div className="mb-4">
            <div className={`p-4 rounded-md ${tablesExist 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
              : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'}`}>
              <p>
                {tablesExist 
                  ? '✅ Database tables exist!' 
                  : '⚠️ Database tables do not exist. Please follow the manual setup instructions below.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        <button
          onClick={testConnection}
          disabled={loading}
          className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors disabled:opacity-70"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>
        
        {connectionResult && (
          <div className={`mt-4 p-4 rounded-md ${connectionResult.success ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'}`}>
            <p>{connectionResult.message}</p>
            {connectionResult.advice && (
              <p className="mt-2 font-medium">{connectionResult.advice}</p>
            )}
            <pre className="mt-2 text-xs overflow-auto max-h-60 bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {JSON.stringify(connectionResult.success ? connectionResult.data : connectionResult.error, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      {/* Manual SQL Setup Instructions */}
      <div className={`p-4 border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-900/30 rounded-lg mt-8 ${tablesExist ? 'opacity-50' : ''}`}>
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Manual Database Setup Instructions
        </h3>
        
        {!tablesExist && (
          <div className="font-semibold text-blue-800 dark:text-blue-300 mb-4 p-2 bg-blue-100 dark:bg-blue-800/30 rounded">
            You need to set up your database tables before using the app.
          </div>
        )}
        
        <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
          <li>
            Go to your <a href="https://app.supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">Supabase dashboard</a> and select your project
          </li>
          
          <li>
            Click on "SQL Editor" in the left sidebar
          </li>
          
          <li>
            <span className="font-medium">First, create the SQL functions needed for testing:</span>
            <div className="mt-2 mb-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Step 1: Create SQL functions</span>
                <button 
                  onClick={() => copyToClipboard(functionSql, 'Functions')}
                  className="text-xs px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
                >
                  Copy to clipboard
                </button>
              </div>
              <div className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-auto max-h-40 text-xs">
                <pre>{functionSql}</pre>
              </div>
            </div>
          </li>
          
          <li>
            <span className="font-medium">Next, create the database tables:</span>
            <div className="mt-2 mb-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Step 2: Create database tables</span>
                <button 
                  onClick={() => copyToClipboard(schemaSql, 'Schema')}
                  className="text-xs px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
                >
                  Copy to clipboard
                </button>
              </div>
              <div className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-auto max-h-40 text-xs">
                <pre>{schemaSql}</pre>
              </div>
            </div>
          </li>
          
          <li>
            After running both SQL scripts, click the "Test Connection" button above to verify everything is working
          </li>
        </ol>
        
        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 flex items-center bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md">
          <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>
            Note: Make sure to run these scripts in the order shown. You need to create the SQL functions first, 
            then run the database schema script.
          </span>
        </div>
      </div>
      
      {tablesExist && (
        <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h3 className="text-lg font-medium text-green-800 dark:text-green-300 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Database Setup Complete
          </h3>
          <p className="text-green-700 dark:text-green-400 mt-2">
            Your database is configured correctly. You can now proceed with using the application.
          </p>
          <div className="mt-4">
            <a 
              href="/dashboard" 
              className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupabaseConnectionTest;
