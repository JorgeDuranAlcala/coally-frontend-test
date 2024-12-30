import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './routes/PrivateRoute';
import { PublicRoute } from './routes/PublicRoute';
import { TaskProvider } from './context/TaskContext';
import { Main } from './pages/main';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const App = () => {
  return (
    <ChakraProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={
               <Main />
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </ChakraProvider>
  );
};
