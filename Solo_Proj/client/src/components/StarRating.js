import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";


export default class StarRating extends Component {
  static defaultProps = {
    minRating: 0,
    maxRating: 10,
    rating: 5,
    starRatio: 2,
    limit: 1000
  }

  maxStars() {
    let { maxRating, starRatio } = this.props
    return Math.ceil(maxRating / starRatio)
  }

  fullStars() {
    let { rating, starRatio } = this.props
    return Math.floor(rating / starRatio)
  }

  halfStars() {
    let { rating, starRatio } = this.props
    let x = rating % starRatio
    let i = (1 / 2) * starRatio
    return x >= i ? 1 : 0
  }

  emptyStars() {
    return this.maxStars() - this.fullStars() - this.halfStars()
  }


  render() {
    let fullStars = this.fullStars()
  
    let renderFullStars = () => {
      return fullStars !== 0
        ? Array(fullStars)
          .fill(null)
          .map((item, i) => {
            return <FontAwesomeIcon className="star" key={`fs${i}`} icon="star" />
          })
        : ''
    }
  
    return (
      <div className="star-rating">
        {renderFullStars()}
      </div>
    )
  }
}