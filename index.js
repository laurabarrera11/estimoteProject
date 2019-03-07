/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry, Alert} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as RNEP from '@estimote/react-native-proximity'

AppRegistry.registerComponent(appName, () => App);


const ESTIMOTE_APP_ID = "estimoteproject-6ls";
const ESTIMOTE_APP_TOKEN = "96589f0e43ea00fa43c3ccd98c926b6c";

const zone1 = new RNEP.ProximityZone(1, "3d_printer");
zone1.onEnterAction = context => {

  console.log("zone1 onEnter", context);
    Alert.alert(
    'This is the 3D Printer',
    'Would you like to learn more?',
    [
      {text: 'Yes', onPress: () => console.log('Yes pressed')},
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      }
    ],
    {cancelable: true},
  );
};
zone1.onExitAction = context => {
  console.log("zone1 onExit", context);
};
zone1.onChangeAction = contexts => {
  // onChange event gives you granular data about which exact beacons are in range
  //
  // imagine there are 2 beacons tagged "lobby", to help cover the entire lobby area; here's an example sequence of events:
  //
  // 1. when you enter the range of the 1st one, you'll get:
  // lobby onEnter
  // lobby onChange with array [beacon1's context]
  //
  // 2. when you enter the range of the 2nd one, and are still in range of the 1st one:
  // lobby onChange with array [beacon1's context, beacon2's context]
  //
  // 3. when you exit the range of the 1st one, but are still in range of the 2nd one:
  // lobby onChange with array [beacon2's context]
  //
  // 4. when you finally exit the range of the 2nd one:
  // lobby onChange with empty array []
  // lobby onExit
  console.log("zone1 onChange", contexts);
};

const zone2 = new RNEP.ProximityZone(1, "laser_cutter");
zone2.onEnterAction = context => {
  console.log("zone2 onEnter", context);
    Alert.alert(
    'This is the Laser Cutter',
    'Would you like to learn more?',
    [
      {text: 'Yes', onPress: () => console.log('Yes pressed')},
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      }
    ],
    {cancelable: true},
  );
};
zone2.onExitAction = context => {
  console.log("zone2 onExit", context);
};
zone2.onChangeAction = contexts => {
  console.log("zone2 onChange", contexts);
};

const zone3 = new RNEP.ProximityZone(1, "drawing_table");
zone3.onEnterAction = context => {
  console.log("zone3 onEnter", context);
    Alert.alert(
    'This is the Drawing Table',
    'Would you like to learn more?',
    [
      {text: 'Yes', onPress: () => console.log('Yes pressed')},
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      }
    ],
    {cancelable: true},
  );
};
zone3.onExitAction = context => {
  console.log("zone3 onExit", context);
};
zone3.onChangeAction = contexts => {
  console.log("zone3 onChange", contexts);
};


RNEP.locationPermission.request().then(
  permission => {
    // `permission` will be one of RNEP.locationPermission.DENIED, .ALWAYS, or .WHEN_IN_USE
    console.log(`location permission: ${permission}`);

    if (permission !== RNEP.locationPermission.DENIED) {
      const credentials = new RNEP.CloudCredentials(
        ESTIMOTE_APP_ID,
        ESTIMOTE_APP_TOKEN
      );

      const config = {

        notification: {
          title: "Exploration mode is on",
          text: "We'll notify you when you're next to something interesting.",
          channel: {
            id: "exploration-mode",
            name: "Exploration Mode"
          }
        }
      };

      RNEP.proximityObserver.initialize(credentials, config);
    //  RNEP.proximityObserver.startObservingZones([zone1, zone2]);
    RNEP.proximityObserver.startObservingZones([zone1, zone2, zone3]);
    }
  },
  error => {
    console.error("Error when trying to obtain location permission", error);
  }
);
