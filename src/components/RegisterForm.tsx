import { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, useToast, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthApiRepository } from '../infrastructure/repositories/auth-repository';
import { AnimatedContainer } from './animations/AnimatedContainer';
import { AuthService } from '../application/auth.service';

const authRepository = new AuthApiRepository();
const authService = new AuthService(authRepository);

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if(value.length <= 0 ) {
            setIsPasswordValid(true);
            return;
        };
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        setIsPasswordValid(passwordRegex.test(value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isPasswordValid) {
            toast({
                title: 'Error',
                description: 'Password does not meet the requirements',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        try {
            await authService.register({ name, email, password });
            toast({
                title: 'Success',
                description: 'Registered successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            navigate('/');
        } catch (error) {
            console.error('Error registering:', error);
            toast({
                title: 'Error',
                description: 'Registration failed',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatedContainer>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </FormControl>
                    <FormControl isRequired isInvalid={!isPasswordValid}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                        />
                        <Text fontSize="sm" color="gray.500" mt={2}>
                            The string must contain at least 1 lowercase alphabetical character,
                            1 uppercase alphabetical character, 1 numeric character, 1 special character,
                            and be eight characters or longer.
                        </Text>
                        {!isPasswordValid && (
                            <Text fontSize="sm" color="red.500" mt={2}>
                                Password does not meet the requirements.
                            </Text>
                        )}
                    </FormControl>
                    <Button type="submit" colorScheme="blue" isDisabled={isLoading}>
                        {isLoading ? <Spinner size="sm" /> : 'Register'}
                    </Button>
                </VStack>
            </form>
        </AnimatedContainer>
    );
};
