import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const isLargeXLScreen = screenWidth >= 1280;

export default isLargeXLScreen