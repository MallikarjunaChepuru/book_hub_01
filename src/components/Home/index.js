import {Component} from 'react'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const topRatedApiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    topRatedBooks: [],
    topRatedApiStatus: topRatedApiStatuses.initial,
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({topRatedApiStatus: topRatedApiStatuses.inProgress})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const booksList = fetchedData.books
      const updatedData = booksList.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        topRatedBooks: updatedData,
        topRatedApiStatus: topRatedApiStatuses.success,
      })
    } else {
      this.setState({topRatedApiStatus: topRatedApiStatuses.failure})
    }
  }

  renderSliderSuccessView = () => {
    const {topRatedBooks} = this.state

    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => {
          const {id, coverPic, title, authorName} = eachBook

          return (
            <div className="top-rated-book-item-container" key={id}>
              <button type="button" className="top-rated-card-btn">
                <div className="top-rated-book-image-container">
                  <img
                    className="top-rated-book-image"
                    src={coverPic}
                    alt={title}
                  />
                  <h1 className="top-rated-book-name">{title}</h1>
                  <p className="top-rated-book-author">{authorName}</p>
                </div>
              </button>
            </div>
          )
        })}
      </Slider>
    )
  }

  onClickRetry = () => {
    this.getTopRatedBooks()
  }

  renderSliderFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        src="https://res.cloudinary.com/dnk97m4x9/image/upload/v1712940234/Group_7522_1_kc0ngr.png"
        alt="failure view"
        className="top-rated-books-failure-image"
      />
      <p className="top-rated-books-failure-heading">
        Something Went wrong. Please try again.
      </p>
      <button
        className="top-rated-books-failure-btn"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSlider = () => {
    const {topRatedApiStatus} = this.state

    switch (topRatedApiStatus) {
      case topRatedApiStatuses.success:
        return this.renderSliderSuccessView()
      case topRatedApiStatuses.failure:
        return this.renderSliderFailureView()
      case topRatedApiStatuses.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderBottom = () => (
    <div className="iconsdiv">
      <footer className="icons">
        <FaGoogle className="icon" />
        <FaTwitter className="icon" />
        <FaInstagram className="icon" />
        <FaYoutube className="icon" />
      </footer>
    </div>
  )

  render() {
    return (
      <>
        <Header />

        <div className="home-page-bg-container">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-paragraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            className="home-find-books-btn books-responsive-btn-sm"
            type="button"
          >
            Find Books
          </button>
          <div>
            <div className="home-top-rated-container">
              <div className="home-top-rated-heading-container">
                <h1 className="top-rated-heading">Top rated Books</h1>
                <button
                  className="home-find-books-btn books-responsive-btn-lg"
                  type="button"
                >
                  Find Books
                </button>
              </div>
              <div className="slick-container">{this.renderSlider()}</div>
            </div>
          </div>
          {this.renderBottom()}
        </div>
      </>
    )
  }
}

export default Home
