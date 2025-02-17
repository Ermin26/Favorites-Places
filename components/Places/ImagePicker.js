import { launchCameraAsync,useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlineBtn from '../ui/OutlineBtn';

function ImagePicker({imageTaken}){
    const [pickedImage, setPickedImage] = useState();
    //! verifyPermissions is for iOS, otherwise it will not open camera because it is not granted permission
    const [permissionStatus, reqPermission] = useCameraPermissions();

    async function verifyPermissions(){
        if(permissionStatus.status === PermissionStatus.UNDETERMINED){
            const permission = await reqPermission();

            return permission.granted;
        }
        if(permissionStatus.status === PermissionStatus.DENIED){
            const retryPermission = await reqPermission();
            if (retryPermission.status === PermissionStatus.GRANTED) {
                return true;
            }
            Alert.alert(
                'Permission required',
                'Please enable location permissions in settings.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Try Again', onPress: verifyPermissions }, // 🔄 Poskusi še enkrat
                    { text: 'Open Settings', onPress: () => Linking.openSettings() }
                ]
            );
            return false;
        }
        return true;
    }

    async function takeImageHandler(){
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        await setPickedImage(image.assets[0].uri);
        imageTaken(image.assets[0].uri)
    }
let imagePreview = <Text style={styles.text}>No image taken yet.</Text>

if(pickedImage){
    imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />
}
    return(
        <View>
            <View style={pickedImage && styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlineBtn onPress={takeImageHandler} icon="camera" >Take image</OutlineBtn>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
    },
    text:{
        padding: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignContent: 'center',
        color: Colors.primary100,
        textAlign: 'center',

    }
})