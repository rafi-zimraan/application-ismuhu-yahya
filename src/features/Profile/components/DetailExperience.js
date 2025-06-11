import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {deleteExperience, updateExperience} from '..';
import {
  Gap,
  HeaderTransparent,
  ModalCustom,
  Text,
  View,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';
import Toast from 'react-native-toast-message';

export default function DetailExperience({route, navigation}) {
  const {data} = route.params;
  const {colors, mode} = useSelector(state => state.theme);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const showToast = (message, type = 'info') => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const [editedData, setEditedData] = useState({
    company: data.company,
    length_of_work: data.length_of_work,
    position: data.position,
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await updateExperience(data.id, editedData);
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        showToast(response?.message);
        setEditModalVisible(false);
      }
    } catch (error) {
      console.log('Error updating experience:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteExperience(data.id);
      setIsDeleted(true);
      setDeleteModalVisible(false);
    } catch (error) {
      console.log('Error deleting experience:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={mode == 'light' ? 'default' : 'dark-content'}
        backgroundColor="transparent"
      />
      <HeaderTransparent
        title="Detail Data Pengalaman"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}} showImageBackground={true}>
        <ScrollView style={styles.container}>
          {!isDeleted ? (
            <>
              <View style={styles.content} section={true}>
                <View style={styles.viewButtonMore} section={true}>
                  <Text style={styles.title}>Data Pengalaman Kerja</Text>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setEditModalVisible(true)}>
                    <Icon name="pencil" size={24} color={COLORS.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => setDeleteModalVisible(true)}>
                    <Icon name="delete" size={24} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
                <View style={styles.section} section={true}>
                  <Icon
                    name="office-building"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText} section={true}>
                    <Text
                      style={[
                        styles.textTitle,
                        {color: colors[mode].textLabel},
                      ]}>
                      Nama Perusahaan
                    </Text>
                    <Text style={styles.label}>
                      {editedData.company || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section} section={true}>
                  <Icon name="timer" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContentText} section={true}>
                    <Text
                      style={[
                        styles.textTitle,
                        {color: colors[mode].textLabel},
                      ]}>
                      Lama Bekerja
                    </Text>
                    <Text style={styles.label}>
                      {editedData.length_of_work
                        ? `${editedData.length_of_work} Tahun`
                        : '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section} section={true}>
                  <Icon name="account" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContentText} section={true}>
                    <Text
                      style={[
                        styles.textTitle,
                        {color: colors[mode].textLabel},
                      ]}>
                      Posisi
                    </Text>
                    <Text style={styles.label}>
                      {editedData.position || '-'}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View
              style={styles.noDataContainer}
              useBackgroundTransparent={true}>
              <Image
                source={ICON_NOTFOUND_DATA}
                style={styles.notFoundImage}
                resizeMethod="resize"
                resizeMode="cover"
              />
            </View>
          )}
        </ScrollView>
      </View>

      <ModalCustom
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
        title="Edit Experience"
        description="Silakan ubah data di bawah ini:"
        buttonSubmit={handleUpdate}
        buttonDisable={isLoading}
        buttonLoading={isLoading}
        buttonTitle="Simpan"
        ColorIcon={COLORS.goldenOrange}
        iconModalName="content-save-edit"
        BackgroundButtonAction={COLORS.goldenOrange}
        TextColorButton={COLORS.white}>
        <View section={true}>
          <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
            Nama Perusahan
          </Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.company}
            placeholder="Company"
            placeholderTextColor={COLORS.grey}
            onChangeText={text => setEditedData({...editedData, company: text})}
          />
          <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
            Lama Bekerja
          </Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={String(editedData.length_of_work || '')}
            placeholder="Berapa lamaa kerja.."
            keyboardType="numeric"
            placeholderTextColor={COLORS.grey}
            onChangeText={text =>
              setEditedData({
                ...editedData,
                length_of_work: Number(text) || '',
              })
            }
          />
          <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
            Posisi
          </Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.position}
            placeholder="Position"
            placeholderTextColor={COLORS.grey}
            onChangeText={text =>
              setEditedData({...editedData, position: text})
            }
          />
        </View>
      </ModalCustom>

      <ModalCustom
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        iconModalName="alert-circle-outline"
        title="Hapus Experience"
        description="Apakah Anda yakin ingin menghapus data ini?"
        buttonSubmit={handleDelete}
        buttonDisable={isLoading}
        buttonLoading={isLoading}
        buttonTitle="Hapus"
        ColorIcon={COLORS.red}
        BackgroundButtonAction={COLORS.red}
        TextColorButton={COLORS.white}
      />
      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="lock-alert-outline"
        title="Sesi Kedaluwarsa"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data Anda dan melanjutkan aktivitas."
        buttonSubmit={() => {
          setTokenExpired(false);
          navigation.navigate('SignIn');
        }}
        buttonTitle="Login Ulang"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewButtonMore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
  },
  content: {
    borderRadius: 15,
    padding: 15,
    shadowColor: COLORS,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 2,
    marginTop: 5,
    borderWidth: 0.3,
    borderColor: COLORS.black,
    flexWrap: 'wrap',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 2,
  },
  viewContentText: {
    marginLeft: 15,
  },
  textTitle: {
    fontSize: DIMENS.m,
    color: COLORS.mediumGrey,
  },
  label: {
    fontSize: DIMENS.l,
    color: COLORS.textPrimary,
  },

  editButton: {
    backgroundColor: COLORS.greenConfirm,
    padding: 3,
    borderRadius: 50,
    marginLeft: 20,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
    padding: 3,
    borderRadius: 50,
  },
  inputLabel: {
    fontSize: DIMENS.m,
    marginTop: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 10,
    padding: 10,
    fontSize: DIMENS.m,
    marginBottom: 2,
    color: COLORS.black,
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  notFoundImage: {
    width: 250,
    height: 250,
  },
});
