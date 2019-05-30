import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { CustomCrop } from 'react-native-perspective-image-cropper';

//import image from '../assets/images/2.jpg';

class CropView extends Component {

    constructor(props){
        super();
        this.state = {
            ready: false,
            imageWidth: null,
            imageHeight: null,
            initialImage: null,
            rectangleCoordinates: {
              topLeft: { x: 10, y: 10 },
              topRight: { x: 10, y: 10 },
              bottomRight: { x: 10, y: 10 },
              bottomLeft: { x: 10, y: 10 },
            }
        }
    }

  async componentWillMount() {
    const image = '';
    await Image.getSize(image, (width, height) => {
      this.setState({
        imageWidth: width,
        imageHeight: height,
        initialImage: image,
        rectangleCoordinates: {
          topLeft: { x: 10, y: 10 },
          topRight: { x: 10, y: 10 },
          bottomRight: { x: 10, y: 10 },
          bottomLeft: { x: 10, y: 10 },
        },
      }, () => {
          this.setState({
              ready: true
          })
      });
      console.log("state",this.state)
    });
  }

  _loadImage = () => {
    (async () => {
      const image = Asset.fromModule(require('../assets/images/2.jpg'));
      await image.downloadAsync();
      this.setState({
        ready: true,
        image
      });
    })();
  }

  updateImage(image, newCoordinates) {
    this.setState({
      image,
      rectangleCoordinates: newCoordinates
    });
  }

  crop() {
    this.customCrop.crop();
  }

  render() {
    return (
      <View>
        { this.state.ready &&
            <React.Fragment>
                <CustomCrop
                    updateImage={this.updateImage.bind(this)}
                    rectangleCoordinates={this.state.rectangleCoordinates}
                    initialImage={this.state.initialImage}
                    height={this.state.imageHeight}
                    width={this.state.imageWidth}
                    ref={(ref) => this.customCrop = ref}
                    overlayColor="rgba(18,190,210, 1)"
                    overlayStrokeColor="rgba(20,190,210, 1)"
                    handlerColor="rgba(20,150,160, 1)"
                    enablePanStrict={false}
                    />
                <TouchableOpacity onPress={this.crop.bind(this)}>
                    <Text>CROP IMAGE</Text>
                </TouchableOpacity>
            </React.Fragment>
        }
      </View>
    );
  }
}

export default CropView;