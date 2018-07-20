import React, { Component } from 'react'
import { Container, Header, Title, Left, Icon, Right,
   Button, Body, Content,Text, Card, CardItem,List,ListItem,Item,Input,Fab } from "native-base";
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking,View,Alert,AsyncStorage,FlatList
} from 'react-native'
import Toast from 'react-native-simple-toast'
import * as C from '../constanst/constants'
import Banner from './Banner'
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge"
let tracker = new GoogleAnalyticsTracker(C.KEY_GA);
tracker.trackScreenView("History");
tracker.trackEvent("ScanCode", "scancode")



import moment from 'moment'
import IDlocale from 'moment/locale/id';
moment.locale('id', IDlocale)
export default class HistoryScreens extends Component {

  constructor(props){
    super(props)
    this.TextChange = this.TextChange.bind(this)
    this.state = {
      HistoryScan :[],
      FilterList:[],
      isLoading: true,
      text: '',
      filter:false,
      active:false
    }
  }


  componentDidMount() {
      console.log('did mount history')
      this._getHistory()

      this.props.navigation.addListener('willFocus', () => {
        console.log('will listener focus')
        this._getHistory() 
      })
  }

  _getHistory(){
    AsyncStorage.getItem('@scanCodeWithDate', (error, result) => {
      if (result) {
         let resultParsed = JSON.parse(result)
         console.log('history')
         console.log(JSON.stringify(resultParsed))

         this.setState({HistoryScan:resultParsed})
      
      } 
    })

  }

  async _clear() {

    try{
        await AsyncStorage.clear()
        this.setState({HistoryScan:[]})
        Toast.show('History is clear')
        this._getHistory() 
    }catch(e) {
      console.log(e)
    }
  }

  SearchFilterFunction(e){


      const { list } = this.state.HistoryScan
      console.log(e.toLowerCase()) 
      let text = e.toLowerCase()
      let countText = text.length

      if(countText > 0 ) {
        this.setState({
          FilterList: newData,
          text: e,
          filter: false
      })
  
      } else {

      const newData = list.filter((item) => {
        const itemData = item.key.toLowerCase()
        var d =  itemData.indexOf(text) > -1
        console.log(itemData + d)
        return d;

      })
          this.setState({
            FilterList: newData,
            text: e,
            filter: true
        })
        
      }


  //console.log(JSON.stringify(this.state))
   
  }


  async _getdetail(url) {
   
    Alert.alert(
      'Open this URL?',
      url,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(url),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  }

  TextChange(text) {
    this.setState({text})
    let countText = text.length

    if(countText == 0 ) {
      this.setState({
      
        filter: false
    })
    
    } else {
  
      const newData =  this.state.HistoryScan.filter((item) => {
        const itemData = item.url.toLowerCase()
        var d =  itemData.indexOf(text) > -1
        console.log(itemData + d)
        return d;
  
      })
      this.setState({
        FilterList: newData,
        text: text.toLowerCase(),
        filter: true
      })
      console.log(newData)
      console.log(text.toLowerCase()) 
    
    }

    
    
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }


  _delete(){
    let url = '';
    Alert.alert(
      'Clear History ?',
      url,
      [
        {
          text: 'Yes',
          onPress: () => this._clear(),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );

    this._getHistory()
  }


  render() {
    return (
        <Container>
         <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"
                    onChangeText={this.TextChange}
                    value={this.state.text}
                />
            
          </Item>
        </Header>
        <Content>

           {
              this.state.filter ?
              <List  style={{backgroundColor:'#ffffff'}}>
              {
                  this.state.FilterList.map((x, y) => (
                      <ListItem avatar  key={y} onPress={this._getdetail.bind(this, x.url)}  >
                      <Body>
                      <Text>{x.url.substring(0,40)}</Text>
                      <Text note>{moment(x.time).fromNow()}</Text>
                      
                      </Body>
                      <Right>
                     
                      <Icon name="arrow-forward" />
                      </Right>
                      
                  </ListItem>

                  ))
              }
      
          </List>
            :
                   <List  style={{backgroundColor:'#ffffff'}}>
                    {
                        this.state.HistoryScan.map((x, y) => (
                            <ListItem avatar  key={y} onPress={this._getdetail.bind(this, x.url)}  >
                            <Body>
                            <Text>{x.url.substring(0,40)}</Text>
                            <Text note>{moment(x.time).fromNow()}</Text>
                            
                            </Body>
                            <Right>
                           
                            <Icon name="arrow-forward" />
                            </Right>
                            
                        </ListItem>

                        ))
                    }
            
                </List>
           }
        </Content>
        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this._delete()}>
            <Icon name="trash" />
          
          </Fab>
        </View>
        <Banner/>
      </Container>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
     marginTop: 1,
     backgroundColor: '#FFFFFF',
     padding:10
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 0.5,
    borderColor: '#4488A7',
  },
   text: {
   color: '#132d3d',
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Poppins-Medium',
  },
  separator: {
    flex: 1,
    flexDirection: 'row',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
   
  },
  TextInputStyleClass:{
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderRadius: 7 
}

})
