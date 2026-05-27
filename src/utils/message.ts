import { AxiosError } from "axios";
import { Alert, Platform, ToastAndroid } from "react-native";

export const successMesssage = (message: string) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
        Alert.alert("Success", message);
    }
}

export const showError = (error: unknown) => {
    let msg = "An unknown error occurred";
    if (error instanceof AxiosError) {
        const serverMessage = error.response?.data?.message;
        msg = serverMessage || error.message || "An unexpected server error occurred";
    } else if (error instanceof Error) {
        msg = error.message || "Something went wrong";
    }
    
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
        Alert.alert("Error", msg);
    }
}