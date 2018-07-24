import React, { Component } from 'react'
import * as C from '../constanst/constants'
import {
  AdMobBanner,
  AdMobRewarded,
  AdMobInterstitial
} from 'react-native-admob';

import DeviceInfo from 'react-native-device-info';
var DEV_ID = DeviceInfo.getDeviceName();

if (DEV_ID === 'Unknown') {
  DEV_ID = DeviceInfo.getUniqueID()
}

export default class Banner extends Component {

  componentDidMount() {
   
    setTimeout( () => {
      this.setTimePassed();
    },500)

    console.log(DEV_ID)

    AdMobInterstitial.setTestDevices([DEV_ID]);
    //AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);

    AdMobInterstitial.setAdUnitID("ca-app-pub-");

    AdMobInterstitial.addEventListener('adLoaded',
      () => console.log('AdMobInterstitial adLoaded')
    );
    AdMobInterstitial.addEventListener('adFailedToLoad',
      (error) => console.warn(error)
    );
    AdMobInterstitial.addEventListener('adOpened',
      () => console.log('AdMobInterstitial => adOpened')
    );
    AdMobInterstitial.addEventListener('adClosed',
      () => {
        console.log('AdMobInterstitial => adClosed');
        AdMobInterstitial.requestAd().catch(error => console.warn(error));
      }
    );
    AdMobInterstitial.addEventListener('adLeftApplication',
      () => console.log('AdMobInterstitial => adLeftApplication')
    );

    AdMobInterstitial.requestAd().catch(error => console.warn(error));
  }

  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }

  showRewarded() {
    AdMobRewarded.showAd().catch(error => console.warn(error));
  }

  showInterstitial() {
    AdMobInterstitial.showAd().catch(error => console.warn(error));
  }

  setTimePassed() {
    this.showInterstitial()
  }

  render() {
    return (

           <AdMobBanner
              adSize="smartBannerPortrait"
              adUnitID="ca-app-pub-"

              ref={el => (this._smartBannerExample = el)}
            />
     
    )
  }
}
