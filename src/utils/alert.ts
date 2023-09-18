import {Alert} from 'react-native';

export const displayAlert = (
  title,
  message,
  option1,
  onPressOption1,
  option2,
) => {
  Alert.alert(title, message, [
    {
      text: option2,
      style: 'cancel',
    },
    {
      text: option1,
      onPress: () => {
        onPressOption1();
      },
    },
  ]);
};
