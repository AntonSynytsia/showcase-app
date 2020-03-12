import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import AppTodoItem from './AppTodoItem';
import { useTodo } from '../../context/TodoContext';

const AppTodos = () => {
  const { todos } = useTodo();

  const items = todos.map(item => {
    return <AppTodoItem key={item.id} item={item} />;
  });

  return <div className="mt-3">{items}</div>;
};

export default AppTodos;
