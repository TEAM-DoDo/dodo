import { Modal, Pressable, StyleSheet, Text, View, FlatList } from "react-native";
function ListSelectModal({data,onSelect,onCancel,isVisible}){
    const renderItem = ({item}) => {
        return (
            <Pressable style={Style.list_item_holder} onPress={() => onSelect(item)}>
                <Text style={Style.list_item_text}>{item}</Text>
            </Pressable>
        );
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onCancel}
        >
            <Pressable style={Style.modal_background} onPress={onCancel}>
                <View style={Style.modal_holder}>
                    <Text style={Style.list_title_text}>검색 종류를 선택하세요.</Text>
                    <FlatList
                        style={Style.list_holder}
                        data={data}
                        keyExtractor={(item) => item}
                        numColumns={1}
                        renderItem={renderItem}
                    />
                    <Pressable style={Style.modal_cancel_button} onPress={onCancel}>
                        <Text style={Style.modal_cancel_text}>취소</Text>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
};
const Style = StyleSheet.create({
    modal_background: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    modal_holder: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modal_cancel_button: {
        backgroundColor: "#E30A8B",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    modal_cancel_text: {
        color: "white",
        fontSize: 20,
        fontFamily : 'NanumGothic-ExtraBold',
        textAlign: "center",
    },
    list_title_text: {  
        fontSize: 20,
        fontFamily : 'NanumGothic-ExtraBold',
        textAlign: "center",
    },
    list_holder: {
        marginTop: 10,
        marginBottom: 10,
    },
    list_item_holder: {
        backgroundColor: "#F2F2F2",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    list_item_text: {
        fontSize: 20,
        textAlign: "center",
    },
});
export default ListSelectModal;