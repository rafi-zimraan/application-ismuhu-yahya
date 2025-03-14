import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {deleteFamilyData, updateFamilyData} from '..';
import {
  Gap,
  HeaderTransparent,
  ModalCustom,
  Text,
  View,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';

export default function DetailFamily({route, navigation}) {
  const {data} = route.params;
  const {colors, mode} = useSelector(state => state.theme);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const [editedData, setEditedData] = useState({
    father: data.father,
    mother: data.mother,
    brother: data.brother,
    child: data.child,
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await updateFamilyData(data.id, editedData);

      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      } else {
        ToastAndroid.show(response?.message, ToastAndroid.SHORT);
        setEditModalVisible(false);
      }
    } catch (error) {
      console.log('err update data family', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteFamilyData(data.id);
      setIsDeleted(true);
      setDeleteModalVisible(false);
    } catch (error) {
      console.log('err delete data family', error);
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
        title="Detail Data Keluarga"
        icon="arrow-left-circle-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}} showImageBackground={true}>
        <ScrollView style={styles.container}>
          {!isDeleted ? (
            <>
              <View style={styles.content} section={true}>
                <View style={styles.viewButtonMore} section={true}>
                  <Text style={styles.title}>Data Keluarga</Text>
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
                  <Icon
                    name="account-tie"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText} section={true}>
                    <Text
                      style={[
                        styles.textTitle,
                        {color: colors[mode].textLabel},
                      ]}>
                      Nama Ayah
                    </Text>
                    <Text style={styles.label}>{editedData.father || '-'}</Text>
                  </View>
                </View>

                <View style={styles.section} section={true}>
                  <Icon
                    name="account-tie-outline"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText} section={true}>
                    <Text
                      style={[
                        styles.textTitle,
                        {color: colors[mode].textLabel},
                      ]}>
                      Nama Ibu
                    </Text>
                    <Text style={styles.label}>{editedData.mother || '-'}</Text>
                  </View>
                </View>

                <View style={styles.section} section={true}>
                  <Icon
                    name="account-multiple"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText} section={true}>
                    <Text
                      style={[
                        styles.textTitle,
                        {color: colors[mode].textLabel},
                      ]}>
                      Jumlah Saudara
                    </Text>
                    <Text style={styles.label}>
                      {editedData.brother || '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.section} section={true}>
                  <Icon
                    name="account-child-outline"
                    size={24}
                    color={COLORS.goldenOrange}
                  />
                  <View style={styles.viewContentText} section={true}>
                    <Text
                      style={[
                        styles.textTitle,
                        {color: colors[mode].textLabel},
                      ]}>
                      Anak Ke
                    </Text>
                    <Text style={styles.label}>{editedData.child || '-'}</Text>
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
            Nama Ayah
          </Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.father}
            placeholder="Nama Ayah"
            placeholderTextColor={COLORS.grey}
            onChangeText={text => setEditedData({...editedData, father: text})}
          />
          <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
            Nama Ibu
          </Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.mother}
            placeholder="Nama Ibu"
            placeholderTextColor={COLORS.grey}
            onChangeText={text => setEditedData({...editedData, mother: text})}
          />
          <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
            Jumlah Saudara
          </Text>
          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.brother}
            keyboardType="numeric"
            placeholder="Nama Kakak"
            placeholderTextColor={COLORS.grey}
            onChangeText={text => setEditedData({...editedData, brother: text})}
          />
          <Text style={[styles.inputLabel, {color: colors[mode].textLabel}]}>
            Anak Ke
          </Text>

          <Gap height={5} />
          <TextInput
            style={styles.input}
            value={editedData.child}
            placeholder="Anak Ke"
            keyboardType="numeric"
            placeholderTextColor={COLORS.grey}
            onChangeText={text => setEditedData({...editedData, child: text})}
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
  viewButtonMore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
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
  },
  label: {
    fontSize: DIMENS.l,
    color: COLORS.textPrimary,
  },

  editButton: {
    backgroundColor: COLORS.greenConfirm,
    padding: 5,
    borderRadius: 50,
    marginLeft: 100,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
    padding: 5,
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
  },
  notFoundImage: {
    width: 250,
    height: 250,
  },
});
