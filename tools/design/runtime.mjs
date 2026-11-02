import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { chromium } from '@playwright/test';

export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
export const cache=path.join(root,'.cache/design');
export const sha256=bytes=>import('node:crypto').then(({createHash})=>createHash('sha256').update(bytes).digest('hex'));
export function browserRuntime(){
 const specified=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
 const bundled=chromium.executablePath();
 const executablePath=specified||[bundled,'/usr/bin/chromium','/usr/bin/chromium-browser','/usr/bin/google-chrome'].find(p=>fs.existsSync(p));
 if(!executablePath||!fs.existsSync(executablePath))throw new Error('Chromium unavailable. Install the Playwright browser or set PLAYWRIGHT_CHROMIUM_EXECUTABLE to an existing Chromium executable. See docs/DESIGN-WORKFLOW.md.');
 const version=execFileSync(executablePath,['--version'],{encoding:'utf8'}).trim();
 const major=version.match(/\d+/)?.[0];
 if(!major)throw new Error('Cannot identify browser version: '+version);
 return {executablePath,version,source:specified?'explicit':executablePath===bundled?'playwright-bundled':'system',snapshotKey:`chromium-${major}-${process.platform}-${process.arch}`};
}
export function impeccableBinary(){
 const os={linux:'linux',darwin:'darwin',win32:'windows'}[process.platform];
 if(!os)throw new Error('Unsupported Impeccable platform: '+process.platform);
 const binary=path.join(root,`node_modules/@impeccable/cli-${os}-${process.arch}/bin/impeccable${os==='windows'?'.exe':''}`);
 if(!fs.existsSync(binary))throw new Error('Pinned Impeccable engine missing. Run npm ci --ignore-scripts (including optional platform dependencies).');
 return {binary,os};
}
