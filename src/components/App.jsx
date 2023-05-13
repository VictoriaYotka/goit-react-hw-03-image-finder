import { Component } from "react";
import searchImages from "services";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Loader from './Loader'
import Button from "./Button";
import Modal from "./Modal";



export class App extends Component  {
state = {
  query: '',
  page: 1,
  images: []
}

// id
// webformatURL 
// largeImageURL

componentDidUpdate (prevProps, prevState) {
  const { query } = this.state;

  if (prevState.query !== query) {
    searchImages(query, 1)
    .then(({hits}) => {
      console.log(hits)
      const images = hits.map(({id, webformatURL, largeImageURL}) => {return {id, webformatURL, largeImageURL}})
      
      this.setState({images})
      
  })
    .catch(error => console.log(error))
  }
}

// pageIncrement () {
//   this.setState(prevState => {page: prevState.page += 1});
//   console.log(this.state)
// }
  
  handleSubmit = (e) => {
    const query = e.target.elements.searchFormInput.value;
    e.preventDefault();

    this.setState({query});
    
    e.target.reset()
  }

  render () {

    
    return (
      <>
      <Searchbar handleSubmit={this.handleSubmit}/>
      <ImageGallery images={this.state.images} alt={this.state.query}/>
      {/* <Loader /> */}
      <Button />
      {/* <Modal /> */}
      </>
      
    )
  }
  
};
