const fs = require('fs');
const path = './src/components/dashboard/ManageTeamModal.jsx';

let content = fs.readFileSync(path, 'utf8');

content = content.replace(/className=\{\ inline\-flex/g, 'className={\inline-flex');
content = content.replace(/className=\{lock w\-full/g, 'className={\lock w-full');

content = content.replace(/className=\{\\(.*?)\\\}/g, 'className={\$1\}');
content = content.replace(/className=\{y\-3 px\-4(.*?)\\\}/g, 'className={\py-3 px-4\}');

content = content.replace(/className=\{(.*?)\\\\\}/g, 'className={\$1\}')

fs.writeFileSync(path, content);
console.log('Fixed backticks');
