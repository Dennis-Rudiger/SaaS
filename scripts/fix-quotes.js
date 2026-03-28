const fs = require('fs');
const content = fs.readFileSync('src/components/dashboard/ManageTeamModal.jsx', 'utf8');
const fixed = content.replace(/className=\{([^'}]+)\\\}/g, (match, p1) => {
  return 'className={' + p1 + '}';
}).replace(/lock w-full/g, '\lock w-full').replace(/y-3 px-4/g, '\py-3 px-4');

fs.writeFileSync('src/components/dashboard/ManageTeamModal.jsx', fixed);
