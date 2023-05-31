import Postcode from '@actbase/react-daum-postcode';
import { Modal, SafeAreaView, Dimensions } from 'react-native';
import TopBar from './TopBar';
function AddressModal({isVisible, onAdressSelected, onCancel}){
    return(
        <Modal visible={isVisible}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <TopBar title="주소 검색" onGoBackPressed={onCancel} enableAlarmButton={false}/>
        <Postcode
            style={{ width: "100%", flex:1}}
            jsOptions={{ animation: true, hideMapBtn: true }}
            onSelected={onAdressSelected}
            />
        </SafeAreaView>
        </Modal>
    )
}
export default AddressModal
