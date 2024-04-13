import {useState, useEffect, useCallback} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const BookShelf = () => {
  const [book, updateBook] = useState(bookshelvesList[0].id)
  const [bookItems, updateBookItems] = useState([])
  const [userInput, updateUserInput] = useState('')
  const [status, updateStatus] = useState(apiStatus.initial)
  const [stack, updateStack] = useState('All Books')
  const [bookTitle, updateBookTitle] = useState(bookshelvesList[0].value)

  const getBooks = useCallback(async () => {
    updateStatus(apiStatus.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookTitle}&search=${userInput}`
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }, [bookTitle, userInput])

  useEffect(() => {
    getBooks()
  }, [])

  const onChangeSearch = event => {
    updateUserInput(event.target.value)
  }

  const updateActive = details => {
    const {id, value, label} = details
    updateBook(id)
    const statusItem = `${label} Books`
    updateStack(statusItem)
    updateBookTitle(value)
  }

  const renderMenu = () => (
    <>
      <div className="menu-items">
        <h1 className="menu-head">Bookshelves</h1>
        <ul className="ul-list">
          {bookshelvesList.map(each => {
            const {id, label, value} = each
            const details = {id, label, value}

            return (
              <li key={id}>
                <button
                  className="list-item"
                  key={id}
                  type="button"
                  onClick={() => {
                    updateActive(details)
                  }}
                >
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="search-icon-small-div">
        <input
          type="search"
          placeholder="Search"
          className="search-input-small"
          onChange={onChangeSearch}
        />
        <button type="button" className="search-small-btn">
          <BsSearch className="search-icon" />
        </button>
      </div>
      <div className="menu-items-small">
        <p className="menu-head-small">Bookshelves</p>
        <ul className="ul-list-small">
          {bookshelvesList.map(each => {
            const {id, label, value} = each

            const details = {id, label, value}

            return (
              <li
                key={id}
                className="list-item-small"
                onClick={() => updateActive(details)}
              >
                {label}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )

  return (
    <div className="shelf-bg">
      <Header />
      <div className="books-div">
        {apiStatus.success && renderMenu()}
        <div className="lower-div">
          <div className="search-top">
            <h1 className="books-category-text">{stack}</h1>
            <div className="search-icon-div">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={onChangeSearch}
              />
              <button type="button" className="search-small-btn">
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BookShelf
