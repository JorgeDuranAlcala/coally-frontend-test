import React from 'react';
import {
  VStack,
  Text,
  Checkbox,
  IconButton,
  HStack,
  Box,
  Badge,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
import { Task, useTaskContext } from '../context/TaskContext';
import { AnimatedContainer } from './animations/AnimatedContainer';
import { TaskItemAnimation } from './animations/TaskItemAnimation';
import { AnimatePresence } from 'framer-motion';
import { TaskApiRepository } from '../infrastructure/repositories/task-repository';
import { TaskService } from '../application/task.service';

export const TaskList: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const toast = useToast();
    const taskRepository = new TaskApiRepository();
    const taskService = new TaskService(taskRepository);

  const handleCheck = (task: Task) => async () => {
    try {
      dispatch({ type: 'TOGGLE_TASK', payload: task.id });
      await taskService.updateTask(task.id, { completed: !task.completed });
      if (task.completed) {
        toast({
          title: 'Task completed',
          description: 'Congratulations on completing a task!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }

  }

  const handleDelete = (task: Task) => async () => {
    try {
      await taskService.deleteTask(task.id);
      dispatch({ type: 'DELETE_TASK', payload: task.id });
      toast({
        title: 'Task deleted',
        description: 'The task has been deleted',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <AnimatedContainer>
      <VStack spacing={4} align="stretch">
        <AnimatePresence>
          {state.tasks.length === 0 ? (
            <TaskItemAnimation key="empty-state">
              <Text textAlign="center" color="gray.500">
                No tasks yet. Add some tasks to get started!
              </Text>
            </TaskItemAnimation>
          ) : (
            state.tasks.map((task) => (
              <TaskItemAnimation key={task.id}>
                <Box
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  bg={bgColor}
                  borderColor={borderColor}
                  shadow="sm"
                >
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1} flex={1}>
                      <HStack spacing={2}>
                        <Checkbox
                          isChecked={task.completed}
                          onChange={handleCheck(task)}
                        >
                          <Text
                            fontSize="lg"
                            textDecoration={task.completed ? 'line-through' : 'none'}
                            color={task.completed ? 'gray.500' : 'inherit'}
                          >
                            {task.title}
                          </Text>
                        </Checkbox>
                        <Badge
                          colorScheme={task.completed ? 'green' : 'yellow'}
                          variant="subtle"
                        >
                          {task.completed ? 'Completed' : 'Pending'}
                        </Badge>
                      </HStack>
                      {task.description && (
                        <Text color="gray.600" fontSize="sm" pl={6}>
                          {task.description}
                        </Text>
                      )}
                      <Text color="gray.500" fontSize="xs" pl={6}>
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </Text>
                    </VStack>
                    <IconButton
                      aria-label="Delete task"
                      icon={<Trash2 size={18} />}
                      colorScheme="red"
                      variant="ghost"
                      onClick={handleDelete(task)}
                    />
                  </HStack>
                </Box>
              </TaskItemAnimation>
            ))
          )}
        </AnimatePresence>
      </VStack>
    </AnimatedContainer>
  );
};