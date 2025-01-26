import React, {useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteCouple, updateCouple} from '..';
import {
  Background,
  Gap,
  HeaderTransparent,
  ModalCustom,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function DetailDataCouple({route, navigation}) {
  const {data} = route.params;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const [editedData, setEditedData] = useState({
    name_couple: data.name_couple,
    couple_domisili: data.couple_domisili,
    children: data.children,
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await updateCouple(data.id, editedData);

      if (response.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        ToastAndroid.show('Data berhasil diperbarui!', ToastAndroid.SHORT);
        setEditModalVisible(false);
      }
    } catch (error) {
      ToastAndroid.show('Berhasil update data pasangan', ToastAndroid.SHORT);
      console.log('Error updating data:', error.message);
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
      // console.log('Error deleting data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reloadData = async () => {
    setRefreshing(true);
    try {
      console.log('Data refreshed');
    } catch (error) {
      // console.log('Error during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="default" backgroundColor="transparent" />
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Detail Data Pasangan"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reloadData}
            colors={['#ffd700']}
          />
        }
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          {!isDeleted ? (
            <>
              <View style={styles.content}>
                <Text style={styles.title}>Data Pasangan</Text>
                <View style={styles.section}>
                  <Icon name="account" size={24} color={COLORS.goldenOrange} />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Nama Pasangan</Text>
                    <Text style={styles.label}>
                      {editedData?.name_couple || '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Icon
                    name="account-child"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Jumlah Anak</Text>
                    <Text style={styles.label}>
                      {editedData?.children || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Icon
                    name="map-marker"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText}>
                    <Text style={styles.textTitle}>Domisili</Text>
                    <Text style={styles.label}>
                      {editedData?.couple_domisili || '-'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setEditModalVisible(true)}>
                  <Icon name="pencil" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => setDeleteModalVisible(true)}>
                  <Icon name="delete" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.noDataContainer}>
              <Image source={ICON_NOTFOUND_DATA} style={styles.notFoundImage} />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal Edit */}
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
        <View>
          <Text style={styles.inputLabel}>Nama</Text>
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
          <Text style={styles.inputLabel}>Domisili</Text>
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
          <Text style={styles.inputLabel}>Jumlah Anak</Text>
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
    padding: 20,
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  content: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    elevation: 2,
    marginTop: 5,
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
    color: '#999',
  },
  label: {
    fontSize: DIMENS.l,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 50,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 15,
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
