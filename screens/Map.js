import { View, Text, StyleSheet, Alert } from 'react-native'
import { useState, useLayoutEffect, useCallback } from 'react';
import MapView, { Marker } from "react-native-maps";
import IconBtn from '../components/ui/IconBtn';

function Map({navigation, route}){
    const initialLocation = route.params && {
        lat: parseFloat(route.params.initialLat),
        lng: parseFloat(route.params.initialLng),
    };
    const [selectedLoc, setSelectedLoc] = useState(initialLocation);

    const region = {
        latitude: initialLocation ? initialLocation.lat : 46.670837378921924,
        longitude: initialLocation ? initialLocation.lng : 15.628671683371065,
        latitudeDelta: 0.04,
        longitudeDelta: .04,
    };

    function selectLocationHandler(event){
        if(initialLocation){
            return;
        }
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLoc({lat: lat, lng: lng})
    }

    const savePickedLocation = useCallback(() => {
            if(!selectedLoc){
                Alert.alert('No picked location', 'You must select a location.');
                return;
            }
            navigation.navigate('AddPlace', {
                pickedLat: selectedLoc.lat,
                pickedLng: selectedLoc.lng
            });
        },[navigation, selectedLoc]
    )

    useLayoutEffect(() => {
        if(initialLocation){
            return;
        }
        navigation.setOptions({
            headerRight: ({tintColor}) => (
            <IconBtn
            icon="save"
            size={24}
            color={tintColor}
            onPress={savePickedLocation}
            />)
        })
    },[navigation, savePickedLocation]);

    return (

        <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler} >
            { selectedLoc && <Marker coordinate={{
                title: "Picked location",
                latitude: parseFloat(selectedLoc.lat),
                longitude: parseFloat(selectedLoc.lng),
            }} />}
        </MapView>
    )
};



export default Map;

const styles = StyleSheet.create({
    map:{
        flex: 1,
    }
});