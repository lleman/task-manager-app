import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import EditIcon from '../assets/icons/edit.svg';
import DeleteIcon from '../assets/icons/delete.svg';
import {COLORS, screens, constants} from '../values';
import {FAB} from '../components/FAB';
import {useDispatch} from 'react-redux';
import {deleteTask} from '../store/data';
import {dateFormatter, displayAlert, px} from '../utils';

interface TaskDetailsProps {
  navigation: any;
  route: any;
}

export const TaskDetailsScreen = ({navigation, route}: TaskDetailsProps) => {
  const {data} = route.params;
  const dispatch = useDispatch();

  const onDeleteTask = () => {
    dispatch(deleteTask(data.id)), navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.text}>
            {constants.description}: {data.description}
          </Text>
        </View>
        <Text style={styles.text}>
          {constants.deadline}: {dateFormatter(data.dueDate)}
        </Text>
      </ScrollView>
      <View style={styles.buttonBox}>
        <FAB
          Icon={EditIcon}
          onPress={() => navigation.navigate(screens.ADD, {isEdit: true, data})}
          style={{marginBottom: px(15)}}
        />
        <FAB
          Icon={DeleteIcon}
          onPress={() => {
            displayAlert(
              constants.delete,
              constants.sure_delete,
              constants.yes,
              onDeleteTask,
              constants.no,
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
    padding: px(20),
    paddingBottom: px(100),
  },
  title: {
    color: COLORS.dark,
    fontSize: px(18),
    fontWeight: '600',
  },
  descriptionBox: {
    paddingVertical: px(20),
    marginVertical: px(24),
  },
  text: {color: COLORS.dark, fontSize: 16, fontWeight: '400'},
  buttonBox: {
    position: 'absolute',
    bottom: px(10),
    right: px(10),
  },
});
