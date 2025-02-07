import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react';
import MapView, { Marker } from "react-native-maps";

function Map(){

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