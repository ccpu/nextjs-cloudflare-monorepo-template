#!/usr/bin/env node
import process from 'node:process';

// Parse arguments properly
import {
  generateClientApi,
  resolveFromRoot,
} from '../packages/utils/api-client/src/index.js';

const ARG_START_INDEX = 2;
const args = process.argv.slice(ARG_START_INDEX);
const force = args.includes('--force') || args.includes('-f');
const swaggerFileArg = args.find((arg) => !arg.startsWith('--') && !arg.startsWith('-'));
const swaggerFile = swaggerFileArg ?? 'api/server/swagger.json';

generateClientApi(resolveFromRoot(swaggerFile), force);
