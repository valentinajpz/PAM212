import { Text, StyleSheet, View, Modal, Button } from 'react-native';
import React, { useState } from 'react';

export default function ModalEjemplo() 
{
  const [modalVisible, setModalVisible] = useState(false);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Modal</Text>
        <Button title='Abrir Modal' onPress={()=>setModalVisible(true)}/>
        <Modal

          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={(false)}
        >
          <View style={styles.modalcontainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hola, soy un modal</Text>
              <Button title='Cerrar Modal' onPress={()=>setModalVisible(false)}/>
            </View>
          </View>

        </Modal>
        
      </View>
    )
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAEAEA',
  },
  title: 
  {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContainer: 
  {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', 
  },
  modalView: 
  {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: 
  {
    marginBottom: 15,
    fontSize: 16,
  },
});