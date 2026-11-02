import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { root,cache,sha256,impeccableBinary,browserRuntime } from './runtime.mjs';

fs.mkdirSync(cache,{recursive:true});
const {binary,os}=impeccableBinary();
// The unmodified upstream skill launcher discovers this local, ignored link.
const link=path.join(root,`.agents/skills/impeccable/scripts/bin/${os}-${process.arch}`,path.basename(binary));
fs.mkdirSync(path.dirname(link),{recursive:true});
if(fs.existsSync(link))fs.unlinkSync(link);
if(process.platform==='win32')fs.copyFileSync(binary,link);
else fs.symlinkSync(path.relative(path.dirname(link),binary),link);

const fonts=JSON.parse(fs.readFileSync(path.join(root,'tests/design/fonts-lock.json')));
const fontDir=path.join(cache,'fonts');fs.mkdirSync(fontDir,{recursive:true});
for(const entry of fonts.files){
 const file=path.join(fontDir,entry.file);
 if(fs.existsSync(file)&&await sha256(fs.readFileSync(file))===entry.sha256)continue;
 const url=new URL(entry.url);
 if(!['fonts.googleapis.com','fonts.gstatic.com'].includes(url.hostname)||url.protocol!=='https:')throw new Error('Unexpected font source');
 const bytes=execFileSync('curl',['--fail','--silent','--show-error','--location','--max-time','30',entry.url],{maxBuffer:5*1024*1024});
 if(await sha256(bytes)!==entry.sha256)throw new Error(`Font source changed: ${entry.url}. Review the font lock; do not silently regenerate visual references.`);
 fs.writeFileSync(file,bytes);
}
execFileSync(process.execPath,['tools/design/check-skills.mjs'],{cwd:root,stdio:'inherit'});
console.log(JSON.stringify({browser:browserRuntime(),fonts:fonts.files.length,hook:'not installed; Codex Web hook activation unverified'},null,2));
