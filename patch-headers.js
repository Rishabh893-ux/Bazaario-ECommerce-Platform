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
  let changed = false;
  
  if (!c.includes('import { headers } from "next/headers"')) {
    c = 'import { headers } from "next/headers";\n' + c;
    changed = true;
  }
  
  // Inject headers(); inside GET(req) { or GET() {
  if (c.includes('export async function GET(req) {')) {
    if (!c.includes('headers();')) {
      c = c.replace('export async function GET(req) {', 'export async function GET(req) {\n  headers();\n');
      changed = true;
    }
  } else if (c.includes('export async function GET(req, { params }) {')) {
    if (!c.includes('headers();')) {
      c = c.replace('export async function GET(req, { params }) {', 'export async function GET(req, { params }) {\n  headers();\n');
      changed = true;
    }
  } else if (c.includes('export async function GET() {')) {
    if (!c.includes('headers();')) {
      c = c.replace('export async function GET() {', 'export async function GET() {\n  headers();\n');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(f, c);
    console.log('Fixed', f);
  }
}
