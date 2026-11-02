import { defineConfig } from '@playwright/test';
import { browserRuntime } from './tools/design/runtime.mjs';

const browser=browserRuntime();
export default defineConfig({
 testDir:'./tests/design',testMatch:'**/*.spec.mjs',fullyParallel:false,workers:1,retries:0,
 timeout:30000,expect:{timeout:5000,toHaveScreenshot:{maxDiffPixels:0,animations:'disabled',caret:'hide',scale:'css'}},
 outputDir:'test-results/design',reporter:[['list'],['html',{outputFolder:'playwright-report/design',open:'never'}]],
 snapshotPathTemplate:'{testDir}/baselines/{projectName}/{arg}{ext}',
 metadata:{browser,fontFixtures:'tests/design/fonts-lock.json',scope:'Existing catalog components only; no deployment'},
 use:{baseURL:'http://127.0.0.1:4173',browserName:'chromium',launchOptions:{executablePath:browser.executablePath},locale:'cs-CZ',timezoneId:'Europe/Prague',deviceScaleFactor:1,reducedMotion:'reduce',screenshot:'only-on-failure',trace:'retain-on-failure'},
 projects:['dark','light'].flatMap(theme=>[
  {name:`${browser.snapshotKey}-${theme}-desktop`,use:{viewport:{width:1366,height:768},colorScheme:theme}},
  {name:`${browser.snapshotKey}-${theme}-mobile`,testIgnore:'**/widget-studio.visual.spec.mjs',use:{viewport:{width:390,height:844},colorScheme:theme}}
 ]),
 webServer:{command:'node tools/design/server.mjs',url:'http://127.0.0.1:4173',reuseExistingServer:false,timeout:15000}
});
