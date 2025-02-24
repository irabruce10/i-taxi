import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '../../constants';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import OAuth from '../../components/OAuth';

export default function signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onSignUpPress = () => {
    // TODO: Implement signup logic and navigation.
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your Name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />

          <InputField
            label="Email"
            placeholder="Enter your Email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            placeholder="Enter your Password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="SignUp"
            onPress={onSignUpPress}
            className="mt-6"
          />

          {/* OAuth */}
          <OAuth />

          <Link
            href={'/signin'}
            className="text-lg  text-center text-general-200 mt-10 "
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Sign In</Text>
          </Link>

          {/* Verification */}
        </View>
      </View>
      {/* Add signup form components here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
