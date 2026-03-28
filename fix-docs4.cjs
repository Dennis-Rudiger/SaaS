const fs = require('fs');
let content = fs.readFileSync('src/pages/DocumentsPage.jsx', 'utf8');
content = content.replace("className={\ transition-colors relative}", "className={\`\ transition-colors relative\`}");
fs.writeFileSync('src/pages/DocumentsPage.jsx', content);
