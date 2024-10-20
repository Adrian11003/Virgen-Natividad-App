import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const isSmallScreen = screenWidth >= 640;

export default isSmallScreen