import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerContent = ({onClose, title, styles}) => (
  <View style={styles.container}>
    <Pressable onPress={onClose}>
      <Icon name={'account'} size={23} color={'black'} />
      <Text style={{color: 'blue', fontSize: 15}}>{title}</Text>
    </Pressable>
  </View>
);

export default DrawerContent;
