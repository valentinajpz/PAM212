import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native-web';


export default function App() {

const Articulos = [
  {
    titulo: 'Articulo 1',
    data: ['Día de muertos'],
  },
  {
    titulo: 'Articulo 2',
    data: ['Catrina'],
  },
  {
    titulo: 'Articulo 3',
    data: ['Altar'],
  },
];


const SimpleHeader = () => {
  return (
    <View style ={styles.Titulo}>
      <Text style={styles.title}>Noti Noti Noticiaaaaaas</Text>
    </View>
  );
}; 

const btnLerrMas = () => {
  Alert.alert(Articulos, 'compartir', 'guardar', 'cerrar');
}



return ( 
  <View style={styles.container}>
    <View style={styles.container}>
      <SimpleHeader>
        <SectionList
        sections={Articulos}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>• {item}</Text>
        )}
        renderSectionHeader={({ section: { titulo } }) => (
          <Text style={styles.sectionHeader}>{titulo}</Text>
        )}
      />
      </SimpleHeader>
    </View>
  </View>
)


  

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
  },
  LeerMas: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "#fff",
  }, 
  btnLeer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#005acfd0',
    width:'80%',
    alignItems: 'center',
  }
});
}

