import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableHighlight, Switch, Alert, TouchableOpacity } from "react-native";

import * as SplashScreen from "expo-splash-screen";

const { height } = Dimensions.get("window");

export default function SplashScreenPro() {
  const [showMain, setShowMain] = useState(false);
  //Para animaciones
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const scaleLogo = useRef(new Animated.Value(0.5)).current;
  const rotateLogo = useRef(new Animated.Value(0)).current;
  const slideText = useRef(new Animated.Value(height / 2)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  //Para ingresar nombre y correo
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  //Para el switch de aceptar terminos
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const toggleSwitch = () => setAceptaTerminos(previousState => !previousState);
  //Para la validación de correo y nombre
  const validarRegistro = () => {
    if (nombre.trim() === '' || correo.trim() === '' ) {
          alert('Error\nPor favor completa todos los campos');
          return;
        } 
      
    
    if (!correo.includes('@') || !correo.includes('.')) {
    alert('Error!\nPor favor completa todos los campos');
    return;
  }

    if (aceptaTerminos === false ) {
      alert('Terminos no aceptados\nDebes aceptar terminos y condiciones');
      return;
    }

    alert(`Registro exitoso\nNombre: ${nombre}\nEmail: ${correo}`);
  };
  

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeLogo, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.spring(scaleLogo, {
        toValue: 1,
        friction: 5,
        useNativeDriver: false,
      }),
      Animated.timing(rotateLogo, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();

    Animated.timing(slideText, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
      delay: 800,
    }).start();

    const timer = setTimeout(async () => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }).start(async () => {
        await SplashScreen.hideAsync();
        setShowMain(true);
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const rotateInterpolate = rotateLogo.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "10deg"],
  });

  if (showMain) {
    return (
      <ImageBackground
        source={require("../assets/fondorepaso.jpeg")}
        style={styles.fondo}
      >
        <View style={styles.contenedor}>
          <Text style={styles.title}>Registro de usuario</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electronico"
            value={correo}
            onChangeText={setCorreo}
          />

          <View style={styles.switch}>
            <Text style={styles.TyCText}>Acepto Terminos y Condiciones      </Text>
            <Switch
              trackColor={{ false: '#ffffffff', true: '#005acfff' }}
              onValueChange = {toggleSwitch}
              value={aceptaTerminos}
            />
          </View>

          <TouchableOpacity
            style={styles.btnReg}
            onPress={validarRegistro}
          ><Text style = {styles.Registrar} >Registrar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }


  return (
    <Animated.View style={[styles.container, { opacity: fadeOut }]}>
      <Animated.Image
        source={require("../assets/moto.png")}
        resizeMode="contain"
        style={[
          styles.logoImage,
          {
            opacity: fadeLogo,
            transform: [{ scale: scaleLogo }, { rotate: rotateInterpolate }],
          },
        ]}
      />
      <Animated.Text
        style={[styles.text, { transform: [{ translateY: slideText }] }]}
      >
        Cargando...
      </Animated.Text>
      <Animated.View
        style={[
          styles.loader,
          {
            opacity: fadeLogo,
            transform: [
              {
                translateX: slideText.interpolate({
                  inputRange: [0, height / 2],
                  outputRange: [0, -50],
                }),
              },
            ],
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aa0000a8",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: 60,
    height: 6,
    backgroundColor: "#aa0000a8",
    borderRadius: 3,
  },
  logoImage: {
    width: 300,
    height: 300,
    marginBottom: 5,
  },
  fondo: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#ffff",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ffffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    color: "white",
  },

  contenedor: {
    borderRadius: 15,
    width: "80%",
    flex: .4,
    backgroundColor: "rgba(158, 0, 0, 0.7)",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    height: "50%"
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#fff",
  },
  switch: {
    flex: 0,
    flexDirection: 'row'
  },
  TyCText: {
    color: '#fff'
  },
  btnReg: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#005acfd0',
    width:'80%',
    alignItems: 'center',
  },
  Registrar: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "#fff",
  },
});