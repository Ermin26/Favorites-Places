import { useEffect, useState } from 'react';
import PlacesList from '../components/Places/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { getPlaces } from '../util/database';


function AllPlaces(){
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();
    
    useEffect(()=>{
        async function loadPlaces(){
            const data = await getPlaces();
            setLoadedPlaces(data)
        }
        if(isFocused){
            loadPlaces();
        }
    },[isFocused])

return <PlacesList places={loadedPlaces} />;


}

export default AllPlaces;