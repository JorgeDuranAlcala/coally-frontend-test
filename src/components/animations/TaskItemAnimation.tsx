import { motion } from 'framer-motion';
import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

interface TaskItemAnimationProps extends BoxProps {
  children: React.ReactNode;
}

export const TaskItemAnimation = ({ children, ...props }: TaskItemAnimationProps) => (
  <Box
    as={motion.div}
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.2 }}
    whileHover={{ scale: 1.02 }}
    {...props}
  >
    {children}
  </Box>
);