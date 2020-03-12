import React, { Fragment } from 'react';
import axios from 'axios';

import AppUserItem from './AppUserItem';
import AppSpinner from '../AppSpinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { Button } from 'reactstrap';

class AppUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      users: [],
      loading: false,
    };
  }

  fetchUsers = async page => {
    this.setState({ loading: true });
    // fetch users
    axios
      .get('https://reqres.in/api/users', {
        params: {
          page: page,
        },
      })
      .then(res => {
        this.setState({ loading: false, users: res.data.data, page: page });
      })
      .catch(err => {
        this.setState({ loading: false, users: [] });
        console.error(err);
      });
  };

  handlePreviousClick = e => {
    e.preventDefault();
    e.stopPropagation();

    const newPage = this.state.page <= 1 ? 1 : this.state.page - 1;
    this.fetchUsers(newPage);
  };

  handleNextClick = e => {
    e.preventDefault();
    e.stopPropagation();

    const newPage = this.state.page >= 2 ? 2 : this.state.page + 1;
    this.fetchUsers(newPage);
  };

  componentDidMount() {
    this.fetchUsers(this.state.page);
  }

  render() {
    return (
      <Fragment>
        <div className="d-flex flex-wrap justify-content-center">
          {this.state.users.map(user => {
            return <AppUserItem key={'user' + user.id} user={user} />;
          })}
        </div>
        <div className="float-right mt-2">
          {this.state.loading && (
            <Fragment>
              <AppSpinner />{' '}
            </Fragment>
          )}
          <Button
            color="secondary"
            disabled={this.state.page <= 1 || this.state.loading ? true : false}
            onClick={this.handlePreviousClick}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>{' '}
          <Button
            color="secondary"
            disabled={this.state.page >= 2 || this.state.loading ? true : false}
            onClick={this.handleNextClick}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </Fragment>
    );
  }
}

AppUsers.propTypes = {};

export default AppUsers;
