import { useTheme } from '../../../../core/context/themeContext'
import isMediumScreen from '../../../constants/screen-width/md';
import { View, Image, Text} from 'react-native'

const logo = require('../../../../assets/images/logo.png');
const logoBlanco = require('../../../../assets/images/logoInvertido.png');

export const Logo = () => {
  const { theme, isDarkTheme } = useTheme();
  return (
    <View style={{ alignItems: 'center', marginBottom: 20 }}>
      <Image
        source={ isDarkTheme ? logoBlanco : logo }
        style={{ width: 100, height: 100, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text style={{ color: isMediumScreen ? 'white' : theme.colors.paperText, fontSize: 36, fontWeight: '500', textAlign: 'center' }}>
        Colegio Virgen de la Natividad
      </Text>
    </View>
  );
};