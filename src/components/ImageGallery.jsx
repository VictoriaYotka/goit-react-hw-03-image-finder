import ImageGalleryItem from "./ImageGalleryItem"


export default function ImageGallery ({images, alt}) {
    return (
        <ul className="imageGallery">
            { images.map(({id, webformatURL}) => <ImageGalleryItem key={id} webformatURL={webformatURL} alt={alt}/>) }


</ul>
    )
}