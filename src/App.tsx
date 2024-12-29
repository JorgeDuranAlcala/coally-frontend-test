import React from 'react';
import {
  ChakraProvider,
  Container,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { TaskProvider } from './context/TaskContext';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { CheckCircle } from 'lucide-react';

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <ChakraProvider>
      <TaskProvider>
        <Box minH="100vh" bg={bgColor} py={10}>
          <Container maxW="container.md">
            <VStack spacing={8}>
              <VStack spacing={2} textAlign="center">
                <CheckCircle size={40} color="#4299E1" />
                <Heading size="xl">Task Manager</Heading>
                <Text color="gray.600">
                  Organize your tasks efficiently and stay productive
                </Text>
              </VStack>
              <Box w="100%" bg="white" p={6} borderRadius="lg" shadow="md">
                <TaskForm />
              </Box>
              <Box w="100%">
                <TaskList />
              </Box>
            </VStack>
          </Container>
        </Box>
      </TaskProvider>
    </ChakraProvider>
  );
}

export default App;