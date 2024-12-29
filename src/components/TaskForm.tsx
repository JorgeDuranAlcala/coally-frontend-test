import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useTaskContext } from '../context/TaskContext';
import { AnimatedContainer } from './animations/AnimatedContainer';

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { dispatch } = useTaskContext();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({
        title: 'Error',
        description: 'Title is required',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    setTitle('');
    setDescription('');

    toast({
      title: 'Success',
      description: 'Task created successfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <AnimatedContainer>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              as={motion.input}
              whileFocus={{ scale: 1.01 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              as={motion.textarea}
              whileFocus={{ scale: 1.01 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </FormControl>
          <Button
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            colorScheme="blue"
          >
            Add Task
          </Button>
        </VStack>
      </form>
    </AnimatedContainer>
  );
};