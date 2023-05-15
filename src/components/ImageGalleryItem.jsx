export default function ImageGalleryItem ({webformatURL, alt, handleImageClick}) {
    return (
        <li className="imageGalleryItem" onClick={handleImageClick}>
  <img  src={webformatURL} alt={alt} className="imageGalleryItem-image"/>
</li>
    )
}