import {
  Alert,
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
import { Link, router } from 'expo-router';
import OAuth from '../../components/OAuth';
import { useSignUp } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';

export default function signup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [successmodalVisible, setSuccessModalVisible] = useState(false);
  const [form, setForm] = useState({
    name: 'bruce',
    email: 'irabruce20@gmail.com',
    password: '79335848',
  });

  const [verification, setVerification] = useState({
    state: 'default',
    code: '',
    error: '',
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({ ...verification, state: 'pending' });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        // TODO CREATE DB
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: 'success' });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: 'verification failed',
          state: 'failed',
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed',
      });
    }
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
            secureTextEntry={true}
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

          <ReactNativeModal
            isVisible={verification.state === 'pending'}
            onModalHide={() => {
              if (verification.state === 'success')
                setSuccessModalVisible(true);
            }}
          >
            <View className=" bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Text className="text-2xl font-JakartaExtraBold mb-2">
                Verification
              </Text>
              <Text className=" font-Jakarta mb-5">
                Please check your email for a verification code
              </Text>

              <InputField
                label="Code"
                icon={icons.lock}
                keyboardType="numeric"
                placeholder="12234"
                value={verification.code}
                onChangeText={(code) =>
                  setVerification({ ...verification, code })
                }
              />

              {verification.error && (
                <Text className="text-red-500 text-sm mt-1">
                  {verification.error}
                </Text>
              )}
              <CustomButton
                title="Verify Email"
                onPress={onVerifyPress}
                className="mt-5 bg-success-500"
              />
            </View>
          </ReactNativeModal>

          <ReactNativeModal isVisible={successmodalVisible}>
            <View className=" bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Image
                source={images.check}
                className=" w-[110px] h-[110px] mx-auto my-5"
              />
              <Text className="text-3xl text-center  font-JakartaSemiBold">
                verified
              </Text>
              <Text className=" text-base text-gray-400 font-Jakarta text-center">
                You have successfully verified your account
              </Text>

              <CustomButton
                title="Browse Home"
                onPress={() => {
                  setSuccessModalVisible(false);
                  router.replace('/(root)/(tabs)/home');
                }}
                className="mt-5"
              />
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
