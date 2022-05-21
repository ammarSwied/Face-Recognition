import React,{Component} from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

// api config
const app = new Clarifai.App({
  apiKey: '5aeed324f8ca4e2cacd73d56d92549b5'
 });

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  clacFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image  = document.getElementById('inputimage');
    const width = Number(image.width);
    const height  = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  faceBox =  (box) => {
    this.setState({box: box});
  }

 onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input)
  .then(respone => this.faceBox(this.clacFaceLocation(respone)))
  .catch(err => console.log(err));
}

onRouteChange = (route) => {
    
  if (route === 'signin' || route==='register') {
    this.setState({isSignedIn: false});
  }
  else{
    this.setState({isSignedIn: true});
  }
    this.setState({route:route});
}


  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div>
        <h1 className='tc white animate__animated animate__fadeInTopLeft shadow-5'>Made By Ammar</h1>
       <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
       {
          route === 'signin' 
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : (route === 'register') ? <Register onRouteChange={this.onRouteChange}/>
          :<div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition imageUrl={imageUrl} box={box}/>
            </div>
       }
      </div>
    );
  }
}

export default App;