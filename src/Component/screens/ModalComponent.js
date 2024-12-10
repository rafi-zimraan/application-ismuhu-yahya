import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '..';

export default function ModalComponent({
  visible = false,
  onClose,
  children,
  title = 'Modal Title',
  icon = 'account-lock',
  showHeader = true,
}) {
  return (
    <>
      <StatusBar
        barStyle={visible ? 'light-content' : 'dark-content'}
        backgroundColor={visible ? '#00000080' : 'transparent'}
        animated
      />
      <Modal
        transparent
        visible={visible}
        onRequestClose={onClose}
        animationType="fade">
        <View style={styles.container}>
          <Pressable onPress={onClose} style={styles.backdrop} />
          <View>
            <ScrollView>
              <View style={styles.viewContainer}>
                {showHeader && (
                  <View style={styles.header}>
                    <Icon name={icon} size={25} color={'black'} />
                    <Text style={{color: 'black'}}>{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                      <Icon
                        name="close-circle-outline"
                        size={25}
                        color={'black'}
                      />
                    </TouchableOpacity>
                  </View>
                )}

                <View style={styles.viewInput}>{children}</View>

                <Gap height={10} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  viewInput: {
    paddingHorizontal: 10,
    marginVertical: 20,
    marginBottom: 10,
  },
  textSubmit: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    textShadowRadius: 5,
    textShadowOffset: {
      height: 1,
      width: 1,
    },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewContainer: {
    backgroundColor: 'white',
    elevation: 5,
    width: '85%',
    maxWidth: 450,
    alignSelf: 'center',
    padding: 20,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
