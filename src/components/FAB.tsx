import React from 'react';
import {TouchableOpacity, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {COLORS} from '../values';
import {px} from '../utils';

interface FABProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  Icon: any;
}

export const FAB = ({onPress, style, Icon}: FABProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Icon fill={COLORS.main} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: px(60),
    height: px(60),
    borderRadius: px(30),
    borderColor: COLORS.main,
    borderWidth: 1,
    backgroundColor: COLORS.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
