import {Component} from 'react'

import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {location} = this.props
    const {pathname} = location

    const applyCss = pathname === '/' ? 'selects' : 'link'
    const applyCssN = pathname === '/shelf' ? 'selects' : 'link'

    return (
      <>
        <nav className="navbar">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dovk61e0h/image/upload/v1662988538/Bookhub/bookhub_logo_hjkrwl.png"
              alt="website logo"
              className="nav-logo"
            />
          </Link>
          <ul className="links">
            <li className="header-link">
              <Link className={applyCss} to="/">
                Home
              </Link>
            </li>
            <li className="header-link">
              <Link className={applyCssN} to="/shelf">
                Bookshelves
              </Link>
            </li>
            <li className="header-link">
              <button
                type="button"
                className="logout"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
          <div className="smallMenu">
            <Link className={applyCss} to="/">
              Home
            </Link>

            <Link className={applyCssN} to="/shelf">
              Bookshelves
            </Link>
            <button
              className="logout"
              type="button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
