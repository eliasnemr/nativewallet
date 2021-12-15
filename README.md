# Native Wallet Minima Application

[![Moove It](https://circleci.com/gh/moove-it/react-native-template.svg?style=svg)](https://app.circleci.com/pipelines/github/moove-it/react-native-template?branch=master)

This is a native wallet application built for Minima using [react native](https://reactnative.dev/), typescript and a component library for react native called [react-native-paper](https://callstack.github.io/react-native-paper/).

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Running project

### android

- cd to root folder `./nativewallet` where the package.json resides.
- Install all dependencies with `npm install`.
- `npx react-native start` to start file watching with _watchman_.
- Make sure you have an android emulator running, then run: `npx react-native run-android`.

### ios

- cd to root folder `./nativewallet` where the package.json resides.
- Install all dependencies with `npm install`.
- `npx react-native start` to start file watching with _watchman_.
- Make sure you have an ios emulator running, then run: `npx react-native run-ios`.
