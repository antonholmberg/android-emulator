#!/usr/bin/env node
const inquirer = require('inquirer');
const { listEmulators, startEmulator, hasSdkPath } = require('./emulator');

if (!hasSdkPath()) {
  console.error('Make sure that the ANDROID_SDK environment variable is set');
}

listEmulators()
  .then(avds => inquirer.prompt([
    {
      type: 'list',
      message: 'What emulator should start',
      name: 'avd',
      choices: avds,
    },
  ]))
  .then((answered) => {
    console.log('🚀 Emulator is starting up...');
    startEmulator(answered.avd);
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
