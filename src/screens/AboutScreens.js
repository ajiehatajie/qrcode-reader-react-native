import React, { Component } from 'react'
import { Linking,TouchableOpacity,Alert,StatusBar } from 'react-native'
import { Container, Header, Title, 
  Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,
  List,ListItem,Card,CardItem,Switch ,Thumbnail

} from 'native-base';
import * as C from '../constanst/constants'
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge"
import Banner from './Banner'
let tracker = new GoogleAnalyticsTracker(C.KEY_GA);
tracker.trackScreenView("About");
tracker.trackEvent("ScanCode", "scancode")

type Props = {};

export default class AboutScreens extends Component<Props> {
 
  BackTo() {
    this.props.navigation.navigate('Home')
  }

  _openWeb(){
    Alert.alert(
        'Open this URL?',
        'https://hatajie.com',
        [
          {
            text: 'Yes',
            onPress: () => Linking.openURL('https://hatajie.com'),
          },
          { text: 'No', onPress: () => {} },
        ],
        { cancellable: false }
      );
  }
  render() {
    return (
      <Container>
            

            <Header>
            <Body  style={{ flex: 1,   justifyContent: 'center', alignItems: 'center' }}>
                 <Title>Tentang Aplikasi</Title>
               </Body>
           </Header>

      <Content style={{backgroundColor:'#ffffff'}}>
      <Card style={{flex: 0}}>
          <CardItem>
              <Left>
                
                  <Body>
                  <Text>QR Code & Barcode Reader</Text>
                  <Text note>Aplikasi untuk membaca QRCode, Barcode dan Generate QRCODE
                  </Text>
                  </Body>
              </Left>
          </CardItem>
      </Card>

       <Card style={{flex: 0}}>
       <TouchableOpacity onPress={() => Linking.openURL("mailto:hatajie@gmail.com?subject=hai from apps QR Code")}>
          <CardItem header>
               <Text>Profile</Text>
              </CardItem>
          <CardItem>
            
              <Left>
                  <Icon name="person" />
                  <Body>
                  <Text>@ajiehatajie</Text>
                  <Text note>hatajie@gmail.com</Text>
                  </Body>
              </Left>
          </CardItem>
          </TouchableOpacity>
      </Card>

      <List>
          <ListItem itemDivider>
          </ListItem>
      </List>   
    
     
      <Card style={{flex: 0}}>
      <TouchableOpacity onPress={() => this._openWeb()}>
          <CardItem header>
               <Text>Blog</Text>
              </CardItem>
          <CardItem>
            
              <Left>
                  <Icon name="book" />
                  <Body>
                  <Text>hatajie.com</Text>
                
                  </Body>
              </Left>
          </CardItem>
          </TouchableOpacity>
      </Card>
      <Card style={{flex: 0}}>
          <CardItem>
               
                  <Body>
                           <Text>Versi : 0.1 - 2018</Text>
                  </Body>
                  
          </CardItem>
      </Card>
      <List>
          <ListItem itemDivider>
          </ListItem>
      </List>   
     
   </Content>
   <Banner/>
  </Container>

    )
  }
}
