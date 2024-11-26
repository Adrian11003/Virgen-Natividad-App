import React from 'react';
import { View, Text, Image, useWindowDimensions, Platform} from 'react-native';
import { Card } from 'react-native-paper';

export const ProfileCard = ({ imageUri, title, subtitle, firstRowFields, secondRowFields, theme, isDarkTheme }) => {
  const { width } = useWindowDimensions();
  const isMediumScreen = width >= 768;

  const UserInfo = ({ label, value }) => (
    <View style={{
      flex: Platform.OS === 'web' ? 1 : isMediumScreen ? 1 : 0, 
      marginHorizontal: 5,
      alignItems: 'center',
      marginBottom: isMediumScreen ? 0 : 20, 
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: isDarkTheme ? theme.colors.text : theme.colors.primary,
        textAlign: 'center'
      }}>
        {label}
      </Text>
      <Text style={{
        fontSize: 16,
        color: theme.colors.paperText,
        textAlign: 'center'
      }}>
        {value}
      </Text>
    </View>
  );

  return (
    <Card style={{ padding: 40, marginHorizontal: isMediumScreen ? 50 : 0 , marginBottom: isMediumScreen ? 0: 70}}>
      <View style={{ flexDirection: isMediumScreen ? 'row' : 'column', alignItems: 'center' }}>
        <View style={{ alignItems: 'center', marginRight: isMediumScreen ? 100 : 0, marginBottom: isMediumScreen ? 0 : 40 }}>
          <Image
            style={{ height: 110, width: 110, borderRadius: 55 }}
            source={imageUri ? { uri: imageUri } : require('../../../../assets/icons/favicon.png')}
          />
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: isDarkTheme ? theme.colors.text : theme.colors.primary,
            marginTop: 10,
            textAlign: 'center',
            maxWidth: 120,
          }}>
            {title}
          </Text>
          <Text style={{
            fontSize: 16,
            color: theme.colors.paperText,
            marginTop: 5,
            textAlign: 'center'
          }}>
            {subtitle}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          
          <View style={{
            flexDirection: isMediumScreen ? 'row' : 'column',
            justifyContent: isMediumScreen ? 'space-between' : 'center',
            alignItems: isMediumScreen ? 'flex-start' : 'center',
            marginBottom: 10
          }}>
            {firstRowFields.map((field, index) => (
              <UserInfo key={index} label={field.label} value={field.value} />
            ))}
          </View>
    
          <View style={{
            flexDirection: isMediumScreen ? 'row' : 'column',
            justifyContent: isMediumScreen ? 'space-between' : 'center',
            alignItems: isMediumScreen ? 'flex-start' : 'center'
          }}>
            {secondRowFields.map((field, index) => (
              <UserInfo key={index} label={field.label} value={field.value} />
            ))}
          </View>
        </View>
      </View>
    </Card>
  );
};