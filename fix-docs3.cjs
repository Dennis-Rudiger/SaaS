const fs = require('fs');
let content = fs.readFileSync('src/pages/DocumentsPage.jsx', 'utf8');
content = content.replace("className={ transition-colors relative}", "className={\${copiedId === doc.id ? 'text-green-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'} transition-colors relative\}");
fs.writeFileSync('src/pages/DocumentsPage.jsx', content);
