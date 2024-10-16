import { Platform } from 'react-native';

export const baseUrl = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://192.168.1.63:3000',
  web: 'http://localhost:3000',
});

// ios: 'http://localhost:3000',
// android: 'http://192.168.1.63:3000',
// web: 'http://localhost:3000',