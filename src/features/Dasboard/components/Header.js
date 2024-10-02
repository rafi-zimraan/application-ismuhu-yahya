import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {ICONS} from '../../../assets';

const Header = ({onLeftPress, onRightPress, styles}) => (
  <View style={styles.bodyContent}>
    <Pressable onPress={onLeftPress} style={styles.leftContent}>
      <Image source={ICONS.LogoDaasboard} style={{height: 53, width: 53}} />
      <View>
        <Text style={styles.txtTitleNavbar}>Marcom</Text>
        <Text style={styles.subtitle}>One click message optimisation</Text>
      </View>
    </Pressable>
    <Pressable onPress={onRightPress}>
      <Image source={ICONS.IconProfile} style={{height: 53, width: 53}} />
    </Pressable>
  </View>
);

export default Header;
