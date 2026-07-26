const fs = require('fs');
const path = require('path');

function walk(d) {
  let r = [];
  for (let f of fs.readdirSync(d)) {
    let p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) r = r.concat(walk(p));
    else if (f === 'route.js' || f === 'route.jsx') r.push(p);
  }
  return r;
}

let files = walk('app/api');
for (let f of files) {
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes('export const dynamic')) {
    fs.writeFileSync(f, "export const dynamic = 'force-dynamic';\n" + c);
    console.log('Fixed', f);
  }
}
