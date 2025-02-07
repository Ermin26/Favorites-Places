import { View, Text, StyleSheet, Alert } from 'react-native'
import { useState, useLayoutEffect, useCallback } from 'react';
import MapView, { Marker } from "react-native-maps";
import IconBtn from '../components/ui/IconBtn';

function Map({navigation}){

    const [selectedLoc, setSelectedLoc] = useState();

    const region = {
        latitude: 46.670837378921924,
        longitude: 15.628671683371065,
        latitudeDelta: 1,
        longitudeDelta: 1,
    };

    function selectLocationHandler(event){
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
                latitude: selectedLoc.lat,
                longitude: selectedLoc.lng,
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