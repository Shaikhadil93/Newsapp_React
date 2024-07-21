import React, { Component } from 'react'
import NewsItems from './NewsItems';
import {Spinner}  from './Spinner';
import PropTypes from 'prop-types'



export class News extends Component {
  static defaultPropType = {
    country :"in",
    pageSize : 8,
    category: 'general'
  }

  static propTypes={
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
 
  constructor(){
    super()
    console.log("i am constructor")
    this.state = {
      articles : [],
      loading : false,
      page:1
    }
}

   async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&country=${this.props.category}&apiKey=b1bf887146054e38a7acff38b9c64ab2&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url);
    let personData = await data.json();
    console.log(personData);
    this.setState({articles : personData.articles, 
                    totalResults: personData.totalResults,
                    loading:false
                  })

  }

  handleNextClick = async ()=>{
    if(!(this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&country=${this.props.category}&apiKey=b1bf887146054e38a7acff38b9c64ab2&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url);
    let personData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles : personData.articles,
      loading :false
    });
  }
  }
  handlePevClick = async () =>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&country=${this.props.category}&apiKey=b1bf887146054e38a7acff38b9c64ab2&page={this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let personData = await data.json();
    console.log(personData);
    this.setState({
      page: this.state.page - 1,
      articles : personData.articles,
      loading:false
    })
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center my-3'>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row" >
        {!this.state.loading && this.state.articles.map((element)=>{
                     return <div className="col-md-4" key= {element.url}>
                      <NewsItems title={element.title?element.title :" "} description = {element.description?element.description:"  "} imageUrl={element.urlToImage} newsUrl={element.url} />
                  </div>
        })}
        </div>
        <div className="container d-flex justify-content-between my-2">
          <button disabled={this.state.page<=1} type='button' className="btn btn-dark" onClick={this.handlePevClick}>&larr; Previous</button>
          <button disabled={(this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize))} type='button' className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
