import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <Ionicons name="person-outline" size={50} color="green" />
        <Text style={styles.title}>Perfil de Usuario</Text>
      </View>

      <TouchableOpacity
        style={styles.btnDetalle}
        onPress={() => navigation.navigate('Detalle')}
      >
        <Text style={styles.btnText}>Detalle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 20 
  },
  iconRow: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 40 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: 'green', 
    marginTop: 10, 
    textAlign: 'center' 
  },
  btnDetalle: { 
    backgroundColor: '#007BFF', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 10 
  },
  btnText: { 
    color: '#fff', 
    fontSize: 18, 
    textAlign: 'center' 
  }
});
