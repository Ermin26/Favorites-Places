import { ScrollView, Image, View,Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import  OutlineBtn  from '../components/ui/OutlineBtn'
import {Colors} from '../constants/colors';
import { fetchPlaceDetails } from '../util/database';

function PlaceDetails({route, navigation}){
    const [place, setPlace] = useState();

    function showOnMap(){
        navigation.navigate('Map', {
            initialLat: place.lat,
            initialLng: place.lng
        })
    }

    const placeId = route.params.placeId

    useEffect(() => {
        async function loadPlaceData(){
            const data = await fetchPlaceDetails(placeId)
            setPlace(data);
            navigation.setOptions({
                title: data.title
            });
        }
        loadPlaceData();
    },[placeId])

    if(!place){
        return <View style={styles.fallback}>
            <Text>Loading place data...</Text>
        </View>
    }
    return(
        <ScrollView>
            <Image style={styles.image} source={{uri:place.imageUri}} />
            <View style={styles.locationCont}>
                <View style={styles.addressCont}>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
                <OutlineBtn icon="map" onPress={showOnMap}> View on Map</OutlineBtn>
            </View>
        </ScrollView>
    )
}


export default PlaceDetails;


const styles = StyleSheet.create({
    fallback:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationCont:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressCont:{
        padding:20
    },
    address:{
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    }
})