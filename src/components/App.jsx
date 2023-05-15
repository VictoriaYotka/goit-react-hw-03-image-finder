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
  images: [],
  isLoading: false,
  loadMore: false,
}

componentDidUpdate (_, prevState) {
  console.log(this.state);  

  const { query, page } = this.state;

  if (prevState.query !== query || (prevState.query === query && prevState.page !== page)) {
    this.fetchImages();
  }
}

fetchImages = () => {
  const { query, page, images } = this.state;
  this.setState({isLoading: true})
  

  searchImages(query, page)
    .then(res => {
      const {hits} = res;
      const newImages = hits.map(({id, webformatURL, largeImageURL}) => {return {id, webformatURL, largeImageURL}})
  
      this.setState(prevState => 
        ({images: [...prevState.images, ...newImages]}))
      // console.log(images.length + newImages.length)
      // console.log(res.totalHits)
      if((images.length + newImages.length) < res.totalHits) {
        this.setState({loadMore: true})
      } else {
        this.setState({loadMore: false})
      }


      
  })
    .catch(error => console.log(error))
    .finally(() => this.setState({isLoading: false}))
  }
  
  handleSubmit = (e) => {
    const query = e.target.elements.searchFormInput.value;
    e.preventDefault();

    this.setState({query, page: 1, images: []});
    
    e.target.reset()
  }

  handleLoadMore = () => {
    console.log('load more')
    this.setState(prevState => ({page: prevState.page += 1})); 
  }

  render () {
    const {isLoading, loadMore} = this.state;
    return (
      <>
      <Searchbar handleSubmit={this.handleSubmit}/>
      
      <ImageGallery images={this.state.images} alt={this.state.query}/>
      
      {isLoading && <Loader />}
      
      {loadMore && <Button handleLoadMore={this.handleLoadMore}/>}
      
      {/* <Modal /> */}
      </>
      
    )
  }
  
};
