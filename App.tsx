import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Button} from 'react-native'
import {Camera} from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner';
let camera: Camera



export default function App() {
  
  const [startCamera,setStartCamera] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);
  const [text, setText] = React.useState('Not yet scanned')

  const __startCamera = async () => {
    const {status} = await BarCodeScanner.requestPermissionsAsync()
    if (status === 'granted') {
      // start the camera
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  }

  return (
    <View style={styles.container}>
    {startCamera ? (
      <View style={styles.container}>
        <View 
          style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button 
        title='Scan again?' 
        onPress={() => setScanned(false)} color='#dc143c' />}
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
          Scan Barcode 
          </Text>
        </TouchableOpacity>

        <View style={styles.space} />

        <TouchableOpacity
          onPress={() => Alert.alert('Going to recipes')}
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
            Recipes
          </Text>
        </TouchableOpacity>
      </View>
    )}

      <StatusBar style="auto" />
    </View>
  )
}





const styles = StyleSheet.create({
  maintext: {
    fontSize: 30,
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  space: {
    width: 20, 
    height: 20,
  }
})
