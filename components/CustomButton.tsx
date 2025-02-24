import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ButtonProps } from '../types/type';

export default function CustomButton({
  onPress,
  title,
  bgVariant = 'primary',
  textVariant = 'default',
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) {
  const getBgVariants = (variant: ButtonProps['bgVariant']) => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 ';
      case 'secondary':
        return 'bg-gray-400 ';
      case 'danger':
        return 'bg-red-500 ';
      case 'success':
        return 'bg-green-500 ';
      case 'outline':
        return 'text-transparent border-neutral border-[0.5px]';
      default:
        return 'bg-[#0286ff] ';
    }
  };

  const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
    switch (variant) {
      case 'primary':
        return 'text-black ';
      case 'secondary':
        return 'text-gray-100 ';
      case 'danger':
        return 'text-red-100 ';
      case 'success':
        return 'text-green-100 ';
      default:
        return 'text-white ';
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      className={` w-full rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariants(
        bgVariant,
      )} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
}
