import { getRequiredSQLSetup } from '../services/projectService';

/**
 * Component to display SQL setup instructions
 */
const DatabaseSetupInstructions = () => {
  const sqlSetup = getRequiredSQLSetup();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlSetup);
    alert('SQL setup commands copied to clipboard!');
  };
  
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <h2 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-3">Database Setup Required</h2>
      
      <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
        To fix relationship errors between tables, you need to execute the following SQL in your Supabase SQL Editor:
      </p>
      
      <div className="relative">
        <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-auto max-h-96 text-xs">
          {sqlSetup}
        </pre>
        
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
        >
          Copy SQL
        </button>
      </div>
      
      <div className="mt-4 text-sm text-blue-700 dark:text-blue-400">
        <p className="font-medium">Instructions:</p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Go to your Supabase dashboard</li>
          <li>Select your project</li>
          <li>Click on "SQL Editor" in the left sidebar</li>
          <li>Create a "New query"</li>
          <li>Paste the SQL commands</li>
          <li>Click "Run" to execute</li>
          <li>Return to this app and try creating a project again</li>
        </ol>
      </div>
    </div>
  );
};

export default DatabaseSetupInstructions;
