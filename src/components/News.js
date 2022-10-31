import React, { Component} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps={
    country:'us',
    category:'general'
    
   }
   static propsTypes={
     country:PropTypes.string,
     category:PropTypes.string
   }
  
  
  constructor(){
    super();
   this.state = {
     article: [],
     loading: false,
     page:1
   }
  }
   async componentDidMount(){
    
      console.log(this.props.category,"category")
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=460985b1c35c4c958f9cf1d6c37f2133&page=1&pageSize=8`;
      this.setState({loading:true});
       let data =  await fetch(url);
       let parsedData = await data.json();
       console.log(parsedData.articles);
      this.setState({article : parsedData.articles,
       totalArticles:parsedData.totalResults,
       loading: false
     });
      
   
   
      }
     handleprev=async ()=>{
     
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=460985b1c35c4c958f9cf1d6c37f2133&page=${this.state.page-1}&pageSize=8`;
      this.setState({loading:true});
      let data =  await fetch(url);
      let parsedData = await data.json();
   
     this.setState({
       page:this.state.page-1,
       article:parsedData.articles,
       loading: false
     })
     }


     handleNext=async ()=>{
       if(this.state.page+1>Math.ceil(this.state.totalResults/20)){
       
       }
       else{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=460985b1c35c4c958f9cf1d6c37f2133&page=${this.state.page+1}&pageSize=8`;
      this.setState({loading:true});
      let data =  await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData.articles);
     this.setState({
       page:this.state.page+1,
       article:parsedData.articles,
       loading: false
     })
    }
     }
    


  
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'><i>NewsXpo</i>- Top {this.props.category} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row"> 
        {!this.state.loading && this.state.article.map((element)=>{
          return  <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title} description={element.description?element.description.slice(0,100):" "} imageUrl={element.urlToImage} newsurl={element.url}
             authors={element.author} date={element.publishedAt}/>
          </div>
      
        })}
        </div>
        <div className="container d-flex justify-content-between">
       <button disabled={this.state.page<=1} type="button" className="btn btn-dark"  onClick={this.handleprev}>&larr;Prev</button>
       <button disabled={this.state.page===5} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        
        </div>
      
       
      </div>
    )
  }
}

export default News
