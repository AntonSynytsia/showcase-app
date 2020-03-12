import React, { useState, useEffect } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import axios from 'axios';

const AppMembers = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('api/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {});
  }, []);

  return (
    <div>
      {users.map(user => {
        return (
          <Card key={'u' + user.id} className="mb-1">
            <CardBody>
              <CardTitle>{user.name}</CardTitle>
              <CardSubtitle>{user.email}</CardSubtitle>
              <CardText>{user.address}</CardText>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

AppMembers.propTypes = {};

export default AppMembers;
