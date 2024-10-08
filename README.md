<!-- Banner Image -->

<p align="center">
  <a href="https://expo.dev/">
    <img alt="expo sdk" height="128" src="https://raw.githubusercontent.com/expo/expo/main/.github/resources/banner.png">
    <h1 align="center">Expo</h1>
  </a>
</p>

<p align="center">
   <a aria-label="SDK version" href="https://www.npmjs.com/package/expo" target="_blank">
    <img alt="Expo SDK version" src="https://img.shields.io/npm/v/expo.svg?style=flat-square&label=SDK&labelColor=000000&color=4630EB" />
  </a>
  <a aria-label="Chat or ask a question" href="https://chat.expo.dev" target="_blank">
    <img alt="Chat or ask a question" src="https://img.shields.io/discord/695411232856997968.svg?style=flat-square&labelColor=000000&color=4630EB&logo=discord&logoColor=FFFFFF&label=Chat%20with%20us" />
  </a>
  <a aria-label="Expo is free to use" href="https://github.com/expo/expo/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-success.svg?style=flat-square&color=33CC12" target="_blank" />
  </a>
  <a aria-label="expo downloads" href="http://www.npmtrends.com/expo" target="_blank">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/expo.svg?style=flat-square&labelColor=gray&color=33CC12&label=Downloads" />
  </a>
</p>

<p align="center">
  <a aria-label="try expo with snack" href="https://snack.expo.dev"><b>Try Expo in the Browser</b></a>
&ensp;•&ensp;
  <a aria-label="expo documentation" href="https://docs.expo.dev">Read the Documentation</a>
&ensp;•&ensp;
  <a aria-label="expo documentation" href="https://expo.dev/blog">Learn more on our blog</a>
&ensp;•&ensp;
  <a aria-label="expo documentation" href="https://expo.canny.io/feature-requests">Request a feature</a>
</p>

<h6 align="center">Follow us on</h6>
<p align="center">
  <a aria-label="Follow @expo on X" href="https://x.com/intent/follow?screen_name=expo" target="_blank">
    <img alt="Expo on X" src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" target="_blank" />
  </a>&nbsp;
  <a aria-label="Follow @expo on GitHub" href="https://github.com/expo" target="_blank">
    <img alt="Expo on GitHub" src="https://img.shields.io/badge/GitHub-222222?style=for-the-badge&logo=github&logoColor=white" target="_blank" />
  </a>&nbsp;
  <a aria-label="Follow @expo on Reddit" href="https://www.reddit.com/r/expo/" target="_blank">
    <img alt="Expo on Reddit" src="https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white" target="_blank" />
  </a>&nbsp;
  <a aria-label="Follow @expo on Bluesky" href="https://bsky.app/profile/expo.dev" target="_blank">
    <img alt="Expo on LinkedIn" src="https://img.shields.io/badge/Bluesky-1DA1F2?style=for-the-badge&logo=bluesky&logoColor=white" target="_blank" />
  </a>&nbsp;
  <a aria-label="Follow @expo on LinkedIn" href="https://www.linkedin.com/company/expo-dev" target="_blank">
    <img alt="Expo on LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank" />
  </a>
</p>

## Descripción

**Virgen Natividad App** es una aplicación móvil desarrollada con **Expo** y **React Native**. Esta aplicación está diseñada para facilitar la gestión y comunicación entre estudiantes, docentes y tutores dentro de la institución educativa Virgen Natividad.

### Características principales

- Gestión de asistencia para estudiantes y tutores.
- Visualización de notas para estudiantes.
- Gestión de tareas para docentes y estudiantes.
- Publicación de comunicados importantes.
- Sistema de pagos y perfil para estudiantes.
- Sistema de navegación mediante Drawers personalizados según el rol (docente, estudiante, tutor).

## Requisitos

Para ejecutar este proyecto, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Dependencias clave

- `react-native`: Framework principal para la construcción de la aplicación.
- `expo`: Herramienta para el desarrollo de aplicaciones móviles en React Native.
- `react-navigation`: Navegación entre pantallas y drawers.
- `axios`: Para realizar solicitudes HTTP a las API.
- `react-context`: Gestión del estado global de la aplicación.

## Installation

```bash
$ npm install
```

## Running the app
Development (starts the Expo development server)
```bash
$ expo start
```
Development mode for Android (runs the app on an Android emulator or device)
```bash
$ expo run:android
```
Development mode for iOS (runs the app on an iOS emulator or device, macOS required)
```bash
$ expo run:ios
```
Production mode (creates a production build for deployment)
```bash
$ expo build:android
$ expo build:ios
```
