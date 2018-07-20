import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking,Text
} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Card, CardItem } from "native-base";
import { withNavigationFocus } from 'react-navigation';
import QRCodeScanner from 'react-native-qrcode-scanner';


type Props = {};


 class HomeScreens extends Component<Props> {



  constructor(props){
    super(props)
    this.state  = {
        link : ''
    }
    console.log('constucturt')
    
  }


  componentDidMount() {
  
    this.props.navigation.addListener('willFocus', () => {
      console.log('will listener focus')
      this.scanner.reactivate()  
    })
  }
  onSuccess(e) {
    this.setState({link:e.data})
    // Linking
      //.openURL(e.data)
      //.catch(err => console.error('An error occured', err));
  }
  componentWillUnmount(){
      
    console.log('will unmount home')
   
  }

  render() {
    return (
      <Container>
          <Header>
            <Body>
              <Title>Scan Code</Title>
            </Body>
               <Right />
          </Header>
        <Content>
        {this.state.addListener ? 
         <QRCodeScanner
        ref={(node) => { this.scanner = node }}
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
              arahkan ke kamera HP kamu
              {this.props.isFocused ? ' Focused' : ' Not focused'}
          </Text>
        } 
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
        showMarker={true}
        reactivate={true}
        fadeIn={false}
        
        />: <Text style={styles.buttonText}>OK. Got it!</Text>}
       
        </Content>
     
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
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
});


export default withNavigationFocus(HomeScreens)