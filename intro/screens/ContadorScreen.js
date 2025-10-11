//1. Import: Zona de declaraciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import React,{useState} from 'react';

//2. Main: Zona de componentes
export default function App() {
  const[contador,setContador]=useState(0);

  return (
    <View style={styles.container}>

      <Text style={styles.texto}>Contador: </Text>
      <Text style={styles.texto2}> {contador} </Text>

      <View style={styles.contenedorBotones}>  
      <Button color="rgba(182, 183, 255, 1)" title="Agregar" onPress={()=>setContador(contador+1)} /> 
      <Button color="rgba(154, 155, 218, 1)" title="Quitar" onPress={()=>setContador(contador-1)} /> 
      <Button color="rgba(108, 109, 150, 1)" title="Reiniciar" onPress={()=>setContador(contador-contador)} /> 
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

//3. Estilos: Zona de estetica y posicionamiento
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 182, 210, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto:{
    color:'rgba(190, 32, 93, 1)',
    fontSize: 30, 
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'line-through',

  }, 

    texto2:{
    color:'rgba(172, 17, 120, 1) 182, 210, 1)',
    fontSize: 40, 
    fontFamily: 'Courier',
    fontWeight: '400',
    textDecorationLine: 'underline',

  },
  contenedorBotones:{
    marginTop:15,
    flexDirection: 'row-reverse',
    gap:20,

  }, 
});

