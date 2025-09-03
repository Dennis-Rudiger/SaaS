# SaaS Project Setup Instructions

Follow these steps to set up and run your SaaS landing page project.

## Prerequisites

- Make sure you have Node.js installed (version 16 or higher recommended)
- You can download it from [nodejs.org](https://nodejs.org/)

## Step-by-Step Setup

1. **Initialize the project**

   Open Command Prompt or PowerShell in your project directory and run:

   ```
   node setup.js
   ```

   This will:
   - Create necessary directories
   - Set up initial configuration files
   - Install required dependencies

   If you encounter any errors, proceed with the manual setup below.

2. **Manual Setup (if the script fails)**

   a. Initialize a new npm project:
   ```
   npm init -y
   ```

   b. Install the required dependencies:
   ```
   npm install react react-dom react-router-dom
   npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
   ```

   c. Add the following scripts to your package.json:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview"
   }
   ```

   d. Initialize Tailwind CSS:
   ```
   npx tailwindcss init -p
   ```

3. **Verify Installation**

   Check that the following files exist in your project:
   - package.json
   - tailwind.config.js
   - postcss.config.js
   - vite.config.js

4. **Start the Development Server**

   Run the following command:
   ```
   npm run dev
   ```

   This will start the Vite development server and open your application in the browser.

## Testing Application Features

After setting up the project and initializing the database, follow these steps to test the core features. You will need at least two different user accounts to test collaboration features.

### 1. User Authentication
- **Sign Up**: Navigate to `/signup` and create a new user account.
- **Sign In**: Go to `/login`, and you should see a success message about account creation. Log in with the new credentials.
- **Verification**: You should be redirected to the `/dashboard`.

### 2. Project Management
- **Create Project**:
    - Navigate to the `/projects` page.
    - Click "New Project".
    - Fill out the form and click "Create Project".
    - Verify the new project appears on the projects page.
- **View & Edit Project**:
    - Click on the newly created project to go to its details page.
    - Verify all details are correct.
    - Click "Edit" and change some information (e.g., the description).
    - Save the changes and verify they are reflected on the page.
- **Delete Project**:
    - On the project details page, click "Delete".
    - Confirm the deletion.
    - You should be redirected to the `/projects` page, and the project should be gone.

### 3. Task Management
- **Create Task**:
    - Go to a project's detail page.
    - In the "Tasks" section, click "Add Task".
    - Fill out the task details and save.
    - Verify the new task appears in the list.
- **Update Task**:
    - On the main dashboard (`/dashboard`), find the "My Tasks" card.
    - Mark a task as complete by clicking the checkbox.
    - Verify the task appears as completed (strikethrough text).

### 4. Real-time Collaboration
This tests the real-time capabilities of Supabase.
- Open the application in two separate browser windows (or tabs).
- In the first window, log in and navigate to the `/projects` page.
- In the second window, log in with the same user and navigate to the `/projects` page.
- In the first window, create a new project.
- **Verification**: The new project should appear automatically in the second window without needing a manual refresh.

### 5. Analytics and Reporting (Dashboard Stats)
- Navigate to the `/dashboard`.
- Note the numbers in the "Stat Cards" (e.g., Active Projects).
- Go to the `/projects` page and create a new project.
- Return to the `/dashboard`.
- **Verification**: The "Active Projects" count should increase by one. (Note: This requires the dashboard to fetch live data).

## Troubleshooting

### "npm error could not determine executable to run"

This error typically occurs when:
- Node.js is not installed correctly
- PATH environment variables are not set up properly

Solution:
1. Reinstall Node.js from [nodejs.org](https://nodejs.org/)
2. During installation, ensure the "Add to PATH" option is checked

### "Missing script: dev"

This error means your package.json file doesn't have the dev script defined.

Solution:
1. Open your package.json file
2. Add the following to the "scripts" section:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build", 
     "preview": "vite preview"
   }
   ```

### Other Issues

If you're still experiencing problems:

1. Check that all dependencies are installed:
   ```
   npm list --depth=0
   ```

2. Try removing node_modules and reinstalling:
   ```
   rm -rf node_modules
   npm install
   ```

3. Verify your Node.js version:
   ```
   node -v
   ```
   (Should be v16.0.0 or higher for best compatibility)
