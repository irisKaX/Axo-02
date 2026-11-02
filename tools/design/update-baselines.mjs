import { spawnSync } from 'node:child_process';
if(!process.argv.includes('--approve')){
 console.error('Baseline update requires an explicitly reviewed change. Inspect the diff, then run: npm run design:visual:update -- --approve');process.exit(1);
}
const result=spawnSync(process.execPath,['node_modules/@playwright/test/cli.js','test','--grep','@visual','--update-snapshots'],{stdio:'inherit'});
process.exit(result.status??1);
