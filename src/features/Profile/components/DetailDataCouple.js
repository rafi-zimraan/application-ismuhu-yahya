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
import {deleteCouple, updateCouple} from '..';
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

export default function DetailDataCouple({route, navigation}) {
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
    name_couple: data.name_couple,
    couple_domisili: data.couple_domisili,
    children: data.children,
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await updateCouple(data.id, editedData);
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        showToast(response?.message);
        setEditModalVisible(false);
      }
    } catch (error) {
      console.log('Error updating data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteCouple(data.id);
      setIsDeleted(true);
      setDeleteModalVisible(false);
    } catch (error) {
      console.log('Error deleting data:', error.message);
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
        title="Detail Data Pasangan"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}} showImageBackground={true}>
        <ScrollView style={styles.container}>
          {!isDeleted ? (
            <>
              <View style={styles.content} section={true}>
                <View style={styles.viewButtonSection} section={true}>
                  <Text style={styles.title}>Data Pasangan</Text>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setEditModalVisible(true)}>
                    <Icon name="pencil" size={20} color={COLORS.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => setDeleteModalVisible(true)}>
                    <Icon name="delete" size={20} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
                <View style={styles.section} section={true}>
                  <Icon name="account" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContentText} section={true}>
                    <Text
                      style={[
                        styles.textTitle,
                        {color: colors[mode].textLabel},
                      ]}>
                      Nama Pasangan
                    </Text>
                    <Text style={styles.label}>
                      {editedData?.name_couple || '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.section} section={true}>
                  <Icon
                    name="account-child"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText} section={true}>
                    <Text
                      style={[
                        styles.textTitle,
                        {color: colors[mode].textLabel},
                      ]}>
                      Jumlah Anak
                    </Text>
                    <Text style={styles.label}>
                      {editedData?.children || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section} section={true}>
                  <Icon
                    name="map-marker"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText} section={true}>
                    <Text
                      style={[
                        styles.textTitle,
                        {color: colors[mode].textLabel},
                      ]}>
                      Domisili
                    </Text>
                    <Text style={styles.label}>
                      {editedData?.couple_domisili || '-'}
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
        title="Edit Data"
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
            Nama
          </Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.name_couple}
            placeholder="nama"
            placeholderTextColor={COLORS.grey}
            onChangeText={text =>
              setEditedData({...editedData, name_couple: text})
            }
          />
          <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
            Domisili
          </Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.couple_domisili}
            placeholderTextColor={COLORS.grey}
            placeholder="Domisili"
            onChangeText={text =>
              setEditedData({...editedData, couple_domisili: text})
            }
          />
          <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
            Jumlah Anak
          </Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={editedData.children}
            placeholder="Jumlah anak"
            placeholderTextColor={COLORS.grey}
            onChangeText={text =>
              setEditedData({...editedData, children: text})
            }
          />
        </View>
      </ModalCustom>

      <ModalCustom
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        iconModalName="alert-circle-outline"
        title="Hapus Data"
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
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
  },
  viewButtonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    borderRadius: 15,
    padding: 15,
    shadowColor: COLORS.black,
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
    padding: 5,
    borderRadius: 50,
    marginLeft: 90,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
    padding: 5,
    borderRadius: 50,
  },
  inputLabel: {
    fontSize: DIMENS.m,
    color: COLORS.darkGray,
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
  },
  notFoundImage: {
    width: 250,
    height: 250,
  },
});
