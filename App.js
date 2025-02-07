import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IconBtn from './components/ui/IconBtn';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import { Colors } from './constants/colors';


const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <>
    <StatusBar />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor: Colors.primary500,
          headerTintColor: Colors.gray700,
        },
        contentStyle: { backgroundColor: Colors.gray700 }
      }}>
        <Stack.Screen name='AllPlaces' component={AllPlaces} options={({navigation}) => ({
          title: 'Your Favorite Places',
          headerRight: ({tintColor})=> <IconBtn icon="add" size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace')} />
        })}
        />
        <Stack.Screen name='AddPlace' component={AddPlace} options={{title: 'Add a new place'}} />
        <Stack.Screen name='Map' component={Map} options={{title: 'Pick location'}} />
      </Stack.Navigator>

    </NavigationContainer>
    </>
  );
}
