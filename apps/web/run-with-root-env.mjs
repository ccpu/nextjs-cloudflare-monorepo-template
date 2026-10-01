import { spawnSync } from 'node:child_process';
import process from 'node:process';

import { loadRootEnvFiles } from '@pixpilot/env/node';

loadRootEnvFiles({ from: import.meta.url });

const args = process.argv.slice(2);

if (args[0] === '--') {
  args.shift();
}

const command = args.shift();

if (command == null) {
  throw new Error('Usage: pnpm with-env -- <command> [args...]');
}

// Windows needs a shell to resolve `.cmd` shims, and the shell re-splits
// arguments on whitespace, so quote any argument that would not survive it.
const useShell = process.platform === 'win32';
const spawnArgs = useShell
  ? args.map((arg) => (/[\s"]/u.test(arg) ? `"${arg.replaceAll('"', '\\"')}"` : arg))
  : args;

const result = spawnSync(command, spawnArgs, {
  stdio: 'inherit',
  shell: useShell,
});

process.exit(result.status ?? 1);
