import React, { useState, useContext } from 'react';

const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const addTodo = item => {
    setTodos(items => [item, ...items]);
  };

  const deleteTodo = id => {
    setTodos(items => items.filter(item => item.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider.');
  }
  return context;
}

export { TodoProvider, useTodo };
