import {Dimensions, PixelRatio, Platform} from 'react-native';

export const px = pixel => {
  const isIOS = Platform.OS === 'ios';
  const screenWidth = Dimensions.get('window').width;
  const scale = screenWidth / 375;
  const newSize = pixel * scale;
  let result = Math.round(PixelRatio.roundToNearestPixel(newSize));
  result = isIOS ? result : result - 2;
  return pixel > 0 && result <= 0 ? 1 : result;
};
