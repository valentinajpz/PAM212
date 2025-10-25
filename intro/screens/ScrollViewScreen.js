import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native-web';

const DATA = [
 {id:1},
 {id:2},
 {id:3},
 {id:4},
 {id:5},
 {id:6},
 {id:7},
 {id:8},
 {id:9},
 {id:10},
]; 

const SimpleHeader = () => {
  return (
    <View style ={styles.header}>
      <Text style={styles.title}>ScrollView Horizontal</Text>
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
            <View style={styles.card} key = {val.id}>
              <Text style={styles.subtitle}> ¡Soy una tarjeta!</Text>
            </View>
          );
        })}
    </ScrollView>
  </View>
  );
};

export default SimpleScrollView;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 120,
    backgroundColor: '#a81717ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  title: {
    color: '#ffc0c0ff',
    fontWeight: 'bold',
    fontSize: 20,
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
  },
});