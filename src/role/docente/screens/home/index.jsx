import { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView} from 'react-native';
import { HorariosContext } from '../../../../core/context/horariosContext';
import { AuthContext } from '../../../../core/context/authContext';
import { useTheme } from '../../../../core/context/themeContext';
import { Horario } from '../../../../shared/components/custom/horario/index';
import currentDate from '../../../../shared/constants/today-date';
import isMediumScreen from '../../../../shared/constants/screen-width/md';
import { ProgressBar } from 'react-native-paper';
import { Banner } from '../../../../shared/components/banner/index';
import { ModalBanner } from '../../../../shared/components/modal/modal-banner/index';


const image1 = require('../../../../assets/images/Aviso1.png');
const image2 = require('../../../../assets/images/Aviso2.png');
const image3 = require('../../../../assets/images/Aviso3.png');
export const Home = () => {
  const { horarios, getHorariosByDocente, loading } = useContext(HorariosContext);
  const { user } = useContext(AuthContext)
  const { theme } = useTheme()

  const [docenteId, setDocenteId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  const images = [
    { source: image1, title: 'Aviso Importante' },
    { source: image2, title: 'Calendario Escolar 2024' },
    { source: image3, title: 'Cronograma de evaluacione' }
  ];

  useEffect(() => {
      setDocenteId(user.perfil._id);
  }, [user]);
  
  useEffect(() => {
    if (docenteId) {
      getHorariosByDocente(docenteId);
    }
  }, [docenteId]);

  const handleOpenModal = (image, title) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  if (loading) {
    return <ProgressBar indeterminate />
  }

  return (
    <View style={{ width: '100%', maxWidth: 1300, marginVertical: 15, marginHorizontal: 'auto', marginBottom: 40 }}>
      <Text style={{ color: theme.colors.paperText, marginHorizontal: 20, fontSize: 15, marginBottom: 15 }}>
        Hola <Text style={{ fontWeight: 'bold' }}>{user.perfil.nombre}</Text>, hoy es {currentDate}.
      </Text>
      <View style={{ marginBottom: 65 }}>
        <ScrollView style={{ height: '80vh', marginBottom: 40 }}>
          <View style={{ 
            padding: 16,
            marginTop: -15,
            width: isMediumScreen ? '50%' : '100%',
          }}>
            <Horario horarios={horarios} rol={user.rol} />
          </View>

          <View style={{ 
            display: isMediumScreen ? 'grid' : 'flex',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginHorizontal: 20,
            marginBottom: 10
          }}>
            {images.map((img, index) => (
              <Banner
                key={index}
                title={img.title}
                onPress={() => handleOpenModal(img.source, img.title)}
                source={img.source}
              />
            ))}
          </View>

          <ModalBanner
            modalVisible={modalVisible}
            selectedImage={selectedImage}
            selectedTitle={selectedTitle}
            onClose={handleCloseModal}
          />
        </ScrollView>
      </View>
    </View>
  );
};