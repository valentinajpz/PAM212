import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Detalle ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles Usuario</Text>
      <Text style={styles.subtitle}>Usando Navegation Stack</Text>
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
  title: { 
    fontSize: 30, 
    marginBottom: 20, 
    textAlign: 'center' 
  }, 
  subtitle: { 
    fontSize: 20, 
    marginBottom: 20, 
    textAlign: 'center',
    color: 'blue' 
  }, 
  
});
