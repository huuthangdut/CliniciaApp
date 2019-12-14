import { Alert } from "react-native";

export class Toast {

    static error(errorMessage) {
        if(errorMessage && typeof(errorMessage) !== 'string') {
            errorMessage = JSON.stringify(errorMessage);
        }
        Alert.alert('Lỗi', errorMessage || 'Có lỗi xảy ra. Vui lòng thử lại !', [ {text: 'Đóng'} ]);
    } 
}