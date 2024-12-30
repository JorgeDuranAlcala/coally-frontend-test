import React, { useEffect } from 'react';
import {
    Container,
    VStack,
    Heading,
    Text,
    Box,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

import { CheckCircle } from 'lucide-react';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { useTaskContext } from '../context/TaskContext';
import { TaskApiRepository } from '../infrastructure/repositories/task-repository';
import { TaskService } from '../application/task.service';
import { useNavigate } from 'react-router-dom';

export function Main() {
    const { dispatch } = useTaskContext();
    const taskRepository = new TaskApiRepository();
    const taskService = new TaskService(taskRepository);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await taskService.getTasks();
            dispatch({ type: 'SET_TASKS', payload: tasks });
        };
        fetchTasks();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const bgColor = useColorModeValue('gray.50', 'gray.900');
    return (
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
                    <Button colorScheme="blue" onClick={handleLogout}>
                        Logout
                    </Button>
                    <Box w="100%" bg="white" p={6} borderRadius="lg" shadow="md">
                        <TaskForm />
                    </Box>
                    <Box w="100%">
                        <TaskList />
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
}