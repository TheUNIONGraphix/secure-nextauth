#!/usr/bin/env node

const { autoSetup } = require('../dist/utils/autoSetup');

const args = process.argv.slice(2);
const options = {};

// 명령행 인수 파싱
for (let i = 0; i < args.length; i += 2) {
  const key = args[i];
  const value = args[i + 1];
  
  if (key === '--project-root') {
    options.projectRoot = value;
  } else if (key === '--api-route') {
    options.apiRoute = value;
  } else if (key === '--component-name') {
    options.componentName = value;
  } else if (key === '--auth-options-path') {
    options.authOptionsPath = value;
  }
}

try {
  autoSetup(options);
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
} 