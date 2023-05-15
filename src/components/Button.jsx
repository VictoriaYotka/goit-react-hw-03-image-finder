export default function Button ({handleLoadMore}) {
    return (
        <button onClick={handleLoadMore} type="button" className="button">Load more</button>
    )
}