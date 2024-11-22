import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap} from '../../../Component';
import {IMG_PROFILE_FAKE} from '../../../assets';
import {COLORS} from '../../../utils';

export default function NotificationList({
  messages,
  selectedMessages,
  setSelectedMessages,
  navigation,
}) {
  const handleMessageLongPress = id => {
    setSelectedMessages(
      selectedMessages.includes(id)
        ? selectedMessages.filter(message => message !== id)
        : [...selectedMessages, id],
    );
  };

  return messages.map(({id, sender, message, time, count}) => (
    <TouchableOpacity
      key={id}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('DetailNotification')}
      style={[
        styles.notificationItem,
        selectedMessages.includes(id) && styles.selectedNotification,
      ]}
      onLongPress={() => handleMessageLongPress(id)}>
      {selectedMessages.includes(id) && (
        <Icon name="check-decagram-outline" size={51} color={COLORS.black} />
      )}
      <Gap width={13} />
      <Image source={IMG_PROFILE_FAKE} style={styles.image} />
      <Gap width={13} />
      <View style={styles.messageContainer}>
        <Text style={styles.sender}>{sender}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
        <View style={styles.countContainer}>
          <Text style={styles.count}>{count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ));
}

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.champagne,
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    marginVertical: 7,
  },
  selectedNotification: {
    backgroundColor: COLORS.red,
  },
  image: {
    height: 55,
    width: 55,
  },
  messageContainer: {
    flex: 1,
  },
  sender: {
    fontSize: 16,
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#888',
  },
  timeContainer: {
    alignItems: 'center',
  },
  time: {
    fontSize: 13,
    color: COLORS.black,
  },
  countContainer: {
    marginTop: 8,
    backgroundColor: COLORS.goldenOrange,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  count: {
    fontSize: 12,
    color: COLORS.white,
  },
});
