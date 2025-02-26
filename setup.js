const fs = require('fs');
const { execSync } = require('child_process');

console.log('Setting up SaaS project...');

// Create necessary directories if they don't exist
const dirs = ['src', 'src/components', 'src/pages', 'src/styles', 'public'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create tailwind.css file
const tailwindCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: 79, 70, 229;  /* indigo-600 */
    --color-primary-dark: 67, 56, 202;  /* indigo-700 */
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', sans-serif;
  }
}

@layer components {
  .container {
    @apply max-w-7xl mx-auto;
  }
  
  .bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
}`;

fs.writeFileSync('src/styles/tailwind.css', tailwindCssContent);
console.log('Created tailwind.css file');

// Create package.json if it doesn't exist
if (!fs.existsSync('package.json')) {
  const packageJsonContent = {
    "name": "saaspro-landing",
    "private": true,
    "version": "0.1.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    }
  };
  
  fs.writeFileSync('package.json', JSON.stringify(packageJsonContent, null, 2));
  console.log('Created package.json file');
}

console.log('Installing dependencies...');

try {
  execSync('npm install react react-dom react-router-dom', { stdio: 'inherit' });
  execSync('npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer', { stdio: 'inherit' });
  console.log('Dependencies installed successfully');
  
  console.log('\nSetup completed successfully!');
  console.log('\nTo start the development server, run:');
  console.log('npm run dev');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
  console.log('\nPlease run the following commands manually:');
  console.log('npm install react react-dom react-router-dom');
  console.log('npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer');
}
