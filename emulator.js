const execa = require('execa');
const path = require('path');

const getAndroidHome = () => process.env.ANDROID_HOME || process.env.ANDROID_SDK;
const hasSdkPath = () => !!getAndroidHome();

const getEmulatorDir = () => path.join(getAndroidHome(), 'emulator');

const getExtendedPath = () => {
  const platformTools = path.join(getAndroidHome(), 'platform-tools');
  const emulator = getEmulatorDir();
  const tools = path.join(getAndroidHome(), 'tools');
  return `${process.env.PATH}:${tools}:${emulator}:${platformTools}`;
};

const listEmulators = async () => {
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
