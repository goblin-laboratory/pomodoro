import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

export default function Button(props) {
  const {onPress, title = 'Save', style, text} = props;
  return (
    <Pressable style={{...styles.button, ...style}} onPress={onPress}>
      <Text style={{...styles.text, ...text}}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
