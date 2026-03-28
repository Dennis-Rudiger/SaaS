import fs from 'fs';
let content = fs.readFileSync('src/pages/DocumentsPage.jsx', 'utf8');
content = content.replace(/className=\{([^}]+?transition-colors relative)\}/, 'className={\\scripts/fix-quotes.js1\\scripts/fix-quotes.js2}');
fs.writeFileSync('src/pages/DocumentsPage.jsx', content);