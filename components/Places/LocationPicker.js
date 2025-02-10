import { View, StyleSheet, Linking, Alert, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { Colors } from '../../constants/colors'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import {getMapPreview, getAddress} from '../../util/location';
import OutlineBtn from "../ui/OutlineBtn";



function LocationPicker({locationPicked}){
    const [pickedLoc, setPickedLoc] = useState();
    const isFocused = useIsFocused(); // use this if you return some data from one screen to one where you will be redirected

    const navigation = useNavigation();
    const route = useRoute();

    const [permissionStatus, reqPermission] = useForegroundPermissions();

    
    useEffect(()=>{
        if(isFocused && route.params){
            const mapPickedLocation ={
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            };
            setPickedLoc(mapPickedLocation);
        }
    },[route, isFocused]);

    useEffect(()=>{
        async function handleLocation(){
            if(pickedLoc){
                const address = await getAddress({lat: pickedLoc.lat, lng: pickedLoc.lng});
                locationPicked({...pickedLoc,address:address});
            }
        }
        handleLocation();
    }, [pickedLoc])

    async function verifyPermissions() {
        const permission = await reqPermission();
        if(permissionStatus.status === PermissionStatus.UNDETERMINED){
            const permission = await reqPermission();

            return permission.granted;
        }
        if(permissionStatus.status === PermissionStatus.DENIED){
            Alert.alert(
                'Permission required',
                'Please enable location permissions in settings.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => Linking.openSettings() }
                ]
            );
            return false;
        }
        return true;
    }

    async function getLocation(){
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const userLocation = await getCurrentPositionAsync();
        setPickedLoc({
            lat: userLocation.coords.latitude,
            lng: userLocation.coords.longitude,
        });
    }


    function pickOnMap(){
        navigation.navigate('Map');
    }

    let locPreview = <Text>No location Picked yet.</Text>

    if(pickedLoc){
        locPreview = <Image style={styles.image} source={{uri: getMapPreview({lat: pickedLoc.lat, lng: pickedLoc.lng})}} />;
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locPreview}
            </View>
            <View style={styles.actions}>
                <OutlineBtn icon="location" onPress={getLocation} >Locate User</OutlineBtn>
                <OutlineBtn icon="map" onPress={pickOnMap} >Pick on map</OutlineBtn>
            </View>
        </View>
    )
};


export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions:{
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center'
    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
    }
});


