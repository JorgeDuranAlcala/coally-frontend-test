import { motion } from 'framer-motion';
import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

interface AnimatedContainerProps extends BoxProps {
  children: React.ReactNode;
}

export const AnimatedContainer = ({ children, ...props }: AnimatedContainerProps) => (
  <Box
    as={motion.div}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    {...props}
  >
    {children}
  </Box>
);