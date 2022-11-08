import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

export default function Home() {
    return (  
        <View style={{height: '100%' ,display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <Icon name="check" size={30} color="#900" />
            <Text style={{textAlign: 'center', fontSize: 30, color: 'blue'}}>Home Page</Text>
        </View>
    );
}
