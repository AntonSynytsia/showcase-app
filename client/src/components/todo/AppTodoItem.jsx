import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Card, CardText, CardBody } from 'reactstrap';

import { useTodo } from '../../context/TodoContext';

const AppTodoItem = ({ item }) => {
  const { deleteTodo } = useTodo();

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    deleteTodo(item.id);
  };
  return (
    <Card className="mb-1" onClick={handleClick}>
      <CardBody className="d-flex">
        <CardText className="w-100 mb-0">{item.text}</CardText>
        <FontAwesomeIcon icon={faTrash} className="deleteIcon" />
      </CardBody>
    </Card>
  );
};

AppTodoItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default AppTodoItem;
