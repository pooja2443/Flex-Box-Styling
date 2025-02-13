import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Dimensions } from "react-native";
import Slider from '@react-native-community/slider';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function App() {

  const [autoBrightness, setAutoBrightness] = useState(false);
  const [autoRotate,  setAutoRotate] = useState(false);
  const [brightness, setBrightness] = useState(20);
  const [isDrakMode,  setIsDarkMode] =  useState(false);
  const [dimensions, setDimensions] = useState({
    window : Dimensions.get("window")
  })

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({window})=> {setDimensions({window})})
    return () => subscription ?.remove()
  })

  const {window} = dimensions;
  const windowWidth = window.width;
  const windowHeight = window.height;

  const theme = {
    backgroundColor : isDrakMode ? "#1a1a1a" : "#fff",
    textColor : isDrakMode ? "#fff" : "#000",
    borderColor : isDrakMode ? "#fff" : "#1a1a1a"
  }

  return(
    <View style={[styles.container, {backgroundColor : theme.backgroundColor}]}>
    <Text style={{color: theme.textColor, marginBottom: 10}}>Width: {windowWidth}, Height: {windowHeight}</Text>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Display Setting</Text>
      </View>

      <View style={[styles.boxContainer]}>
        <Text style={styles.text}>Auto Brightness</Text>
        <Switch value={autoBrightness} onValueChange={setAutoBrightness}></Switch>
      </View>

      <View style={styles.boxContainer}>
        <Text style={styles.text}>Brightness</Text>
        <Slider 
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={brightness}
        onValueChange={setBrightness}
        minimumTrackTintColor="#2979FF"
        maximumTrackTintColor="#B0BEC5"
        thumbTintColor="#2979FF"></Slider>
      </View>

      <View style={styles.boxContainer}>
        <Text style={styles.text}>Dark light</Text>
        <TouchableOpacity onPress={() => setIsDarkMode(!isDrakMode)}>
          <FontAwesome name={isDrakMode ? "sun-o" : "moon-o"} size={20} style={styles.icon}></FontAwesome>
        </TouchableOpacity>
      </View>

      <View style={styles.boxContainer}>
        <Text style={styles.text}>Auto Rotate</Text>
        <Switch value={autoRotate} onValueChange={setAutoRotate}></Switch>
      </View>

      <TouchableOpacity style={styles.boxContainer}>
        <Text style={styles.text}>Font Size</Text>
        <Text style={styles.label}>Default</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boxContainer}>
        <Text style={styles.text}>Display Size</Text>
        <Text style={styles.label}>Default</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "#E0F2F1",
    alignItems: "center",
    padding :20,
    marginTop : -20
  },

  headerContainer : {
    height : 100,
    width : 400,
    backgroundColor : "#2979ff",
    borderRadius : 10,
    alignItems: "center",
    justifyContent : "center",
    marginBottom : 20,
    // marginTop : 30
  },

  header : {
    color : "white",
    fontWeight : "bold",
    fontSize : 20
  },

  boxContainer : {
    height : 75,
    width : 325,
    backgroundColor : "white",
    borderRadius : 10,
    justifyContent : "space-between",
    marginTop : 20,
    flexDirection : "row",
    alignItems: "center",
    borderWidth : 2,
    borderColor : "#444"
  },

  text : {
    padding : 15,
    fontSize : 16,
  },

  label : {
    padding : 15,
    color : "#777",
    fontSize : 15
  },

  slider : {
    width : 150,
    height : 40
  },

  icon : {
    padding : 15
  }
})

export default App;