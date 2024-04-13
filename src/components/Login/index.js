import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserName = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="name" className="input-label">
          Username*
        </label>
        <input
          type="text"
          id="name"
          placeholder="USERNAME"
          className="input-field"
          onChange={this.onChangeUserName}
          value={username}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    // console.log(password)

    return (
      <>
        <label htmlFor="password" className="input-label">
          Password*
        </label>
        <input
          type="password"
          id="password"
          placeholder="PASSWORD"
          className="input-field"
          onChange={this.onChangePassword}
          value={password}
        />
      </>
    )
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dovk61e0h/image/upload/v1662988538/Bookhub/bookhub_logo_hjkrwl.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />

        <img
          src="https://res.cloudinary.com/dnk97m4x9/image/upload/v1712805025/e7efb0d3d71dcb5062f1e077527d7f5d_qpis12.jpg"
          alt="website login"
          className="login-img"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/dovk61e0h/image/upload/v1662988538/Bookhub/bookhub_logo_hjkrwl.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUserName()}</div>
          <div className="input-container">{this.renderPassword()}</div>
          {showErrorMsg && <p className="error-message">{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
