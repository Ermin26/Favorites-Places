import { useEffect, useState } from 'react';
import PlacesList from '../components/Places/PlacesList';
import { useIsFocused } from '@react-navigation/native';


function AllPlaces({route}){
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();
    useEffect(()=>{
        if(isFocused && route.params){
            //console.log("This is params: ",route.params.place);
            setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
        }
    },[isFocused, route])
return <PlacesList places={loadedPlaces} />;


}

export default AllPlaces;