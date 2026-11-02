import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { root,cache,impeccableBinary } from './runtime.mjs';

const {binary}=impeccableBinary();
const result=spawnSync(binary,process.argv.slice(2),{cwd:root,stdio:'inherit',env:{...process.env,
 IMPECCABLE_SKILL_DIR:path.join(root,'.agents/skills/impeccable'),
 IMPECCABLE_HOME:path.join(cache,'impeccable'),
 IMPECCABLE_SELF:'node tools/design/impeccable.mjs',
 IMPECCABLE_NO_TELEMETRY:'1'
}});
if(result.error)throw result.error;
process.exit(result.status??1);
