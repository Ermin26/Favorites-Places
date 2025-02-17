import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Colors} from '../../constants/colors';
import PlaceItem from './PlaceItem';


function PlacesList({places}){
    const navigation = useNavigation();
    function selectPlace(id){
        navigation.navigate('PlaceDetails',{
            placeId: id
        })
    }
    if(!places || places.length === 0){
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No added places</Text>
        </View>
    }
    return (
        <FlatList style={styles.list} data={places} keyExtractor={(item) => item.id} renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlace} />} />
    )
}


export default PlacesList;

const styles = StyleSheet.create({
    list:{
        margin: 24,
    },
    fallbackContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary50,
    }
});