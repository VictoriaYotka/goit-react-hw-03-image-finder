export default function Searchbar () {
    return (
        <header className="searchbar">
  <form className="searchForm">
    <button type="submit" className="searchForm-button">
      <span className="searchForm-button-label">Search</span>
    </button>

    <input
      className="searchForm-input"
      type="text"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
    />
  </form>
</header>

    )
}