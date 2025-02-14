import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  deleteLinkTaskManagement,
  getDetailLinkTaskManagement,
  updateLinkTaskManagement,
} from '..';
import {
  Background,
  HeaderTransparent,
  ModalCustom,
  ModalLoading,
} from '../../../Component';
import {ICON_NOTFOUND_DATA} from '../../../assets';
import {COLORS, DIMENS} from '../../../utils';
import {FecthMe} from '../../authentication';

export default function FileLinkScreen({route, navigation}) {
  const {taskId} = route.params;
  const [links, setLinks] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const checkSession = useCallback(async () => {
    try {
      const response = await FecthMe();
      if (response?.message === 'Silahkan login terlebih dahulu') {
        setTokenExpired(true);
      }
    } catch (error) {
      console.log('Gagal memverifikasi sesi:', error);
    }
  }, []);

  const fetchLinks = useCallback(
    async (isFirstLoad = false) => {
      if (isFirstLoad) {
        setInitialLoading(true);
      } else {
        setLoading(true);
      }
      try {
        const response = await getDetailLinkTaskManagement(taskId);
        if (response) {
          setLinks(response?.data?.links.reverse());
        }
      } catch (error) {
        console.log('Error fetching links:', error);
      } finally {
        if (isFirstLoad) {
          setInitialLoading(false);
        } else {
          setLoading(false);
        }
      }
    },
    [taskId],
  );

  useFocusEffect(
    useCallback(() => {
      checkSession();
      fetchLinks(true);
    }, [fetchLinks, checkSession]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchLinks();
    } finally {
      setRefreshing(false);
    }
  };

  const openLink = async (url, browser) => {
    setIsLoading(true);
    let formattedUrl = url.startsWith('http') ? url : `https://${url}`;

    try {
      if (browser === 'default') {
        await Linking.openURL(formattedUrl);
      } else if (browser === 'chrome') {
        await Linking.openURL(
          `googlechrome://${formattedUrl.replace('https://', '')}`,
        );
      }
    } catch (err) {
      console.log('Gagal membuka link:', err);
    } finally {
      setIsLoading(false);
      setModalVisible(false);
    }
  };

  const showBrowserOptions = url => {
    setSelectedUrl(url);
    setModalVisible(true);
  };

  const confirmDelete = id => {
    setSelectedLinkId(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedLinkId) return;

    setIsLoading(true);
    try {
      const response = await deleteLinkTaskManagement(selectedLinkId);

      setLinks(prevLinks =>
        prevLinks.filter(link => link.id !== selectedLinkId),
      );
      ToastAndroid.show(response?.message, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Gagal menghapus link', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
      setDeleteModalVisible(false);
    }
  };

  const handleEdit = (id, title, url, desc) => {
    setSelectedLinkId(id);
    setEditTitle(title);
    setEditUrl(url);
    setEditDesc(desc);
    setEditModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!editTitle.trim() || !editUrl.trim()) {
      ToastAndroid.show(
        'Judul dan URL tidak boleh kosong!',
        ToastAndroid.SHORT,
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateLinkTaskManagement(
        selectedLinkId,
        taskId,
        editTitle,
        editUrl,
        editDesc,
      );

      if (response?.status) {
        setLinks(prevLinks => {
          const updatedLinks = prevLinks.map(link =>
            link.id === selectedLinkId
              ? {...link, title: editTitle, url: editUrl, desc: editDesc}
              : link,
          );
          return updatedLinks.reverse();
        });

        ToastAndroid.show(response?.message, ToastAndroid.SHORT);
        setEditModalVisible(false);
      } else {
        ToastAndroid.show('Gagal memperbarui link', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error update:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.headerWrapper}>
        <HeaderTransparent
          title="Link Rencana Harian"
          icon="arrow-left-circle-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{padding: 15, flex: 1}}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : links.length === 0 ? (
          <View style={styles.contentNotFound}>
            <Image
              source={ICON_NOTFOUND_DATA}
              style={{height: 250, width: 230}}
            />
          </View>
        ) : (
          <FlatList
            data={links}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            renderItem={({item}) => (
              <View style={styles.linkItem}>
                <TouchableOpacity
                  style={styles.linkContainer}
                  onPress={() => showBrowserOptions(item.url)}>
                  <Icon name="link" size={20} color={COLORS.goldenOrange} />
                  <View style={styles.textContainer}>
                    <Text style={styles.linkText}>
                      {item.title || 'Judul tidak tersedia'}
                    </Text>
                    <Text style={styles.linkDesc}>
                      {item.desc ? item.desc : '-'}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    onPress={() =>
                      handleEdit(item.id, item.title, item.url, item.desc)
                    }
                    style={styles.viewEditBtn}>
                    <Icon name="pencil" size={18} color={COLORS.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => confirmDelete(item.id)}
                    style={styles.viewDeleteBtn}>
                    <Icon name="delete" size={18} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Buka dengan</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => openLink(selectedUrl, 'default')}>
              <Text style={styles.modalButtonText}>Default Browser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => openLink(selectedUrl, 'chrome')}>
              <Text style={styles.modalButtonText}>Google Chrome</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ModalCustom
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
        title="Edit Link"
        description="Perbarui informasi link"
        buttonTitle="Simpan"
        buttonSubmit={handleUpdate}
        buttonLoading={isLoading}
        iconModalName="note-edit-outline">
        <TextInput
          style={styles.input}
          placeholder="Judul"
          value={editTitle}
          onChangeText={setEditTitle}
          placeholderTextColor={COLORS.grey}
        />
        <TextInput
          style={styles.input}
          placeholder="URL"
          value={editUrl}
          onChangeText={setEditUrl}
          placeholderTextColor={COLORS.grey}
        />
        <TextInput
          style={styles.input}
          placeholder="Deskripsi"
          value={editDesc}
          onChangeText={setEditDesc}
          placeholderTextColor={COLORS.grey}
        />
      </ModalCustom>

      <ModalCustom
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        iconModalName="delete-outline"
        title="Hapus Link"
        description="Apakah Anda yakin ingin menghapus link ini?"
        ColorIcon={COLORS.red}
        BackgroundButtonAction={COLORS.red}
        buttonTitle="Hapus"
        TextColorButton={COLORS.white}
        buttonSubmit={handleDelete}
        buttonDisable={isLoading}
        buttonLoading={isLoading}
      />

      <ModalCustom
        visible={tokenExpired}
        onRequestClose={() => setTokenExpired(false)}
        iconModalName="alert-circle-outline"
        title="Sesi Berakhir"
        description="Sesi Anda telah berakhir. Silakan login ulang untuk memperbarui data."
        buttonSubmit={() => {
          setTokenExpired(false);
          navigation.navigate('SignIn');
        }}
        buttonTitle="Login Ulang"
      />

      <ModalLoading visible={initialLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },
  contentNotFound: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  viewEditBtn: {
    backgroundColor: COLORS.blueLight,
    elevation: 2,
    borderRadius: 25,
    borderWidth: 0.4,
    borderColor: COLORS.black,
    padding: 5,
  },
  viewDeleteBtn: {
    backgroundColor: COLORS.redLight,
    elevation: 2,
    borderRadius: 25,
    borderWidth: 0.4,
    borderColor: COLORS.black,
    padding: 5,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionButtons: {
    gap: 10,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.8,
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 3,
    borderWidth: 0.8,
    borderColor: COLORS.black,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  linkDesc: {
    fontSize: DIMENS.s,
    color: COLORS.mediumGrey,
    maxWidth: 240,
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
  noData: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: DIMENS.l,
    color: COLORS.black,
  },
  linkText: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    color: COLORS.black,
    maxWidth: 230,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: DIMENS.xl,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.black,
  },
  modalButton: {
    width: '100%',
    padding: 13,
    alignItems: 'center',
    backgroundColor: COLORS.goldenOrange,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  modalButtonText: {
    fontSize: DIMENS.l,
    color: COLORS.white,
  },
  modalCancel: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    marginTop: 3,
  },
  modalCancelText: {
    fontSize: DIMENS.l,
    color: COLORS.red,
    fontWeight: 'bold',
  },
});
