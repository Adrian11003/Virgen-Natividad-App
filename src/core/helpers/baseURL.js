import { Platform } from 'react-native';

export const baseUrl = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000',
  web: 'http://localhost:3000'
});

// ios: 'http://localhost:3000',
// android: 'http://192.168.1.63:3000',
// web: 'http://localhost:3000'

// ios: 'https://vnback-production.up.railway.app',
// android: 'http://172.20.61.25:3000',
// web: 'https://vnback-production.up.railway.app'