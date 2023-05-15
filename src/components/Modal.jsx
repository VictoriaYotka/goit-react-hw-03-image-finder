import { Component } from "react"

export default class Modal extends Component {
  render () {
    return (
      <div className="overlay">
      <div className="modal">
        <img src="" alt={this.props.alt} />
      </div>
    </div>
  )
  }
}

// function Modal ({src, alt}) {
    
// }