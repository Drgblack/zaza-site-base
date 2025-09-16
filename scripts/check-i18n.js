const fs = require('fs');
const m = JSON.parse(fs.readFileSync('messages/en.json','utf8'));
const offenders = [];
function walk(o, p=[]) {
  for (const [k,v] of Object.entries(o)) {
    if (typeof v === 'string' && /^pricing[._][A-Za-z0-9_.-]+$/.test(v)) offenders.push(p.concat(k).join('.'));
    else if (v && typeof v === 'object') walk(v, p.concat(k));
  }
}
walk(m);
if (offenders.length) {
  console.error('i18n values that look like keys:', offenders);
  process.exit(1);
}
console.log('✅ No key-like i18n values found');