import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';
import { icons } from '../constants';

export default function OAuth() {
  const handleGoogleSignIn = async () => {
    // TODO: Implement Google Sign-In logic and navigation.
  };
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title="Sign In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
