import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const isLargeXXLScreen = screenWidth >= 1536;

export default isLargeXXLScreen