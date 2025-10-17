import React, { useState } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import ContadorScreen from './ContadorScreen';
import TextInputScreen from './TextInputScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
import ScrollViewScreen from './ScrollViewScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListScreen from './FlatListScreen';
import ModalScreen from './ModalScreen';
import BottomSheetScreen from './BottomSheetScreen';
import BotonesScreen from './BotonesScreens/BotonesScreen';

export default function MenuScreen() {
  const [screen, setScreen] = useState('menu');

  switch (screen) {
    case 'contador':
      return <ContadorScreen />;
    case 'botones':
      return <BotonesScreen />;
    case 'textInput':
      return <TextInputScreen />;
    case 'imageBackground':
      return <ImageBackgroundScreen />;
    case 'scrollView':
      return <ScrollViewScreen />;
    case 'activityIndicator':
      return <ActivityIndicatorScreen />;
    case 'flatList':
      return <FlatListScreen />;
    case 'modal':
      return <ModalScreen />;
    case 'bottomSheet':
      return <BottomSheetScreen />;
    case 'botones':
      return <BotonesScreen />;
    case 'menu':
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.texto}>Menú de Prácticas</Text>
          <View style={styles.contenedorBotones}>
            <Button color="purple" onPress={() => setScreen('contador')} title="Contador" />
            <Button color="purple" onPress={() => setScreen('botones')} title="Botones" />
            <Button color="purple" onPress={() => setScreen('textInput')} title="TextInput" />
            <Button color="purple" onPress={() => setScreen('imageBackground')} title="ImageBackground" />
            <Button color="purple" onPress={() => setScreen('scrollView')} title="ScrollView" />
            <Button color="purple" onPress={() => setScreen('activityIndicator')} title="ActivityIndicator" />
            <Button color="purple" onPress={() => setScreen('flatList')} title="FlatList" />
            <Button color="purple" onPress={() => setScreen('modal')} title="Modal" />
            <Button color="purple" onPress={() => setScreen('bottomSheet')} title="BottomSheet" />
            <Button color="purple" onPress={() => setScreen('botones')} title="BotonesScreen" />
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9ce1ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  contenedorBotones: {
    marginTop: 15,
    flexDirection: 'column',
    gap: 10,
    width: '100%',
  },
  texto: {
    color: '#b40069ff',
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    marginBottom: 20,
    textAlign: 'center',
  },
});
