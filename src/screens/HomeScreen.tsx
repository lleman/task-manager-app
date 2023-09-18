import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text, Dimensions} from 'react-native';
import AddIcon from '../assets/icons/add.svg';
import {COLORS, screens, constants} from '../values';
import {useSelector} from 'react-redux';
import {getTasks} from '../store/data';
import {SingleTaskItem, SearchBar, FAB} from '../components';
import {px} from '../utils';
import moment from 'moment';

interface HomeProps {
  navigation: any;
}

interface ItemProps {
  title: string;
  description: string;
}

export const HomeScreen = ({navigation}: HomeProps) => {
  const tasks = useSelector(state => getTasks(state));
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(tasks);
  }, [JSON.stringify(tasks)]);

  const onSearch = (v: string) => {
    setSearchValue(v);
    const data = tasks.filter(
      (item: ItemProps) =>
        item.title.startsWith(v.replace(/\s/g, '')) ||
        item.description.startsWith(v.replace(/\s/g, '')),
    );
    setSearchResults(data);
  };

  const renderEmptyMessage = () => {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.empty}>
          {searchValue ? constants.no_result : constants.no_task}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SingleTaskItem
            item={item}
            onPress={() =>
              navigation.navigate(screens.DETAILS, {
                data: {...item, dueDate: moment(item.dueDate).toISOString()},
              })
            }
          />
        )}
        ListHeaderComponent={
          tasks.length && (
            <SearchBar value={searchValue} onChangeText={onSearch} />
          )
        }
        ListEmptyComponent={renderEmptyMessage}
        showsVerticalScrollIndicator={false}
        style={{paddingBottom: px(60)}}
        overScrollMode="never"
      />
      <FAB
        Icon={AddIcon}
        onPress={() => navigation.navigate(screens.ADD, {isEdit: false})}
        style={styles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
    padding: px(20),
    paddingBottom: 0,
  },
  fab: {
    position: 'absolute',
    bottom: px(16),
    right: px(16),
  },
  emptyBox: {
    height: Dimensions.get('screen').height,
    top: Dimensions.get('screen').height * 0.3,
    alignSelf: 'center',
  },
  empty: {textAlign: 'center', color: COLORS.white},
});
