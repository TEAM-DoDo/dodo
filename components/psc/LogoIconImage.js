//Import ---------------------------------------------------
//  Native
import { View, Image } from "react-native";

//Definition Component ---------------------------------------------------
function LogoIconImage({style})
{
    const logoIconPath = require('../../assets/images/logoIcon.png');

    return (
        <View style={style}>
            <Image source={logoIconPath} />
        </View>
    );
}

export default LogoIconImage;