import { Component } from "react";
import searchImages from "services";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem";
import Loader from './Loader'
import Button from "./Button";
import Modal from "./Modal";



export class App extends Component  {
  state = {
    query: '',
    page: 1,
    images: [],
    largeImage:'',
    isLoading: false,
    loadMore: false,
    isModalOpen: false,
  }

  componentDidUpdate (_, prevState) {
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
    this.setState(prevState => ({page: prevState.page += 1})); 
  }

  openModal = (key) => {
    const largeImage = this.state.images.find(image => image.id === key).largeImageURL;

    this.setState({isModalOpen: true, largeImage});
  }

  closeModal = (e) => {
    if(e.key === 'Escape' || e.currentTarget === e.target) {
      this.setState({isModalOpen: false});
    }  
  }

  render () {
    const {query, images, largeImage, isLoading, loadMore, isModalOpen} = this.state;
    
    return (
      <>
      <Searchbar handleSubmit={this.handleSubmit}/>
      
      <ImageGallery>
        {images.map(({id, webformatURL}) => 
          <ImageGalleryItem handleImageClick={()=>this.openModal(id)} key={id} webformatURL={webformatURL} alt={query}/>
          )}
      </ImageGallery>
      
      {isLoading && <Loader />}
      
      {loadMore && <Button handleLoadMore={this.handleLoadMore}/>}
      
      {isModalOpen &&  
      <Modal src={largeImage} alt={query} closeModal={this.closeModal}/>}
      </>
    )
  }
};
