import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {HomeScreen, AddTaskScreen, TaskDetailsScreen} from '../screens';
import ArrowBackIcon from '../assets/icons/arrow_back.svg';
import {COLORS, screens} from '../values';
import {px} from '../utils';

const {Screen, Navigator} = createNativeStackNavigator();

const navigationRef = createNavigationContainerRef();

export const RootNavigator = () => {
  const renderHeaderTitle = () => {
    const route = navigationRef.current?.getCurrentRoute();
    const {isEdit} = route?.params;
    return (
      <View style={{alignSelf: 'center'}}>
        <Text style={styles.headerTitle}>
          {isEdit ? screens.EDIT : screens.ADD}
        </Text>
      </View>
    );
  };

  const renderBackArrow = () => {
    return (
      <TouchableOpacity
        style={{position: 'absolute', left: 0}}
        onPress={() => navigationRef.current?.goBack()}>
        <ArrowBackIcon fill={COLORS.white} />
      </TouchableOpacity>
    );
  };
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{colors: {background: COLORS.main}}}>
      <Navigator
        screenOptions={{
          headerStyle: {backgroundColor: COLORS.main},
          headerTitleStyle: {color: COLORS.white},
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}>
        <Screen
          name={screens.HOME}
          component={HomeScreen}
          options={{
            headerBackVisible: false,
          }}
        />
        <Screen
          name={screens.DETAILS}
          component={TaskDetailsScreen}
          options={{
            headerLeft: renderBackArrow,
          }}
        />
        <Screen
          name={screens.ADD}
          component={AddTaskScreen}
          options={{
            headerTitle: renderHeaderTitle,
            headerLeft: renderBackArrow,
            headerBackVisible: false,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: px(18),
    color: COLORS.white,
    fontWeight: '600',
  },
});
