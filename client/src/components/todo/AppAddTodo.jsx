import React, { Fragment, useState, createRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

import { useTodo } from '../../context/TodoContext';

const AppAddTodo = () => {
  const { addTodo } = useTodo();

  const [item, setItem] = useState('');

  const textInput = createRef();

  const handleTextChange = e => {
    setItem(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();
    addTodo({
      text: item,
      id: uuidv4(),
      pos: 0,
      vel: 0,
    });
    textInput.current.focus();
    setItem('');
  };

  return (
    <Fragment>
      <Form className="d-flex" onSubmit={e => handleClick(e)}>
        <Input
          type="text"
          name="todoItem"
          id="todoItem"
          placeholder="Todo item..."
          onChange={handleTextChange}
          value={item}
          ref={textInput}
        />
        <Button
          type="submit"
          color="success"
          className="flex-shrink-0 ml-1"
          disabled={item.trim().length === 0}
        >
          Add Todo
        </Button>
      </Form>
    </Fragment>
  );
};

export default AppAddTodo;
