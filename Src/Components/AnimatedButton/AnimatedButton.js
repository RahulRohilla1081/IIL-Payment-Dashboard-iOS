import React, {FunctionComponent, useEffect, useRef} from 'react';
import {View, StyleSheet, Pressable, Text, Animated, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedIconButton = ({onPress, iconStyle, icon, label, labelStyle,containerStyle, startColor,endColor,container}) => {
  const animatedScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  const handleOnPress = () => {
    animatedScale.setValue(0.8);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 24,
      speed: 20,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      onPress();
    }, 100);
  };

  return (
    <View style={{
        // flex:1,
        justifyContent:"center",
        alignItems:"center",
        ...container

    }}>
      <Pressable
        onPress={() => {
          handleOnPress();
        }}>
        <Animated.View style={[{transform: [{scale: animatedScale}]}]}>
          {!label && (
            <Image
              source={icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                // tintColor: tintColor,
                ...iconStyle,
              }}
            />
          )}
          {label && (
            <View
              style={{
                // ...containerStyle,
                // justifyContent: 'center',
                // alignItems: 'center',
                display:"flex",
                flexDirection:"row",
                justifyContent:"flex-end"
               
              }}>
                <LinearGradient
          colors={[startColor, endColor]}
          start={{x: 0.0, y: 0}}
          end={{x: 0, y: 1}}
        //   locations={[0, 0.4, 1.3]}
          style={{borderRadius: 10,}}
          >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 13,
              color: '#fff',
              padding:5,
              ...labelStyle
            }}>
            {label}
          </Text>
        </LinearGradient>
              {/* <Text
                style={{color: "#fff", fontWeight: 'bold', fontSize: 17, ...labelStyle}}>
                {label}
              </Text> */}
            </View>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'purple',
    width: 200,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
  },
});

export default AnimatedIconButton;