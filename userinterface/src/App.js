import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
      email: "",
      priceLow: undefined,
      priceHigh: undefined
  }

  componentDidMount() {
    fetch('/priceWatchers')
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
    console.log('Handling submit...');
    let userInput = {
        email: event.target.email.value,
        priceLow: event.target.lowprice.value,
        priceHigh: event.target.highprice.value
    };
    
    fetch('/priceWatchers', {
      method: 'POST',
      body: JSON.stringify(userInput),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success: ', response))
    .catch(error => console.error('Error: ', error))

    this.setState({
      email: event.target.email.value,
      priceLow: event.target.lowprice.value,
      priceHigh: event.target.highprice.value
    });
      
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
                <div className="price-label">Buy Price: ${this.state.priceLow}</div>
                <input type="number" className="price-input" name="lowprice" />
              </div>
              <div className="input-block">
                <div className="price-label">Sell Price: ${this.state.priceHigh}</div>
                <input type="number" className="price-input" name="highprice"/>
              </div>
              <div className="input-block">
                <div className="price-label">Email (required)</div>
                <input type="email" className="price-input" name="email" />
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