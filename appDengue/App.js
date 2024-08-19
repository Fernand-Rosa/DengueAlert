import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './assets/components/index/home/home';
import Complaint from './assets/components/index/newComplaint/complaint';
import Photograph from './assets/components/index/newComplaint/photograph';
import Upload from './assets/components/index/newComplaint/upload';
import Localization from './assets/components/index/maps/localization';
import LocationDetails from './assets/components/index/maps/locationDetails';
import StatusReport from './assets/components/index/denuncia/statusReport';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Complaint" component={Complaint} />
        <Stack.Screen name="Photograph" component={Photograph} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Localization" component={Localization} />
        <Stack.Screen name="LocationDetails" component={LocationDetails} />
        <Stack.Screen name="StatusReport" component={StatusReport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
