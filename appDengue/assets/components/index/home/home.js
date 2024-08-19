import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        <View style={styles.ordersContainer}>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => navigation.navigate('Complaint')}
          >
            <Text style={styles.buttonText}>Nova Denúncia</Text>
            <Text style={styles.buttonSubText}>Insira uma nova denúncia</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.orderButton}
            onPress={() => navigation.navigate('StatusReport')}>
            <Text style={styles.buttonText}>Status de Denúncias</Text>
            <Text style={styles.buttonSubText}>Verificar status de denúncias realizadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.buttonText}>Verificar Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    padding: 16,
    borderColor: 'rgba(204, 204, 204, 0.4)',
    borderWidth: 1,
    borderRadius: 16,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  ordersContainer: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 24,
  },
  orderButton: {
    backgroundColor: '#fff',
    borderColor: 'rgba(204, 204, 204, 0.4)',
    borderWidth: 1,
    height: 128,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24, // Adiciona espaço entre os botões
  },
  buttonText: {
    fontWeight: '500',
  },

});