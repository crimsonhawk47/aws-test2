import React, { Component } from 'react';
import axios from 'axios';

export default class DisplayImage extends Component {
  state = { message: '' };

  formHandler = event => {
    event.preventDefault();
    this.setState({ message: 'Loading...' });
    const filename = document.querySelector('#filename').value;
    const generateGetUrl = 'http://localhost:5000/generate-get-url';
    const options = {
      params: {
        Key: filename,
        ContentType: 'image/jpeg'
      }
    };

    
    axios.get(generateGetUrl, options).then(res => {
      console.log(`IN GETURL`);
      console.log(res);
      const getURL = res.data;
      this.setState({ getURL });
    });
  };

  handleImageLoaded = () => {
    this.setState({ message: 'Done' });
  };

  handleImageError = () => {
    this.setState({ message: 'Sorry, something went wrong. Please check if the remote file exists.' });
  };

  render() {
    const { getURL, message } = this.state;
    return (
      <React.Fragment>
        <h1>Retrieve Image from AWS S3 Bucket</h1>
        <form onSubmit={this.formHandler}>
          <label> Image name:</label>
          <input id='filename' />
          <p>
            <i>Image name must include the extension, eg. cat.jpeg</i>
          </p>
          <button>Load</button>
        </form>
        <p>{message}</p>
        <div className='preview-container'>
          {getURL && (
            <React.Fragment>
              <div className='preview'>
                <img
                  id='show-picture'
                  src={getURL}
                  alt='File stored in AWS S3'
                  onLoad={this.handleImageLoaded}
                  onError={this.handleImageError}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}