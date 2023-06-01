import { ScrollView, View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';
import CircleUserImage from '../hgp/CircleUserImage';

const SimpleUserInfo = ({userInfo}) => {
    return(
        <View style={styles.contentContainer}>
            <CircleUserImage mode='tiny' margin={5} index={userInfo.id}/>
            <Text style={styles.content}>{userInfo.nickname}</Text>
        </View>
    );
}

export default SimpleUserInfo;

const styles = StyleSheet.create({
    contentContainer : {
        flexBasis: '24%',
        backgroundColor : '#FAEBD7',
        height : 30,
        borderRadius : 14,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',

        // IOS shadow
        shadowColor : '#c5c5c5',
        shadowOffset : { height : 3, },
        shadowOpacity : 1,
        // Android shadow
        elevation : 10,
    },
    content : {
        fontFamily:'NanumGothic-ExtraBold',
        fontWeight : 'bold',
        fontSize : 15,
        color : 'black',
        letterSpacing : 1.5
    },
});