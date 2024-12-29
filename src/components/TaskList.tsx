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
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { AnimatedContainer } from './animations/AnimatedContainer';
import { TaskItemAnimation } from './animations/TaskItemAnimation';
import { AnimatePresence } from 'framer-motion';

export const TaskList: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

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
                          onChange={() =>
                            dispatch({ type: 'TOGGLE_TASK', payload: task.id })
                          }
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
                      onClick={() =>
                        dispatch({ type: 'DELETE_TASK', payload: task.id })
                      }
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