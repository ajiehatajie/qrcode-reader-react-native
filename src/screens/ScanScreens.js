import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNavigationFocus } from "react-navigation";
import QRCodeScanner from "react-native-qrcode-scanner";
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Linking,Text,View,Alert,AsyncStorage,Dimensions,Clipboard
  } from 'react-native';
import * as C from '../constanst/constants'
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge"
import { Container, Header, Title, Left, Right, Button, Body, Content, Card, CardItem } from "native-base"
import Toast from 'react-native-simple-toast'
import Banner from './Banner'
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import Modal from 'react-native-modalbox';


let tracker = new GoogleAnalyticsTracker(C.KEY_GA);
tracker.trackScreenView("Home");
tracker.trackEvent("ScanCode", "scancode")

var DateNow = Date.now();

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

console.disableYellowBox = true;

class ScanScreens extends Component {
  
   state = {
        hasCameraPermission: null,
        lastScannedUrl: null,
        showToast: false,
        isOpen: false
  };

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  }


  componentDidMount() {


    AsyncStorage.getItem('@scanCodeWithDate', (error, result) => {
        if (result) {
           let resultParsed = JSON.parse(result)
           console.log(JSON.stringify(resultParsed))
        
        } 
    })


  }


  writeToClipboard = async () => {
    await Clipboard.setString(this.state.lastScannedUrl);
    Toast.show('scan sudah di copy')
  };

  onSuccess(e) {

    
   let lasScan = this.state.lastScannedUrl
   console.log(e.data)
   this.writeToClipboard();
  
   if(lasScan == e.data) {
      console.log("sudah di scan bang")
    } else {
      this.setState({lastScannedUrl:e.data,isOpen:true})

      

      AsyncStorage
      .getItem('@scanCodeWithDate')
      .then(favs => {
         
          favs = favs == null ? [] : JSON.parse(favs)
      
          let arrayUrl = []
  
          favs.map((x, y) => (
              arrayUrl.push(x.url)

          ))

          var found = arrayUrl.find((element) => {
              return element == e.data;
          })

          if(found === undefined) {
              console.log("gak ketemu")
              Toast.show(e.data)
              favs.push({ url:e.data,time:DateNow })
              //console.log(favs)
              return AsyncStorage.setItem('@scanCodeWithDate', JSON.stringify(favs))
            
          } else {
              console.log('duplicate')
              //Toast.show('Sudah Pernah di scan')
          }
      })

     
    }
        
  }


  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  }

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  }

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>
    );
  }


  renderCamera() {
    const isFocused = this.props.navigation.isFocused();
    
    if (!isFocused) {
        return null;
    } else if (isFocused) {
        return (
          <View style={styles.container}>

      
          <QRCodeScanner
          reactivate={true}
          showMarker
          onRead={this.onSuccess.bind(this)}
          cameraStyle={{ height: SCREEN_HEIGHT }}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
                <Text style={{ fontSize: 20, color: "white" }}>
                  QR Code & Barcode Scanner
                </Text>
              </View>
  
              <View style={{ flexDirection: "row" }}>
                <View style={styles.leftAndRightOverlay} />
  
                <View style={styles.rectangle}>
                  <Icon
                    name="ios-qr-scanner"
                    size={SCREEN_WIDTH * 0.73}
                    color={iconScanColor}
                  />
                  <Animatable.View
                    style={styles.scanBar}
                    direction="alternate-reverse"
                    iterationCount="infinite"
                    duration={1700}
                    easing="linear"
                    animation={this.makeSlideOutTranslation(
                      "translateY",
                      SCREEN_WIDTH * -0.54
                    )}
                  />
                </View>
  
                <View style={styles.leftAndRightOverlay} />
              </View>
  
              <View style={styles.bottomOverlay} />
               
            </View>
          }
        />
        </View>
        )
    }
}

  render() {
    return (
        <View style={{ flex: 1,backgroundColor:'rgba(0,0,0,0.5)' }}>
          <Banner/>
           {this.renderCamera()}
           {this._maybeRenderUrl()}
           
        </View>
    )
  }
  
}


const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "#ffffff";


const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  },
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 15,
      color: '#ffffff',
    },
    textBold: {
      fontWeight: '500',
      color: '#000',
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
      padding: 16,
    },
    container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
        },
        bottomBar: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 15,
          flexDirection: 'row',
        },
        url: {
          flex: 1,
        },
        urlText: {
          color: '#fff',
          fontSize: 15,
        },
        cancelButton: {
          marginLeft: 10,
          alignItems: 'center',
          justifyContent: 'center',
        },
        cancelButtonText: {
          color: 'rgba(255,255,255,0.8)',
          fontSize: 18,
        },
        modal: {
          justifyContent: 'center',
          alignItems: 'center'
        },
      
        modal2: {
          height: 230,
          backgroundColor: "#3B5998"
        },
      
        modal3: {
          height: 300,
          width: 300
        },
      
        modal4: {
          height: 300
        },
        text: {
          color: "black",
          fontSize: 22
        }
      
  });
  
  

export default withNavigationFocus(ScanScreens);
