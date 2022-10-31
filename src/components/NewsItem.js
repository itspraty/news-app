
import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title ,description,imageUrl,newsurl,authors,date}=this.props
    return (
      <div className='my-3'>
      <div  className="card" >
  <img src={!imageUrl?'https://s.yimg.com/os/creatr-uploaded-images/2022-06/6b162020-e65a-11ec-9bfa-2addc59f1582':imageUrl}
    className="card-img-top" alt="..."/>
  <div  className="card-body">
    <h5  className="card-title">{title}</h5>
    <p  className="card-text">{description}...</p>
    <p className="card-text"><small className="text-danger">By {!authors?"Unknown":authors} on {date}</small></p>
    <a href={newsurl} target="blank"  className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
