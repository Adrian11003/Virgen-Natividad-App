import { Platform } from 'react-native';

export const baseUrl = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://192.168.1.63:3000',
  web: 'https://expert-fiesta-979gqwg6wv5529xpx-3000.app.github.dev',
});

// ios: 'http://localhost:3000',
// android: 'http://192.168.1.63:3000',
// web: 'http://localhost:3000',