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
  if (c.includes('export async function GET()')) {
    c = c.replace(/export async function GET\(\)/g, 'export async function GET(req)');
    fs.writeFileSync(f, c);
    console.log('Fixed GET() in', f);
  }
}
