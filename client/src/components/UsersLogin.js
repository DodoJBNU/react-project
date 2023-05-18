import React from 'react';
import axios from 'axios';

class UsersLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      psword: '',
      successMessage: '',
      errorMessage: '',
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.loginUser()
      .then((response) => {
        console.log(response.data);
        const user_id = this.state.user_id;
        const url = `/Main?user_id=${user_id}`;
        window.location.href = url;

        this.setState({
          user_id: '',
          psword: '',
          successMessage: '로그인 성공',
          errorMessage: '',
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          successMessage: '',
          errorMessage: '아이디 또는 비밀번호가 일치하지 않습니다.',
        });
      });
  };

  handleValueChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginUser = () => {
    const url = '/';
    const formData = new FormData();
    formData.append('user_id', this.state.user_id);
    formData.append('psword', this.state.psword);
    formData.append('action', 'login');

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    return axios.post(url, formData, config);
  };

  render() {
    const { user_id, psword, errorMessage, successMessage } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input type="text" name="user_id" maxLength="25" value={user_id} onChange={this.handleValueChange} placeholder="아이디" />
        <br />
        <input style={{ marginTop: '2vh' }} type="password" name="psword" maxLength="25" value={psword} onChange={this.handleValueChange} placeholder="비밀번호" />
        <br />
        <button type="submit" style={{ marginTop: '2vh' }}>
          로그인
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    );
  }
}

export default UsersLogin;
