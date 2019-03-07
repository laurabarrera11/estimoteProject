import {AppRegistry, Alert} from 'react-native';

export function displayAlert(tag){
  var toolName;
  if(tag==='laser_cutter') toolName="Laser Cutter"
  if(tag==='3d_printer') toolName="3D Printer"
  if(tag==='drawing_table') toolName="Drawing Table"

  var text="This is the " + toolName
  Alert.alert(
  text,
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
}
