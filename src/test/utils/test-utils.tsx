import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { TaskProvider } from '../../context/TaskContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      <TaskProvider>{children}</TaskProvider>
    </ChakraProvider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };