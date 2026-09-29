// 从各朝代详情文件重建 counts（emperors/talents/policies）并写回 overview.json。
// 用法：node scripts/dynasty/fix-overview-counts.mjs
import fs from 'node:fs';
import path from 'node:path';
import { DATA } from './paths.mjs';

const ov = JSON.parse(fs.readFileSync(path.join(DATA, 'overview.json'), 'utf8'));
for (const o of ov) {
  const f = path.join(DATA, 'dynasties', o.id + '.json');
  if (!fs.existsSync(f)) { console.warn('missing detail:', o.id); continue; }
  const d = JSON.parse(fs.readFileSync(f, 'utf8'));
  const talents = Object.values(d.talents || {}).reduce((s, a) => s + a.length, 0);
  o.counts = { emperors: (d.emperors || []).length, talents, policies: (d.policies || []).length };
}
fs.writeFileSync(path.join(DATA, 'overview.json'), JSON.stringify(ov, null, 2) + '\n', 'utf8');
console.log('counts restored for', ov.length, 'dynasties');
