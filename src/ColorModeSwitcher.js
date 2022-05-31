import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode, colorMode } = useColorMode();
  const textColor = useColorModeValue('black', '#E9ECEF');
  const bgColor = useColorModeValue('#B7E4C7', '#000000');
  const cardResultBg = useColorModeValue('#74C69D', '#2D6A4F')
  //card shadow value #00FFAB
  const cardResultShadow = useColorModeValue('#40916C', 'white')

  return { textColor, bgColor, cardResultBg, cardResultShadow, toggleColorMode, colorMode }

  // return (
  //   <IconButton
  //     size="md"
  //     fontSize="lg"
  //     aria-label={`Switch to ${text} mode`}
  //     variant="ghost"
  //     color="current"
  //     marginLeft="2"
  //     onClick={toggleColorMode}
  //     icon={<SwitchIcon />}
  //     {...props}
  //   />
  // );
};
