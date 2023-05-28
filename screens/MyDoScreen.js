import { ScrollView, View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { addUserInfo, removeUserInfo } from '../store/user-store';
import DoSimpleBanner from '../components/psc/DoSimpleBanner';

const MyDoScreen = (route, navigation) => {
    const [doList, setDoList] = useState([]); 
    
    const userId = useSelector(state => state.user.id);
    
    const handleResponseError = (err) => {
        Toast.show(err), 
        {
          duration : Toast.durations.SHORT,
          position : Toast.positions.BOTTOM,
          shadow : true,
          animation : true,
          hideOnPress : true,
          delay : 0,
        }
      }

    const updateMyDoList = ({data}) => 
    {
      setDoList(current => data.doResponseDTOList);
    }
  
    const updateData = async () => {
      await API.get(`api/users/doList`, {
        params : {
          id : userId,
        }
      }).then(updateMyDoList).catch(handleResponseError).finally(()=>console.log("Get Do list Axios 처리 끝"));
    }
    
    useEffect(()=>{
      navigation.addListener("focus", ()=>{
        updateData();
      });
    });

    return(
        <View>
            <View><Text>MyDo</Text></View>
            <View>
                <View>
                    <Text>가입한 Do</Text>
                </View>
                <View>
                    {doList.map(aDo => <DoSimpleBanner props={aDo} />)}
                </View>
            </View>
        </View>
    )
}

export default MyDoScreen;