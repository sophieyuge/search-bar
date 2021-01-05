import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input_value: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { input_value } = this.state;
    try {
      const response = await fetch(`http://localhost:3001/data?product_name_like=${input_value}`);
      const data = await response.json();
      if (data && data.length) {
        this.setState({ data });
      }
    }
    catch(error) {
      console.error('Error:', error);
    }
  };

  handleChange = async (event) => {
    this.setState({ input_value: event.target.value });

    if (event.target.value) {
      try {
        const response = await fetch(`http://localhost:3001/data?product_name_like=${event.target.value}&_start=00&_end=10`);
        const data = await response.json();

        if (data && data.length) {
          this.setState({ data });
        }
      }
      catch(error) {
        console.error('Error:', error);
      }
    }
  };

  handleClick = (event) => {
    this.setState({
      input_value: event.target.innerText,
    });
  };

  render() {
    const { input_value, data } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>Search bar</p>
          <form onSubmit={this.handleSubmit}>
              <input
                value={input_value}
                type="text"
                onChange={this.handleChange}
              />
              <input type="submit" value="Submit"/>
              <ul className="suggestions">
              {data.map(
                product => (
                  <li
                    type="button"
                    className="suggested-item"
                    key={product.id}
                    value={product.product_name}
                    onClick={this.handleClick}
                  >
                    {product.product_name}
                  </li>
                ))
              }
              </ul>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
