import { Component } from "react"

export default class Modal extends Component {

  componentDidMount () {
    window.addEventListener('keydown', this.props.closeModal)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.props.closeModal)
  }

  render () {
    const { closeModal, src, alt } = this.props

    return (
      <div className="overlay" onClick={closeModal}>
      <div className="modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  )
  }
}
