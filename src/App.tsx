import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <h1>Список задач</h1>
        <TaskForm />
        <TaskList />
      </AppContainer>
    </Provider>
  );
};

export default App; 