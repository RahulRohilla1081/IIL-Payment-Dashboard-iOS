import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  style,
  value,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems:"center",
        borderColor: '#ccc',
        borderWidth: 1,
        paddingVertical: 8,
        marginBottom: 25,
        borderRadius: 10,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          placeholderTextColor={'#000'}
          style={[{flex: 1, paddingVertical: 0}, style]}
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <TextInput
          placeholder={label}
          placeholderTextColor={'#000'}
          value={value}
          keyboardType={keyboardType}
          style={[{flex: 1, paddingVertical: 0}, style]}
          onChangeText={onChangeText}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#21a3f1', fontWeight: '700'}}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
