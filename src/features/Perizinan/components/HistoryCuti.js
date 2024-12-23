import React from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Background} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';
import HistoryItem from './HistoryItem';

export default function HistoryCuti({
  data,
  onEditPress,
  onDeletePress,
  onRefresh,
  refreshing,
}) {
  const filteredData = data.filter(item => item.is_exit_permit === '0');

  return (
    <View style={styles.container}>
      <Background />
      <View style={{padding: 10}}>
        {filteredData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image source={ICON_NOTFOUND_DATA} style={styles.image} />
            <Text style={styles.emptyText}>Data tidak ditemukan</Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <HistoryItem
                item={item}
                onEditPress={() => onEditPress(item)}
                onDeletePress={() => onDeletePress(item)}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 190,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: DIMENS.l,
    color: COLORS.grey,
  },
});
