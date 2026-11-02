import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { root,sha256,impeccableBinary } from './runtime.mjs';

const lock=JSON.parse(fs.readFileSync(path.join(root,'tools/design/skills-lock.json')));
for(const skill of lock.skills){
 for(const [file,hash] of Object.entries(skill.files))assert.equal(await sha256(fs.readFileSync(path.join(root,'.agents/skills',skill.name,file))),hash,`${skill.name}/${file} differs from pinned upstream`);
 console.log(`${skill.name}: ${Object.keys(skill.files).length} upstream files verified at ${skill.commit}`);
}
const {binary,os}=impeccableBinary();
const manifest=fs.readFileSync(path.join(root,'.agents/skills/impeccable/scripts/engine-checksums.txt'),'utf8');
const expected=manifest.split('\n').map(l=>l.split(/\s+/)).find(l=>l[1]===`impeccable-${os}-${process.arch}${os==='windows'?'.exe':''}`)?.[2];
assert(expected,'No upstream digest for this engine platform');
assert.equal(await sha256(fs.readFileSync(binary)),expected,'Impeccable binary checksum mismatch');
const names=new Set();
for(const dir of fs.readdirSync(path.join(root,'.agents/skills'))){
 const file=path.join(root,'.agents/skills',dir,'SKILL.md');
 const text=fs.readFileSync(file,'utf8');
 const name=text.match(/^name:\s*(.+)$/m)?.[1];
 assert(name&&text.startsWith('---\n')&&/^description:\s*\S/m.test(text),`Invalid Agent Skill: ${dir}`);
 assert(!names.has(name),`Duplicate skill name: ${name}`);names.add(name);
}
console.log('3 project skills and original Impeccable engine verified. This checks files, not Codex Web automatic discovery.');
