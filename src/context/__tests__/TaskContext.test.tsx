import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../test/utils/test-utils';
import { TaskProvider, useTaskContext } from '../TaskContext';
import { renderHook, act } from '@testing-library/react';

const TestComponent = () => {
  const { state, dispatch } = useTaskContext();
  
  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: 'ADD_TASK',
            payload: {
              id: '1',
              title: 'Test Task',
              description: 'Test Description',
              completed: false,
              createdAt: new Date(),
            },
          })
        }
      >
        Add Task
      </button>
      <div data-testid="task-count">{state.tasks.length}</div>
    </div>
  );
};

describe('TaskContext', () => {
  it('provides initial empty state', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('task-count')).toHaveTextContent('0');
  });

  it('adds task correctly', async () => {
    render(<TestComponent />);
    
    const addButton = screen.getByRole('button', { name: /add task/i });
    await fireEvent.click(addButton);
    
    expect(screen.getByTestId('task-count')).toHaveTextContent('1');
  });

  it('throws error when used outside provider', () => {
    expect(() => renderHook(() => useTaskContext())).toThrow();
  });
});