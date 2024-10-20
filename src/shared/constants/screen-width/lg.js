import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const isLargeScreen = screenWidth >= 1024;

export default isLargeScreen