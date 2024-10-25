import React from 'react';
import { View, Modal, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import isMediumScreen from '../../../constants/screen-width/md';

export const ModalBanner = ({ modalVisible, selectedImage, selectedTitle, onClose }) => {
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
          backgroundColor: '#fff',
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
          }}>
            {selectedTitle}
          </Text>
          
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={true}
            horizontal={true}
          >
            {selectedImage && (
              <Image 
                source={selectedImage} 
                style={{ transform: [{ scale: 1 }] }} 
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
