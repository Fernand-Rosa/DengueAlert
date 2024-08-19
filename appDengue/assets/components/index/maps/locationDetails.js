import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LocationDetails({ route }) {
  const navigation = useNavigation();
  const { locationName } = route.params;
  const [description, setDescription] = useState('');
  const [isNumberSelected, setNumberSelection] = useState(false);
  const [isComplementSelected, setComplementSelection] = useState(false);

  const handleSave = () => {
    console.log('Localização:', locationName);
    console.log('Número:', description);
    console.log('Endereço sem número:', isNumberSelected);
    console.log('Endereço sem complemento:', isComplementSelected);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={styles.title}>Localização Selecionada:</Text>
      <Text style={styles.locationText}>{locationName}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Número *"
        onChangeText={text => setDescription(text)}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Endereço sem número</Text>
        <Switch
          value={isNumberSelected}
          onValueChange={setNumberSelection}
        />
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Complemento *"
        onChangeText={text => setDescription(text)}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Endereço sem complemento</Text>
        <Switch
          value={isComplementSelected}
          onValueChange={setComplementSelection}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Ponto de referência (opcional)"
        onChangeText={text => setDescription(text)}
      />
      
      <TouchableOpacity 
            onPress={() => navigation.navigate('StatusReport')}>
      <Button title="Salvar" style={styles.button} onPress={handleSave} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
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
    marginTop: 40,        
    marginBottom: 20,     
    width: '80%',       
    height: 50,        
    backgroundColor: '#007BFF', 
    justifyContent: 'center',  
    alignItems: 'center',      
    borderRadius: 10,     
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
  },
});