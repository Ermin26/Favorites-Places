import {Ionicons} from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native';



function IconBtn({icon, size, color, onPress}){
    return <Pressable style={({pressed}) => [styles.btnStyle, pressed && styles.pressed]} onPress={onPress}>
        <Ionicons name={icon} size={size} color={color}  />
    </Pressable>
}




export default IconBtn;


const styles = StyleSheet.create({
    btnStyle:{
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed:{
        opacity: 0.7
    }
});