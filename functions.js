import {AppRegistry, Alert, Vibration} from 'react-native';
const PATTERN = [1000, 1000, 1000];

export function displayAlert(tag){
  Vibration.vibrate(PATTERN);
  var toolName;
  if(tag==='laser_cutter') toolName="Laser Cutter"
  if(tag==='3d_printer') toolName="3D Printer"
  if(tag==='drawing_table') toolName="Drawing Table"

  var text="This is the " + toolName
  Alert.alert(
  text,
  'Would you like to learn more?',
  [
    {text: 'Yes', onPress: () => Vibration.cancel()},
    {
      text: 'No',
      onPress: () => Vibration.cancel(),
      style: 'cancel',
    }
  ],
  {cancelable: true},
);
}
