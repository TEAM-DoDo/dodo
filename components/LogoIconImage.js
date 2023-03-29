//Import ---------------------------------------------------
//  Native
import { View, StyleSheet, Image } from "react-native";

//Definition Component ---------------------------------------------------
function LogoIconImage({style})
{
    const logoIconPath = require('../assets/favicon.png');

    return (
        <View style={style}>
            <Image source={logoIconPath} />
        </View>
    );
}

export default LogoIconImage;