import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask } from '../store/tasksSlice';
import styled from 'styled-components';

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const EditButton = styled(Button)`
  background-color: #28a745;
  &:hover {
    background-color: #218838;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, priority, createdAt }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedPriority, setEditedPriority] = useState(priority);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editTask({
      id,
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      createdAt,
    }));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Form onSubmit={handleSave}>
        <Input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          required
        />
        <Select value={editedPriority} onChange={(e) => setEditedPriority(e.target.value as 'low' | 'medium' | 'high')}>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </Select>
        <Button type="submit">Сохранить</Button>
        <Button type="button" onClick={() => setIsEditing(false)}>Отмена</Button>
      </Form>
    );
  }

  return (
    <Item>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Приоритет: {priority}</p>
      </div>
      <div>
        <EditButton onClick={handleEdit}>Редактировать</EditButton>
        <Button onClick={() => dispatch(deleteTask(id))}>Удалить</Button>
      </div>
    </Item>
  );
};

export default TaskItem; 