//import * as React from 'react';
import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Button, TextInput} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Camera} from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner';

import fdaapi from './FDAAPI.tsx'
import database from './Database.tsx'


// this is for the log in screen 
function HomeScreen({ navigation }) {
  const [username, setUsername] = React.useState(null)

  return (
    <SafeAreaView>
      <Text> Enter Username</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g scuterez"
        onChangeText = {(val) => setUsername(val)}
      />
      <Button
        title="Log In"
        // enter username and then send it to database
        onPress={() => navigation.navigate('Home')}
      />
      <Text> Username: {username} </Text>
    </SafeAreaView>
  );
}




//this is for the screen after the log in where the user chooses to put in a new recipe or search for an existing one
function DetailsScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Button
        title="Start New Recipe"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
    <View>
      <Button
        title="Saved Recipes"
        color="#f194ff"
        onPress={() => navigation.navigate('Recipes Saved')}
      />
    </View>
  </SafeAreaView>
  );
}




function RecipesSavedScreen() {

  const [SavedRecipe, setSavedRecipe] = React.useState(null)
  return (


    <SafeAreaView>
      <Text> Enter Recipe Name </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g Spaghetti"
        onChangeText = {(val) => setSavedRecipe(val)}
        //need to make the app find the recipe to see if it already exist and then print out the information 
      />
      <Button
        title="Find Recipe" 
      />
    </SafeAreaView>
  );
}







function CameraScreen() {
  const [startCamera,setStartCamera] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);
  const [text, setText] = React.useState('Not yet scanned')
  const [newRecipe, setNewRecipe] = React.useState(null)
  const [servingsize, setServingsize] = React.useState(null)
  

  // this is for camera permission and to start the camera when its pressed
  const __startCamera = async () => {
    const {status} = await BarCodeScanner.requestPermissionsAsync()
    if (status === 'granted') {
      // start the camera
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  // this is to scan and get the number
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    barcode = data.substring(1, data.length)
    fdaapi.functions.parseBarcode(barcode);


  }
  return (
    <View style={styles.container}>
    {startCamera ? (
      <View style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        {scanned && <Button 
        title='Scan again?' 
        onPress={() => setScanned(false)} color='#dc143c' />}
        <Text> Serving Size </Text>

        <TextInput
        //keyboardType = 'numeric'
          style={styles.input}
        //the number they put is what we send to multiply by to get total calories
          placeholder="Number of Servings"
          onChangeText = {(val) => setServingsize(val)}
        />

        <Button 
          title = "Go"
          onPress = {()=> database.functions.addIngredient(fdaapi.functions.getItemName(),fdaapi.functions.getCalories(Number(servingsize)))}
        />

        <Text> This item contains {fdaapi.functions.getCalories(Number(servingsize))} </Text>

    </View>


      ) : (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
      <Text> Name of Recipe </Text>
      <TextInput
        style={styles.input}
        //name to save into recipes 
        placeholder="Enter name of recipe"
        onChangeText = {(val) => setNewRecipe(val)}

      />
        <TouchableOpacity
          onPress={__startCamera}
          style={{
            width: 200,
            borderRadius: 1,
            backgroundColor: '#000',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
          Add Ingredient 
          </Text>
        </TouchableOpacity>

      </View>
    )}
      <StatusBar style="auto" />
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Log In">
        <Stack.Screen name="Log In" component={HomeScreen} />
        <Stack.Screen name="Home" component={DetailsScreen} />
        <Stack.Screen name ="Camera" component ={CameraScreen}/>
        <Stack.Screen name = "Recipes Saved" component = {RecipesSavedScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  maintext: {
    fontSize: 20,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 350,
    overflow: 'hidden',
    borderRadius: 2,
    backgroundColor: '#000'
  },
  space: {
    width: 20, 
    height: 20,
  }
})




