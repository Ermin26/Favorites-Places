import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native'
import { useCallback, useState } from 'react';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../../components/ui/Button';
import { Place } from '../../models/place';

function PlaceForm({onCreatePlace}){

    const [enteredTitle, setTitle] = useState('');
    const [pickedLocation, setPickedLocation] = useState();
    const [pickedImage, setPickedImage] = useState();

    function changeTitleHandler(enteredText){
        setTitle(enteredText);
    }
    function takenImage(imageUri){
        setPickedImage(imageUri);
    };

    const takenLocation = useCallback((location) => {
        setPickedLocation(location);
    }, []);

    function savePlaceHandler(){
        const placeData = new Place(enteredTitle, pickedImage, pickedLocation)
        //console.log('Place added:', placeData);
        onCreatePlace(placeData);
    };

    return <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
        </View>
        <View>
            <ImagePicker imageTaken={takenImage} />
            <LocationPicker locationPicked={takenLocation} />
            <Button onPress={savePlaceHandler}>Add place</Button>
        </View>
    </ScrollView>
}


export default PlaceForm;

const styles = StyleSheet.create({
    form:{
        flex: 1,
        padding: 24,
    },
    label:{
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input:{
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary700,
        backgroundColor: Colors.primary100

    }
});