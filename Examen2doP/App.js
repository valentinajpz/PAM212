import React from 'react';
import { StyleSheet, Text, View,  ScrollView,  } from 'react-native-web'; 

export default function App() {

const DATA = [
  {Articulo: 1}, 
  {Articulo: 2}, 
  {Articulo: 3}, 
]


const SimpleHeader = () => {
  return (
    <View style ={styles.Titulo}>
      <Text style={styles.title}>Noti Noti Noticiaaaaaas</Text>
    </View>
  );
}; 


const SimpleScrollView = () => {
  return (
    <View style= {styles.container}>
      <SimpleHeader/>
      <ScrollView 
      horizontal={true}
      showHorizontalScrollIndicator={true}
      contentContainerStyle={styles.scrollContent}
      >
        {DATA.map(val => {
          return (
            <View style={styles.card} key = {val.Articulo}>
              <Text style={styles.subtitle}></Text>
            </View>
          );
        })}
    </ScrollView>
  </View>
  );
};
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Titulo: {
    height: 120,
    backgroundColor: '#a81717ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
   scrollContent: {
    paddingVertical: 10,
  },
  card: {
    width: 100,
    height: 150,
    backgroundColor: '#2a0000ff',
    marginLeft: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  subtitle: {
    color: '#ffe0e0ff',
    fontWeight: 'bold',
  }
});
};