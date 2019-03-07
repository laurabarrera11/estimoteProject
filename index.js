/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry, Alert} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as RNEP from '@estimote/react-native-proximity'
import {displayAlert} from './functions.js'
AppRegistry.registerComponent(appName, () => App);


const ESTIMOTE_APP_ID = "estimoteproject-6ls";
const ESTIMOTE_APP_TOKEN = "96589f0e43ea00fa43c3ccd98c926b6c";


const zone1 = new RNEP.ProximityZone(1, "inclusiveMaking");

zone1.onEnterAction = context => {
  if(context["attachments"]){
    displayAlert(context["attachments"]["tool"])
  }
};

zone1.onExitAction = context => {
  console.log("zone1 onExit", context);
};
// zone1.onChangeAction = contexts => {
//
//   console.log("zone1 onChange", contexts);
//   for(var everyElement in contexts){
//     console.log("everyElement", everyElement)
//     console.log("nested", contexts[everyElement])
//   }
// };

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
      RNEP.proximityObserver.startObservingZones([zone1]);
    //RNEP.proximityObserver.startObservingZones([zone1, zone2, zone3]);
    }
  },
  error => {
    console.error("Error when trying to obtain location permission", error);
  }
);
