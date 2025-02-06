import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native'
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

function PlaceForm(){

    const [enteredTitle, setTitle] = useState('');

    function changeTitleHandler(enteredText){
        setTitle(enteredText);
    }

    return <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
        </View>
        <View>
            <ImagePicker />
            <LocationPicker />
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