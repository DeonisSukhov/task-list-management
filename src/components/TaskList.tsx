import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setFilter, setSortBy } from '../store/tasksSlice';
import TaskItem from './TaskItem';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const FilterSort = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, filter, sortBy } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.priority === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'createdAt') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  return (
    <div>
      <FilterSort>
        <select value={filter} onChange={(e) => dispatch(setFilter(e.target.value))}>
          <option value="all">Все</option>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
        <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
          <option value="createdAt">По дате создания</option>
        </select>
      </FilterSort>
      <List>
        {sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            createdAt={task.createdAt}
          />
        ))}
      </List>
    </div>
  );
};

export default TaskList; 