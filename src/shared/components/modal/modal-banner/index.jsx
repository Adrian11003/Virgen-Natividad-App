import React from 'react';
import { View, Modal, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import isMediumScreen from '../../../constants/screen-width/md';
import { useTheme } from '../../../../core/context/themeContext';

export const ModalBanner = ({ modalVisible, selectedImage, selectedTitle, onClose }) => {
  const { theme } = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <View style={{
          width: isMediumScreen ? '55%' : '90%',
          height: '80%',
          backgroundColor: theme.colors.modalBackground,
          borderRadius: 10,
          padding: 20,
          justifyContent: 'space-between',
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            color: theme.colors.paperText
          }}>
            {selectedTitle}
          </Text>
          
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
            horizontal={true}
            style= {{ borderRadius: 8 }}
          >
            {selectedImage && (
              <Image 
                source={selectedImage} 
                style={{ transform: [{ scale: 1 }], borderRadius: 8 }} 
                resizeMode="contain"
              />
            )}
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={{
            backgroundColor: '#2196F3',
            padding: 10,
            borderRadius: 5,
            alignSelf: 'center',
            marginTop: 20,
          }}>
            <Text style={{
              color: '#fff',
              fontWeight: 'bold',
            }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
