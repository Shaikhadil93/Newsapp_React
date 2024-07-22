import React, { Component } from "react";
import NewsItems from "./NewsItems";
import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultPropType = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("i am constructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b1bf887146054e38a7acff38b9c64ab2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let personData = await data.json();
    console.log(personData);
    this.setState({
      articles: personData.articles,
      totalResults: personData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handleNextClick = async ()=>{
  //   this.setState({
  //     page:this.state.page + 1
  //   })
  //   this.updateNews()
  // }
  // handlePevClick = async () =>{
  //   this.setState({
  //     pagr : this.state.page - 1
  //   })
  //   this.updateNews()
  // }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b1bf887146054e38a7acff38b9c64ab2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let personData = await data.json();
    console.log(personData);
    this.setState({
      articles: this.state.articles.concat(personData.articles),
      totalResults: personData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center my-3">
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={(this.state.articles.length !== this.state.totalResults)}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title : " "}
                      description={
                        element.description ? element.description : "  "
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
export default News;
