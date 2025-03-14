import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../../Component';
import {COLORS, DIMENS} from '../../../utils';

export default function TaskItem({
  item,
  index,
  navigation,
  handleLongPress,
  selectedTaskIdModal,
  modalVisible,
  setModalLinkVisible,
  setModalUploadVisible,
  setSelectedTaskId,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate('TaskDetailScreen', {taskId: item.id})}
      onLongPress={e => handleLongPress(index, e, item.id)}>
      <View
        style={[
          styles.card,
          {
            backgroundColor:
              selectedTaskIdModal === item.id && modalVisible
                ? COLORS.mediumGrey
                : item.status === '1'
                ? COLORS.greenLight
                : COLORS.white,
          },
        ]}>
        <Text style={styles.cardTitle}>{item?.activity}</Text>
        <Gap height={10} />
        <View style={styles.leftContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              setSelectedTaskId(item.id);
              setModalUploadVisible(true);
            }}>
            <Icon name="cloud-upload" size={20} color={COLORS.black} />
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              setModalLinkVisible(true);
              setSelectedTaskId(item.id);
            }}>
            <Icon name="link" size={20} color={COLORS.black} />
            <Text style={styles.buttonText}>Link</Text>
          </TouchableOpacity>
        </View>
        <Gap height={3} />
        <View style={styles.footer}>
          <View style={styles.countContainer}>
            <TouchableOpacity
              style={styles.countButton}
              onPress={async () => {
                await navigation.navigate('FilesScreen', {
                  taskId: item.id,
                });
              }}>
              <Icon name="file" size={16} color={COLORS.black} />
              <Text style={styles.countText}>{item.files.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.countButton}
              onPress={async () => {
                await navigation.navigate('FileLinkScreen', {
                  taskId: item.id,
                });
              }}>
              <Icon name="attachment" size={16} color={COLORS.black} />
              <Text style={styles.countText}>{item.links.length}</Text>
            </TouchableOpacity>

            {item.addition_task === '1' && (
              <TouchableOpacity style={styles.additionTaskButton}>
                <Icon name="check-circle" size={16} color={COLORS.white} />
                <Text style={styles.additionTaskText}>Tambahan</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.rightContainer}>
            <Icon name="calendar-month" size={16} color={COLORS.black} />
            <Gap width={5} />
            <Text style={styles.textDate}>{item?.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: DIMENS.l,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    borderWidth: 0.4,
    borderColor: COLORS.black,
    elevation: 4,
  },
  cardTitle: {
    fontSize: DIMENS.l,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.goldenOrange,
    padding: 5,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: DIMENS.s,
    fontWeight: '500',
    color: COLORS.black,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  countContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  countButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.white,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: COLORS.black,
    padding: 5,
    borderRadius: 5,
  },
  countText: {
    fontSize: DIMENS.s,
    fontWeight: '500',
    color: COLORS.black,
  },
  additionTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blueLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginLeft: 8,
  },
  additionTaskText: {
    color: COLORS.white,
    fontSize: DIMENS.s,
    fontWeight: '500',
    marginLeft: 5,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.4,
    borderRadius: 5,
    borderColor: COLORS.black,
    padding: 2,
    marginVertical: 3,
    paddingHorizontal: 4,
  },
  textDate: {
    color: COLORS.black,
    fontSize: DIMENS.s,
    fontWeight: '500',
  },
});
