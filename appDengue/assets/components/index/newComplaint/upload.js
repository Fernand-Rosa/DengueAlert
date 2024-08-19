import React, { useState } from 'react';
import { Button, Image, View, TextInput, Text, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function Upload() {
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissões necessárias", "Você precisa permitir o acesso à galeria para selecionar uma imagem.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  /**const saveData = async () => {
    if (!selectedImage || !description.trim()) {
      Alert.alert('Erro', 'Por favor, selecione uma imagem e insira uma descrição.');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', {
      uri: selectedImage,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('http://192.168.0.19:3000/api/upload', {
        method: 'POST',
        body: formData,
        // Não defina Content-Type, FormData lida automaticamente com isso.
      });

      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }

      const result = await response.text();
      Alert.alert('Sucesso', result);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os dados no servidor.');
      console.error(error);
    }
  };
  **/

  return (
    <View style={styles.container}>
      <Button title="Selecionar Imagem" onPress={pickImage} />
      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Detalhe a denúncia"
            onChangeText={text => setDescription(text)}
            value={description}
          />
          <Button title="Salvar"  style={styles.button} 
          onPress={() => navigation.navigate('Localization')}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  label: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
});
