import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { root,cache,browserRuntime } from './runtime.mjs';

execFileSync(process.execPath,['tools/design/check-skills.mjs'],{cwd:root,stdio:'inherit'});
const runtime=browserRuntime();
const browser=await chromium.launch({executablePath:runtime.executablePath,headless:true});
try{
 const page=await browser.newPage();await page.setContent('<button>Playwright smoke</button>');await page.getByRole('button').click();
 console.log(JSON.stringify({playwright:JSON.parse(fs.readFileSync(path.join(root,'node_modules/@playwright/test/package.json'))).version,browser:runtime,protocolVersion:browser.version(),fontCache:fs.existsSync(path.join(cache,'fonts/stylesheet.css')),projectSkills:'installed and integrity checked',codexWebAutoDiscovery:'not verified; explicit AGENTS.md + SKILL.md reading supported by this workflow',codexWebHooks:'not installed / not verified'},null,2));
}finally{await browser.close()}
