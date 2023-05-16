import React from 'react';
import axios from 'axios';

class UsersAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      user_id: '',
      psword: '',
    };
  }
  hanleFormSubmit = (e) => {
    e.preventDefault();
    this.addUsers().then((response) => {
      console.log(response.data);
    });
  };
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  addUsers = () => {
    const url = '/';
    const formData = new FormData();
    formData.append('id', this.state.id);
    formData.append('user_id', this.state.user_id);
    formData.append('psword', this.state.psword);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(url, formData, config);
  };

  render() {
    return (
      <form onSubmit={this.hanleFormSubmit}>
        <h1>고객 추가</h1>
        id :{' '}
        <input
          type="number"
          name="id"
          value={this.state.id}
          onChange={this.handleValueChange}
        />
        <br />
        user_id :{' '}
        <input
          type="text"
          name="user_id"
          value={this.state.user_id}
          onChange={this.handleValueChange}
        />
        <br />
        psword :{' '}
        <input
          type="text"
          name="psword"
          value={this.state.psword}
          onChange={this.handleValueChange}
        />
        <br />
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

export default UsersAdd;
