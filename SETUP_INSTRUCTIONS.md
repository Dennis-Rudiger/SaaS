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
