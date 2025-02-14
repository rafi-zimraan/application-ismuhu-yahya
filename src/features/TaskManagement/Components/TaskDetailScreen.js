import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getDetailTaskManagement} from '..';
import {Background, HeaderTransparent} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

const screenWidth = Dimensions.get('window').width;

export default function TaskDetailScreen({route, navigation}) {
  const {taskId} = route.params;
  const [taskDetail, setTaskDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTaskDetail();
  }, []);

  const fetchTaskDetail = async () => {
    setRefreshing(true);
    try {
      const response = await getDetailTaskManagement(taskId);
      console.log('response', response.data);
      if (response?.status) {
        setTaskDetail(response?.data);
      }
    } catch (error) {
      console.log('Error fetching task details:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Task Details"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.taskTitle}>{taskDetail?.activity}</Text>
        <Text style={styles.taskDate}>{taskDetail?.date}</Text>

        <Text style={styles.sectionTitle}>Files</Text>
        {taskDetail?.files?.length > 0 ? (
          <FlatList
            data={taskDetail?.files}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={fetchTaskDetail}
              />
            }
            keyExtractor={item => item.id.toString()}
            horizontal
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.fileItem}
                onPress={() => showImageModal(item.file)}>
                {item?.file_type === 'image' ? (
                  <Image
                    source={{
                      uri: `https://e490-2001-448a-d080-88-2b6a-936e-a0e9-cb5b.ngrok-free.app/${item.file}`,
                    }}
                    style={styles.imageFile}
                    resizeMethod="resize"
                  />
                ) : (
                  <Icon name="file-pdf-box" size={40} color={COLORS.red} />
                )}
                <Text style={styles.fileTitle}>{item?.title}</Text>
                <Text style={styles.fileDesc}>{item?.desc}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Image source={ICON_NOTFOUND_DATA} style={styles.notFoundImage} />
            <Text style={styles.noDataText}>Data file belum tersedia</Text>
          </View>
        )}
        {/* <FlatList
          data={taskDetail?.files}
          keyExtractor={item => item.id.toString()}
          horizontal
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchTaskDetail}
            />
          }
          renderItem={({item}) => (
            <TouchableOpacity style={styles.fileItem}>
              {item?.file_type === 'image' ? (
                <Image
                  source={{
                    uri: `https://e490-2001-448a-d080-88-2b6a-936e-a0e9-cb5b.ngrok-free.app/${item.file}`,
                  }}
                  style={styles.imageFile}
                />
              ) : (
                <Icon name="file-pdf-box" size={40} color={COLORS.red} />
              )}
              <Text style={styles.fileTitle}>{item?.title}</Text>
              <Text style={styles.fileTitle}>{item?.desc}</Text>
            </TouchableOpacity>
          )}
        /> */}

        {/* <Text style={styles.sectionTitle}>Attachments</Text>
        <FlatList
          data={taskDetail?.files}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.attachmentItem,
                item?.file_type === 'pdf' ? styles.pdfStyle : styles.docStyle,
              ]}>
              <Icon
                name={
                  item?.file_type === 'pdf'
                    ? 'file-document'
                    : 'file-document-multiple'
                }
                size={30}
                color={item?.file_type === 'pdf' ? COLORS.red : COLORS.blue}
              />
              <View style={{marginLeft: 5}}>
                <Text style={styles.fileTitle}>{item?.title}</Text>
                <Text style={styles.fileDesc}>{item?.desc}</Text>
              </View>
            </TouchableOpacity>
          )}
        /> */}
      </View>
    </View>
  );
}

const styles = {
  noDataContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  notFoundImage: {
    width: 150,
    height: 150,
  },
  noDataText: {
    fontSize: DIMENS.m,
    color: COLORS.darkGrey,
    textAlign: 'center',
    marginTop: -25,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: COLORS.goldenOrange,
    elevation: 3,
  },
  container: {
    flex: 1,
  },
  detailContainer: {
    padding: 15,
  },
  taskTitle: {
    fontSize: DIMENS.xxl,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  taskDate: {
    fontSize: DIMENS.s,
    color: COLORS.darkGrey,
  },
  fileItem: {
    width: screenWidth / 2 - 15,
    backgroundColor: COLORS.red,
    padding: 7,
    borderRadius: 10,
    margin: 5,
    elevation: 3,
  },
  imageFile: {
    width: '100%',
    height: 180,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    marginVertical: 15,
    color: COLORS.black,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    borderWidth: 0.4,
  },
  fileTitle: {
    fontSize: DIMENS.l,
    color: COLORS.black,
    textAlign: 'left',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    margin: 4,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  linkTitle: {
    fontSize: DIMENS.s,
    marginLeft: 5,
  },
  fileDesc: {
    fontSize: DIMENS.xs,
    color: COLORS.mediumGrey,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfStyle: {
    backgroundColor: '#ffe5e5',
  },
  docStyle: {
    backgroundColor: '#e5f0ff',
  },
};
