import { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, useToast, Text, Link } from '@chakra-ui/react';
import { AuthApiRepository } from '../infrastructure/repositories/auth-repository';
import { AnimatedContainer } from './animations/AnimatedContainer';
import { AuthService } from '../application/auth.service';
import { useNavigate } from 'react-router-dom';

const authRepository = new AuthApiRepository();
const authService = new AuthService(authRepository);

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await authService.login({ email, password });
            toast({
                title: 'Success',
                description: 'Logged in successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
            setLoading(false);
            toast({
                title: 'Error',
                description: 'Invalid credentials',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <AnimatedContainer>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" isLoading={loading}>
                        Login
                    </Button>
                    <Text>
                        Don't have an account yet?{' '}
                        <Link color="teal.500" href="/register">
                            Register here
                        </Link>
                    </Text>
                </VStack>
            </form>
        </AnimatedContainer>
    );
};
