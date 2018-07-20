
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,View
} from 'react-native';

import { 
    createStackNavigator,createBottomTabNavigator
} from 'react-navigation'

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeScreens from './screens/HomeScreens'
import AboutScreens from './screens/AboutScreens'
import HistoryScreens from './screens/HistoryScreens'
import GenerateScreens from './screens/GenerateScreens'
import ScanScreens from './screens/ScanScreens'





const AppStacknavigator = createStackNavigator({
    Home : {
        screen : HomeScreens
    },
    About: {
        screen : AboutScreens
    }
})

const TabBottom = createBottomTabNavigator({
    Home : {
        screen : HomeScreens,
        navigationOptions:{
            tabBarlabel:'Home',
            tabBarIcon:({tintColor}) => (
                <Icon name="ios-home" color={tintColor} size={24}/>
            )
        }
    },
    About: {
        screen : AboutScreens,
        navigationOptions:{
            tabBarlabel:'About',
            tabBarIcon:({tintColor}) => (
                <Icon name="ios-person" color={tintColor} size={24}/>
            )
            
        }
    }
},{
    tabBarOptions:{
        activeTintColor:'red',
        inactiveTintColor:'grey'   
    }
});

const TabBottomMaterial = createMaterialBottomTabNavigator({
    Home : {
        screen : ScanScreens,
        navigationOptions:{
            tabBarlabel:'Home',
            tabBarIcon:({tintColor}) => (
                <Icon name="ios-home" color={tintColor} size={24}/>
            )
        }
    },
    History : {
        screen : HistoryScreens,
        navigationOptions:{
            tabBarlabel:'History',
            tabBarIcon:({tintColor}) => (
                <Icon name="ios-heart" color={tintColor} size={24}/>
            )
        }
    },
    Generate : {
        screen : GenerateScreens,
        navigationOptions:{
            tabBarlabel:'Generate',
            tabBarIcon:({tintColor}) => (
                <Icon name="ios-barcode" color={tintColor} size={24}/>
            )
        }
    },
    About: {
        screen : AboutScreens,
        navigationOptions:{
            tabBarlabel:'About',
            tabBarIcon:({tintColor}) => (
                <Icon name="ios-person" color={tintColor} size={24}/>
            )
            
        }
    }
},
{   
  
    tabBarOptions:{
        
    },
    swipeEnabled:true,
    activeTintColor:'red',
    inactiveTintColor:'grey',
    barStyle: { backgroundColor: '#ffffff' },
    shifting:true

});


export default class App extends Component {

    render() {
        return(
            <TabBottomMaterial/>
        )
    }
}

