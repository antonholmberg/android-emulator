const execa = require('execa');
const path = require('path');

const hasSdkPath = () => !!process.env.ANDROID_SDK;

const getEmulatorDir = () => path.join(process.env.ANDROID_SDK, 'emulator');

const getExtendedPath = () => {
  const platformTools = path.join(process.env.ANDROID_SDK, 'platform-tools');
  const emulator = getEmulatorDir();
  const tools = path.join(process.env.ANDROID_SDK, 'tools');
  return `${process.env.PATH}:${tools}:${emulator}:${platformTools}`;
};

const listEmulators = async () => {
  console.log(getExtendedPath());
  const { stdout } = await execa('emulator', ['-list-avds'], {
    env: { PATH: getExtendedPath() },
  });
  return stdout.split('\n');
};

const startEmulator = async emulator => execa('./emulator', [`@${emulator}`], {
  detached: true,
  env: { PATH: getExtendedPath() },
  cwd: getEmulatorDir(),
});

module.exports = {
  hasSdkPath,
  listEmulators,
  startEmulator,
};
