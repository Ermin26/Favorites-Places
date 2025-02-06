import { View, StyleSheet, Linking, Alert } from "react-native";
import OutlineBtn from "../ui/OutlineBtn";
import { Colors } from '../../constants/colors'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'


function LocationPicker(){
    const [permissionStatus, reqPermission] = useForegroundPermissions();

    async function verifyPermissions() {
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
        console.log(userLocation.coords);
    }


    function pickOnMap(){}

    return (
        <View>
            <View style={styles.mapPreview}></View>
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
    }
});


