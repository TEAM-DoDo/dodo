//Import ---------------------------------------------------
//  React
import { useState } from 'react';

//  Native
import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function DatePicker({dataMoveToScreen, visible, onCancel})
{
    // useState Hook를 사용하여 날짜와 모달 유형, 노출 여부를 설정할 변수를 생성
    const [date, onChangeDate] = useState(new Date()); // 선택 날짜

    const onConfirm = (selectedDate) => { // 날짜 또는 시간 선택 시
        onChangeDate(selectedDate); // 선택한 날짜 변경
        dataMoveToScreen(selectedDate);
        onCancel() // 모달 close
    };

    return (
        <View>
            <DateTimePickerModal 
                isVisible={visible}
                mode='date'
                onConfirm={onConfirm}
                onCancel={onCancel}
                date={date}
                display='spinner' 
            />
        </View>
    );
}

export default DatePicker;