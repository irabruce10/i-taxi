import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '@/constants';
const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`flex flex-row mt-10 justify-center items-center rounded-full ${
      focused ? 'bg-general-300' : ''
    }`}
  >
    <View
      className={` w-12 h-12 rounded-full  justify-center items-center ${
        focused ? 'bg-general-400' : ''
      } `}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-7 h-7"
      />
    </View>
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: '#333333',
          paddingBottom: 0,
          borderRadius: 50,
          overflow: 'hidden',
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.home} />
          ),
        }}
      />

      <Tabs.Screen
        name="rides"
        options={{
          title: 'Rides',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.list} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
