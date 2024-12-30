import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';


import { CheckCircle } from 'lucide-react';
import { LoginForm } from '../components/LoginForm';

export function Login( ) {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    
    return (
        <Box minH="100vh" bg={bgColor} py={10}>
        <Container maxW="container.md">
          <VStack spacing={8}>
            <VStack spacing={2} textAlign="center">
              <CheckCircle size={40} color="#4299E1" />
              <Heading size="xl">Login</Heading>
            </VStack>
            <Box w="100%" bg="white" p={6} borderRadius="lg" shadow="md">
              <LoginForm />
            </Box>
          </VStack>
        </Container>
      </Box>
    )
}