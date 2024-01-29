import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress, color,style}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        marginTop: 20,
        justifyContent:"center",
        flexDirection:"row",
        ...style,

      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',

        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
