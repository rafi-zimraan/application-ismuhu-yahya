import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {TaskItem} from '..';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS} from '../../../utils';
import {Text} from '../../../Component';

export default function TaskList({
  data,
  loading,
  fetchTasks,
  navigation,
  handleLongPress,
  selectedTaskIdModal,
  modalVisible,
  setModalLinkVisible,
  setModalUploadVisible,
  setSelectedTaskId,
}) {
  return (
    <FlatList
      data={data}
      style={{flex: 1}}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={true}
      ListEmptyComponent={
        <>
          {loading ? (
            <View style={styles.viewLoadingData}>
              <Text style={styles.LoadingText}>Loading data...</Text>
              <ActivityIndicator size={'large'} color={COLORS.goldenOrange} />
            </View>
          ) : (
            <View style={styles.viewImageNotFound}>
              <Image
                source={ICON_NOTFOUND_DATA}
                style={styles.imgNotFound}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
          )}
        </>
      }
      refreshing={loading && data.length > 0}
      onRefresh={fetchTasks}
      renderItem={({item, index}) => (
        <TaskItem
          item={item}
          index={index}
          navigation={navigation}
          handleLongPress={handleLongPress}
          selectedTaskIdModal={selectedTaskIdModal}
          modalVisible={modalVisible}
          setModalLinkVisible={setModalLinkVisible}
          setModalUploadVisible={setModalUploadVisible}
          setSelectedTaskId={setSelectedTaskId}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  imgNotFound: {
    width: 220,
    height: 220,
  },
  viewLoadingData: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  LoadingText: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  viewImageNotFound: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
