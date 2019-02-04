#!/usr/bin/env node
const inquirer = require('inquirer');
const Listr = require('listr');
const { listEmulators, startEmulator, hasSdkPath } = require('./emulator');

if (!hasSdkPath()) {
  console.error('Make sure that the ANDROID_SDK environment variable is set');
}

const findAvds = new Listr([
  {
    title: 'Searching for AVDs',
    task: async ctx => listEmulators().then((avds) => {
      ctx.avds = avds;
      return true;
    }),
  },
]);

findAvds
  .run()
  .then(ctx => inquirer.prompt([
    {
      type: 'list',
      message: 'What emulator should start',
      name: 'avd',
      choices: ctx.avds,
    },
  ]))
  .then((answered) => {
    console.log('Emulator is starting up...');
    startEmulator(answered.avd);
  });
