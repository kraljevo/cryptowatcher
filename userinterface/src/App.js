import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
      id: 1,
      email: "",
      priceLow: undefined,
      priceHigh: undefined
  }

  componentDidMount() {
    fetch('/values')
      .then(res => res.json())
      .then(data => {
        this.setState({
          email: data.email,
          priceLow: data.priceLow,
          priceHigh: data.priceHigh
        })
      })
  }
  
  handleSubmit = event => {
    event.preventDefault();
    let userInput = {
      email: event.target.email.value,
      priceLow: event.target.lowprice.value,
      priceHigh: event.target.highprice.value
    };

    fetch('/values', {
      method: 'PUT',
      body: userInput
    }).then(res => res.json())
    .then(response => console.log('Success: ', response))
    .catch(error => console.error('Error: ', error))
      
    document.getElementById("form-price").reset();
  }

  render() {

    return (
      <div className="App">
        <header className="header-container">
          <div className="header">
            <div className="app-title">CRYPTOWATCHER</div>
          </div>
        </header>
        <body className="Body">
          <div className="content-container">
            <form className="form-price" id="form-price" onSubmit={this.handleSubmit}>
              <div className="input-block">
                <div className="price-label">Low Price: ${this.state.priceLow}</div>
                <input type="number" className="price-input" name="lowprice" />
              </div>
              <div className="input-block">
                <div className="price-label">High Price: ${this.state.priceHigh}</div>
                <input type="number" className="price-input" name="highprice"/>
              </div>
              <div className="input-block">
                <div className="price-label">Email<span id="required-asterisk">*</span></div>
                <input type="email" className="price-input" name="email" />
              </div>
              <div className="input-block">
                <span id="required-asterisk">*</span> = required
              </div>
              <div className="input-block" id="submit-container">
                <input className="submit-button" type="submit" value="Save Changes" />
              </div>
            </form>
          </div>
        </body>
      </div>
    )
  }
}