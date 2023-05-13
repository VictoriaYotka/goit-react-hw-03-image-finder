export default function ImageGalleryItem ({webformatURL, alt}) {
    return (
        <li className="imageGalleryItem">
  <img src={webformatURL} alt={alt} className="imageGalleryItem-image"/>
</li>
    )
}