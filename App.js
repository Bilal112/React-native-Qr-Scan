
import React, { Component } from "react";
import {
  View,
  Alert,
  Text,StatusBar, SafeAreaView,StyleSheet,ScrollView,Header,PermissionsAndroid
} from "react-native";
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import firebase  from "./utils/firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      //variable to hold the qr value
      qrvalue: '',
      opneScanner: false,
      val :1
    };
  }
  componentDidMount() {
    this.requestCameraPermission()
  }

  
  

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

datasend(data){
    this.setState({
      val: 0
    },()=>{
      firebase.firestore().collection('Attendance').add({
        id:Number(data)
    }).then((val)=>{
      Alert.alert('Congraction Data Save','Great')
      this.setState({
        val:1
      })
    }).catch((val)=>{
      Alert.alert(['Netowrk Error','Try Again'] )
    })
    })
  
}

  render() {
    console.ignoredYellowBox = ['Setting a timer'];
    return (

      <View>
        {this.state.val == 1 ?
          
 <CameraKitCameraScreen
        actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
        // onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
        showFrame={true}
        scanBarcode={true}
        laserColor={"blue"}
        surfaceColor={"black"}
        frameColor={"yellow"}
        onReadCode={(event) => {this.datasend(event.nativeEvent.codeStringValue)}}
        hideControls={true}
        // offsetForScannerFrame = {10}  
        // heightForScannerFrame = {300}  
        colorForScannerFrame={'blue'}
      />
      :
      
      <Text> Send to data base </Text>}

      </View>
     
    );
  }
}



//              
const styles = StyleSheet.create({
  scrollView: {
  },

  
  
});






export default App;