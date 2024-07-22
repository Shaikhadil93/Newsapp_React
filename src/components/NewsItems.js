import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div className="d-flex justify-content-end position-absolute right-0">
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://images.livemint.com/img/2024/07/20/1600x900/Q1_results_2024_TCS_share_Infosys_share_Wipro_shar_1721446311581_1721446311837.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark "
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
