import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
        value: 200,
        density : {
          enable: true,
          value_area: 900
        },
        }
      }
    }

    const initialState = {
        input: '',
        imageUrL: '',
        box: {},
        route: 'singin',
        isSignIn: false,
        user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
        }
      }

    class App extends Component {
  constructor() {
      super();
      this.state = initialState;
      }

    loadUser = (data) => {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.emial,
        entries: data.entries,
        joined: data.joined
      }})
    }



    calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }

displayFaceBox = (box) => {
    this.setState ({box});
}
    onInputChange = (event) => { 
      this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
      this.setState({imageUrL: this.state.input})
      fetch('http://localhost:3000/imageurl', {
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => { 
        if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id
        })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log);
      }
        this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

    onRouteChange = (route) => {
      if (route === 'singout') {
        this.setState(initialState)
      } else if (route === 'home') {
        this.setState({isSignIn: true})
      }
        this.setState({route: route});
    }

    render() {
      const { isSignIn, imageUrL, route, box } = this.state;
    return (
      <div className="App">
      <Particles className='particles' 
        params={particlesOptions} 
      />
      <Navigation isSingIn={isSignIn} onRouteChange={this.onRouteChange} />
      {route === 'home'
        ? <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={box} imageUrL={imageUrL}/>
      </div>
      : (
        route === 'singin' 
        ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      )
      }
    </div>
    );
  }
}

export default App;
 