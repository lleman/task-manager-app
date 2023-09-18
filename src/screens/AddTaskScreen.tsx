import React, {useEffect, useReducer, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLORS, screens, constants} from '../values';
import CalendarIcon from '../assets/icons/calendar.svg';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {addTask, editTask} from '../store/data';
import {dateFormatter, px} from '../utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface AddTaskProps {
  navigation: any;
  route: any;
}

const initialState = {
  title: '',
  description: '',
  dueDate: new Date(),
};

const reducer = (state: object, action: any) => {
  return {...state, ...action};
};

export const AddTaskScreen = ({navigation, route}: AddTaskProps) => {
  const {isEdit} = route.params;
  const dispatch = useDispatch();

  const [inputHeight, setInputHeight] = useState(40);

  const [isDatePickerActive, setIsDatePickerActive] = useState(false);
  const [error, setError] = useState({
    title: false,
    description: false,
  });

  const [data, dispatchData] = useReducer(reducer, initialState);

  useEffect(() => {
    if (isEdit) {
      const {title, description, dueDate} = route.params.data;
      dispatchData({title, description, dueDate: new Date(dueDate)});
    }
  }, [isEdit]);

  const renderLabel = (label: string) => {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  };

  const renderError = () => {
    return (
      <View>
        <Text style={{color: COLORS.red}}>{constants.required}</Text>
      </View>
    );
  };

  const onConfirmDate = (date: Date) => {
    dispatchData({dueDate: date});
    setIsDatePickerActive(false);
  };

  const onCancel = () => {
    setIsDatePickerActive(false);
  };

  const onSave = () => {
    const titleFilled = data.title.trim();
    const descFilled = data.description.trim();
    if (titleFilled && descFilled) {
      onSubmit();
    } else {
      setError({title: !titleFilled, description: !descFilled});
    }
  };

  const onSubmit = () => {
    if (isEdit) {
      dispatch(
        editTask({
          id: route.params.data.id,
          data: {...data, id: route.params.data.id},
        }),
      );
    } else {
      dispatch(addTask({...data, id: data.title}));
    }
    navigation.replace(screens.HOME);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        overScrollMode={'never'}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <View style={styles.inputGroup}>
          {renderLabel(constants.title)}
          <TextInput
            value={data.title}
            onChangeText={value => {
              setError({title: false});
              dispatchData({title: value});
            }}
            style={[
              styles.input,
              {borderColor: error.title ? COLORS.red : COLORS.yellow},
            ]}
          />
          {error.title && renderError()}
        </View>
        <View style={styles.inputGroup}>
          {renderLabel(constants.description)}
          <TextInput
            value={data.description}
            onChangeText={value => {
              setError({title: false});
              dispatchData({description: value});
            }}
            multiline
            numberOfLines={10}
            style={[
              styles.input,
              {
                borderColor: error.description ? COLORS.red : COLORS.yellow,
                textAlignVertical: 'top',
                height: inputHeight,
              },
            ]}
            onContentSizeChange={e =>
              setInputHeight(e.nativeEvent.contentSize.height)
            }
          />
          {error.description && renderError()}
        </View>
        <View style={styles.inputGroup}>
          {renderLabel(constants.due_date)}
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setIsDatePickerActive(true)}>
            <Text style={styles.date}>{dateFormatter(data.dueDate)}</Text>
            <CalendarIcon fill={COLORS.yellow} width={28} height={28} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.save}>{constants.save}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <DatePicker
        open={isDatePickerActive}
        mode="date"
        date={data.dueDate}
        confirmText={constants.confirm}
        cancelText={constants.cancel}
        onConfirm={onConfirmDate}
        onCancel={onCancel}
        modal={true}
        androidVariant="iosClone"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
    padding: px(20),
  },
  inputGroup: {
    marginBottom: px(25),
  },
  input: {
    minHeight: px(40),
    borderColor: COLORS.white,
    borderBottomWidth: 1,
    color: COLORS.white,
    fontSize: px(16),
    paddingBottom: px(8),
    marginBottom: px(5),
  },
  label: {
    fontSize: 16,
    color: COLORS.yellow,
    fontWeight: '600',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: px(10),
    borderColor: COLORS.yellow,
    borderBottomWidth: 1,
    paddingBottom: px(8),
    marginBottom: px(20),
  },
  date: {
    color: COLORS.white,
    fontSize: px(16),
  },
  saveButton: {
    backgroundColor: COLORS.yellow,
    borderRadius: px(16),
    height: px(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: px(40),
  },
  save: {
    fontWeight: '700',
    fontSize: px(18),
    color: COLORS.black,
  },
});
