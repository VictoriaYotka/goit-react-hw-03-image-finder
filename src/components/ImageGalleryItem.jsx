export default function ImageGalleryItem ({webformatURL, alt, handleImageClick}) {
    return (
        <li className="imageGalleryItem" >
  <img onClick={handleImageClick} src={webformatURL} alt={alt} className="imageGalleryItem-image"/>
</li>
    )
}