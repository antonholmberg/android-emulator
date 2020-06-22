# Android emulator
I recently started doing React Native development and what continiously bugged me was
The fact that i needed to start the android emulator manually all the time. This was either
through a pretty badly designed CLI or even worse waiting for Android studio to boot up (A huge behemoth).

# Npm scripts
This is a modified version of the original project by @antonholmberg that terminates the process
with a zero exit code once once the simulator opens. This allows me to create a npm script that
always tries to start the emulator before running the app.

## What you need to do? 🤔

You need to set the either set the environment variable `ANDROID_HOME` or `ANDROID_SDK`
to where your android sdk is installed. For me on a mac this is `~/Library/Android/sdk`but 
this will depend on your OS and installation.

## Running it 🚀

Run `android-emulator` in the terminal. Then select the emulator you want to start. 

🎉💥 YOU ARE DONE! 💥🎉
