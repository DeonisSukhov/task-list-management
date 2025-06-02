import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    const interval = setInterval(() => {
      const newTask = {
        id: Date.now().toString(),
        title: `Автоматическая задача ${Date.now()}`,
        description: 'Сгенерировано автоматически',
        priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
        createdAt: new Date().toISOString(),
      };
      dispatch(addTask(newTask));
    }, Math.random() * 10000 + 10000); // 10-20 секунд

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      createdAt: new Date().toISOString(),
    };
    dispatch(addTask(newTask));
    setTitle('');
    setDescription('');
    setPriority('low');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Описание задачи"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </Select>
      <Button type="submit">Добавить задачу</Button>
    </Form>
  );
};

export default TaskForm; 