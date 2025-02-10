import { View, Text,Image,Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';



function PlaceItem({place, onSelect}){
    console.log(place);
    return(
        <Pressable style={({pressed})=> [styles.item, pressed && styles.pressed]} onPress={onSelect}>
            <Image style={styles.image} source={{uri: place.imageUri}}/>
            <View style={styles.info}>
                <Text style={styles.title}>{place.tittle}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </View>
        </Pressable>
    )
}

export default PlaceItem;


const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        alignItems: 'flexStart',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        borderRadius: 4,
    },
    pessed:{
        opacity: .9,
    },
    image:{
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100,
    },
    info:{
        flex:2,
        padding: 12,
    },
    title:{
        fontWeight: 'bold',
        color: Colors.gray700,
        fontSize: 18
    },
    address:{
        color: Colors.gray700,
        fontSize: 12,
    }
});