import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import { Container, Header, Title,Item,Input, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import Banner from './Banner'
import * as C from '../constanst/constants'
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge"

let tracker = new GoogleAnalyticsTracker(C.KEY_GA);
tracker.trackScreenView("GenerateScreen");
tracker.trackEvent("ScanCode", "scancode")


export default class GenerateScreens extends Component {
 

    constructor(props){
        super(props)
        this.state = {
            text:''
        }
        
        this.TextChange = this.TextChange.bind(this)
    }
  
  TextChange(text) {
    this.setState({text})
    
  }

  render() {
    return (
        <Container>
                <Header>
                <Body  style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                 <Title>Generate QR Code</Title>
               </Body>
                     
                    </Header>

                <Content>
                <Card>
                  <CardItem>
                    <Body>
                      <Text>Generate Text ke QR Code </Text>
                    </Body>
                  </CardItem>
                </Card>
         
          <Item success>
              <Input placeholder="Ketik Text disini"
                    onChangeText={this.TextChange}
                    value={this.state.text}
                />
                <Icon name='checkmark-circle' />   
          </Item>

        
            
  
              {this.state.text ?
                <Card>
                <CardItem>
                <Body>
                <QRCode
                    value={this.state.text}
                    size={250}
                    bgColor='purple'
                    fgColor='white'/>
                    </Body>
                    </CardItem>
                  </Card>

                : null }
              
           
                              
                </Content>  
                <Banner/>   
         </Container>
    )
  }
}
