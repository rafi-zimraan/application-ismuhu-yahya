import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchInput} from '../../Component';

export default function LibDemo() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <SearchInput placeholder="hii" placeholderTextColor={'red'} />
    </View>
  );
}

const styles = StyleSheet.create({});
