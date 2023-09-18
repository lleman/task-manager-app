import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {COLORS} from '../values';
import TimeIcon from '../assets/icons/time.svg';
import {dateFormatter, px} from '../utils';

interface SingleTaskItemProps {
  item: ItemProps;
  onPress: () => void;
}

interface ItemProps {
  title: string;
  description: string;
  dueDate: Date;
}

export const SingleTaskItem = ({item, onPress}: SingleTaskItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>
      <Text numberOfLines={1} style={styles.description}>
        {item.description}
      </Text>
      <View style={styles.dateBox}>
        <TimeIcon fill={COLORS.main} />
        <Text style={styles.date}>{dateFormatter(item.dueDate)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: px(80),
    backgroundColor: COLORS.yellow,
    borderRadius: px(16),
    paddingHorizontal: px(20),
    paddingVertical: px(12),
    marginBottom: px(20),
  },
  title: {
    fontSize: px(18),
    fontWeight: '700',
    color: COLORS.main,
  },
  description: {
    fontSize: px(14),
    fontWeight: '400',
    color: COLORS.black,
    paddingVertical: px(12),
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: px(10),
    alignSelf: 'flex-end',
  },
  date: {
    fontSize: px(14),
    fontWeight: '400',
    color: COLORS.black,
    paddingLeft: px(4),
    fontStyle: 'italic',
  },
});
