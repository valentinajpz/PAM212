import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Perfil</Text>
      
      {/* Botón para ir a Configuración */}
      <Pressable 
        style={[styles.button, styles.buttonSettings]} 
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.buttonText}>Ir a Configuración</Text>
      </Pressable>
      
      {/* Botón para volver a Home */}
      <Pressable 
        style={[styles.button, styles.buttonHome]} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Volver a Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonSettings: {
    backgroundColor: '#FF8808', // Naranja
  },
  buttonHome: {
    backgroundColor: '#284745', // Verde
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});