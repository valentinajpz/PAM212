import React from 'react';
import { SafeAreaView } from 'react-native';
import UsuarioView from './screens/InsertUsuarioScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UsuarioView />
    </SafeAreaView>
  );
}
