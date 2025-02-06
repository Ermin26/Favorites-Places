import { View, Text,Image,Pressable, StyleSheet } from 'react-native';



function PlaceItem({place, onSelect}){
    return(
        <Pressable onPress={onSelect}>
            <Image source={{uri: place.imageUri}}/>
            <View>
                <Text>{place.tittle}</Text>
                <Text>{place.address}</Text>
            </View>
        </Pressable>
    )
}

export default PlaceItem;


const styles = StyleSheet.create({
    
});