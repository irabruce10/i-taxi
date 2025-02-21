import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { useRef, useState } from 'react';

export default function onBoarding() {
  // TODO: Implement Swiper component for onboarding slides and navigation buttons.
  const swiperRef = useRef<Swiper>(initialValue:null);
  const [activeIndex,setActiveIndex]=  useState(0)
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace('/(auth)/signin');
        }}
        className="w-full flex justify-end items-end p-5 "
      >
        <Text className=" text-black text-md font-JakartaBold ">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0]" />}
        activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#3182CE] rounded-full" />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >

        [{}]
      </Swiper>
    </SafeAreaView>
  );
}
