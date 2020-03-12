import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class AppUserItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
    };
  }

  componentDidMount() {
    this.setState((state, props) => ({
      avatar: props.user.avatar,
    }));
  }

  render() {
    const { user } = this.props;
    const name = user.first_name + ' ' + user.last_name;
    return (
      <div className="p-1" style={{ width: '25%', minWidth: '200px' }}>
        <Card
          style={{
            width: '100%',
          }}
        >
          <CardBody className="text-center">
            <CardImg
              src={this.state.avatar}
              alt={name}
              style={{
                width: '100%',
              }}
            />
            <CardTitle>{name}</CardTitle>
            <CardSubtitle>{user.email}</CardSubtitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}

AppUserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AppUserItem;
