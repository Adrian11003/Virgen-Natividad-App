import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const isMediumScreen = screenWidth >= 768;

export default isMediumScreen