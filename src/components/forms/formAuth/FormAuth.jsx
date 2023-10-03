import React, { Component } from 'react'
import styles from './formAuth.module.css'
import axios from 'axios'
import iconG from './../../../img/imgAuth/icon_google.svg'
import iconF from './../../../img/imgAuth/icon_facebook.svg'
import iconJ from './../../../img/imgAuth/icon_jandex.svg'
import { Navigate } from "react-router-dom"

class FormAuth extends Component {
  constructor(...props) {
    super(props);
  }

  state = {
    login: '',
    password: '',
    errorLogin: 'Введите корректные данные',
    errorPassword: 'Неправильный пароль',
    errorStatus: false
  };

  handleInputLoginChange = ({ target: { value } }) => {
    this.setState({
      login: value
    })
  }

  handleInputPasswordChange = ({ target: { value } }) => {
    this.setState({
      password: value
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
  }

  handleShow = (e) => {
    e.preventDefault();
    axios.post('https://gateway.scan-interfax.ru/api/v1/account/login', this.state)
      .then((response) => {
        if (response.data.accessToken !== "") {
          localStorage.setItem('token', response.data.accessToken);
          this.props.mSetIsAutor(true);
          console.log(response.status, response.data.accessToken, response.data.expire);
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ errorStatus: true });

      });
  }

  render() {
    if (localStorage.getItem("token")) {
      return <Navigate to="/" />;
    }

    const { login, password } = this.state;
    return (
      <form onSubmit={this.onFormSubmit} className={styles.form__auth}>
        <div className={styles.auth__buttons}>
          <button type="submit" className={styles.button__entrance}>Войти</button>
          <button className={styles.button__registration}>Зарегистрироваться</button>
        </div>
        <label htmlFor="login" className={styles.label__auth}>Логин или номер телефона:
          <input type="text"
            name="login"
            value={login}
            className={
              this.state.errorStatus && this.state.errorLogin ? styles.input__auth + ' ' + styles.input__auth__err :
                styles.input__auth
            }
            onChange={this.handleInputLoginChange}
          />
        </label>
        <p className={styles.text__error}>{this.state.errorStatus && this.state.errorLogin}</p>

        <label htmlFor="password" className={styles.label__auth}>Пароль:
          <input type="password"
            name="password"
            value={password}
            onChange={this.handleInputPasswordChange}
            className={
              this.state.errorStatus && this.state.errorPassword ? styles.input__auth + ' ' + styles.input__auth__err :
                styles.input__auth
            } />
        </label>
        <p className={styles.text__error}>{this.state.errorStatus && this.state.errorPassword}</p>

        <button type="submit"
          className={
            (this.state.password === "" || this.state.login === "")
              ? styles.button__auth + ' ' + styles.disabledButton : styles.button__auth + ' ' + styles.enabledButton
          } onClick={this.handleShow}
          disabled={this.state.password === "" || this.state.login === ""}
        >
          Войти</button>
        <button className={styles.button__password} type='reset'>Восстановить пароль</button>
        <img src={iconG} alt="Google" className={styles.imgIcon} /><img src={iconF} alt="Facebook" className={styles.imgIcon} /><img src={iconJ} alt="Jandex" className={styles.imgIcon} />
      </form>
    )
  }
}

export default FormAuth;