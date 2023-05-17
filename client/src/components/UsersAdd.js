import React from 'react';
import axios from 'axios';

class UsersAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      psword: '',
      errorMessage: '',
      successMessage: '', // 완료 메시지 상태 추가
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addUsers({ action: 'signup' }) // action 값을 signup으로 설정
      .then((response) => {
        console.log(response.data);
        this.setState({
          user_id: '',
          psword: '',
          errorMessage: '',
          successMessage: '회원가입이 완료되었습니다.', // 완료 메시지 설정
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          errorMessage: '이미 존재하는 ID입니다.',
          successMessage: '', // 완료 메시지 초기화
        });
      });
  };

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  addUsers = (data) => {
    const url = '/';
    const formData = new FormData();
    formData.append('user_id', this.state.user_id);
    formData.append('psword', this.state.psword);
    formData.append('action', data.action); // action 값을 요청에 추가
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
        <input
          type="text"
          name="user_id"
          maxLength="25"
          value={user_id}
          onChange={this.handleValueChange}
          placeholder="아이디"
        />
        <br />
        <input
          style={{ marginTop: '2vh' }}
          type="password"
          name="psword"
          maxLength="25"
          value={psword}
          onChange={this.handleValueChange}
          placeholder="비밀번호"
        />
        <br />
        <button type="submit" style={{ marginTop: '2vh' }}>
          회원가입
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    );
  }
}

export default UsersAdd;
