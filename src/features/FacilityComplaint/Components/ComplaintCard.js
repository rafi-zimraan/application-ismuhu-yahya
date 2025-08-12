import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS, DIMENS} from '../../../utils';

const ComplaintCard = ({
  title,
  reporter,
  note,
  urgent = false,
  onAccept,
  onDecline,
  img,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{uri: img}} style={styles.image} />
        {urgent && <Text style={styles.urgentLabel}>URGENT</Text>}
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.reporter}>{reporter}</Text>
      </View>
      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>Note</Text>
        <Text style={styles.noteContent}>{note}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.declineBtn} onPress={onDecline}>
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 290,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingBottom: 10,
    marginRight: 12,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  urgentLabel: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.red,
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: DIMENS.s,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  body: {
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: DIMENS.m,
  },
  reporter: {
    fontSize: DIMENS.s,
    color: COLORS.grey,
  },
  noteBox: {
    paddingHorizontal: 8,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noteContent: {
    fontSize: DIMENS.s,
    color: COLORS.textGreyDark,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  declineBtn: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.borderLight,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  acceptBtn: {
    backgroundColor: COLORS.buttonAccept,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  declineText: {
    color: COLORS.textPrimary,
  },
  acceptText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default ComplaintCard;
