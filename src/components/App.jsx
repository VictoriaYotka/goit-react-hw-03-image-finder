import { Component } from "react";
import searchImages from "services";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Loader from './Loader'
import Button from "./Button";
import Modal from "./Modal";



export class App extends Component  {
state = {
  query: ''
}

componentDidUpdate () {
  searchImages(this.state.query, 1)
    .then(data => console.log(data))
    .catch(error => console.log(error))
}
  
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
      <ImageGallery />
      {/* <Loader /> */}
      <Button />
      {/* <Modal /> */}
      </>
      
    )
  }
  
};
