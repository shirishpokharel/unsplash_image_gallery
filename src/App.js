import "./App.css";

import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      count: 10,
      counter: null,
    };
    this.countDown = this.countDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.fetchImage();
  }

  fetchImage() {
    fetch(
      "https://api.unsplash.com/photos/random?client_id=WC0ADYmIk2ODMYWPmdcuSVU7k3CpMyWK87H4y9vsHt0&count=20"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          images: data,
        });
      });
  }

  countDown(e) {
    e.preventDefault();
    this.counter = setInterval(this.tick, 1000);
  }
  tick() {
    this.setState({
      count: this.state.count - 1,
    });
    if (this.state.count === 0) {
      clearInterval(this.counter);
      this.fetchImage();
    }
  }

  render() {
    const { count } = this.state;
    return (
      <div className="main">
        <h1>Unsplash Image Gallery</h1>
        <button
          style={{
            width: 100,
            height: 50,
            backgroundColor: "light-blue",
            borderRadius: 9,
            marginTop: 10,
            marginBottom: 10,
          }}
          onClick={this.countDown}
        >
          Begin Count-Down
        </button>
        <div>{this.countDown && <div>{count}</div>}</div>

        <div className="image-wrapper">
          {this.state.images.map((image) => (
            <img src={image.urls.thumb} style={{ padding: 10 }} />
          ))}
        </div>
      </div>
    );
  }
}
