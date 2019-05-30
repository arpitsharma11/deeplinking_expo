import React from 'react';
import { Text, View, TouchableOpacity, Button, Image, Picker } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import { withNavigationFocus } from 'react-navigation';

import CustomSpinner from '../components/Spinner';

class CameraExample extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageUri: '',
    flashMode: Camera.Constants.FlashMode.off,
    whiteBalance: Camera.Constants.WhiteBalance.auto,
    selected: "key1",
    pictureSizeArray: [],
    pictureSize: '960x720'
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _snap = async () => {
    console.log('snap')
    if (this.camera) {
      let photo = await this.camera.takePictureAsync().then((data) => {
        console.log("done",data);
        this._storePhoto(data);
      })
    }
  };

  _storePhoto = (data)  => {
    this.setState({
      imageUri: data.uri
    })
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'images/')
    FileSystem.moveAsync({
      from: pickerResult.uri,
      to: FileSystem.documentDirectory + 'images/imagename.png'
    })
  }

  _fetchData = async () => {
    this.setState({
      pictureSizeArray: []
    });
    const ratios = await this.camera.getSupportedRatiosAsync();
    ratios.forEach( async (ratio) => {
      const pictureSize = await this.camera.getAvailablePictureSizesAsync(ratio);
      //console.log(ratio);
      pictureSize.forEach(ps => {
        //console.log(ps);
        this.setState({
          pictureSizeArray: [...this.state.pictureSizeArray,ps]
        })
      });
    });
  }

  _prepareRatio = async () => {
    const ratio = await this.camera.getSupportedRatiosAsync();
    console.log("ratio",ratio);
  }

  _toggleFlash = () => {
    console.log('flash button click');
    this.setState({
      flashMode : this.state.flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    })
    //console.log('flash mode changed',this.state)
  }

  onWhiteBalanceChange = (value) => {
    this.setState({
      whiteBalance: value
    });
  }

  onPictureSizeChange = (value) => {
    this.setState({
      pictureSize: value
    });
  }

  render() {
    const { hasCameraPermission, imageUri, flashMode, whiteBalance, pictureSizeArray, pictureSize} = this.state;
    const { isFocused } = this.props;
    if (hasCameraPermission === null) {
      return <CustomSpinner />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          {
            imageUri ? 
            <View style={{
                flex: 1,
              }}
            >
              <Image source={{ uri: imageUri}} 
                style={{
                  flex: 1,
                  resizeMode: 'cover', // or 'stretch',
                  justifyContent: 'center',
                }} 
              />
              <View 
                style={{
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={ ()=> { 
                    this.setState({
                      imageUri: ''  
                    }, () => {
                      console.log("image null", imageUri);
                    }) 
                  }}
                >
                  <Text 
                    style={{
                      fontSize: 30,
                    fontWeight: 'bold',
                    }}
                  >
                    Take another photo
                  </Text>
                </TouchableOpacity>
              </View>
            </View> 
            :
            isFocused ? 
              <Camera 
                style={{ flex: 1 }} 
                type={this.state.type}
                ref={ref => { this.camera = ref; }}
                onCameraReady={this._fetchData}
                flashMode = { flashMode }
                whiteBalance={ whiteBalance }
                pictureSize={ pictureSize }
                autoFocus={ false }
                skipProcessing = { true }
              >
                <View
                  style={{
                    flex: 1,
                    //width: '20',
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>
                    <TouchableOpacity
                    style={{
                      //flex: 0.1,
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}>
                      <Button
                        title='Snap' 
                        onPress={() => this._snap(this)} />
                        <Button
                        title='Flash' 
                        onPress={() => this._toggleFlash()} />
                      <Picker
                        note
                        mode="dropdown"
                        style={{ width: 120 }}
                        selectedValue={this.state.whiteBalance}
                        onValueChange={this.onWhiteBalanceChange}
                      >
                        <Picker.Item label="Auto" value={Camera.Constants.WhiteBalance.auto} />
                        <Picker.Item label="Sunny" value={Camera.Constants.WhiteBalance.sunny} />
                        <Picker.Item label="Cloudy" value={Camera.Constants.WhiteBalance.cloudy} />
                        <Picker.Item label="Shadow" value={Camera.Constants.WhiteBalance.shadow} />
                        <Picker.Item label="Fluorescent" value={Camera.Constants.WhiteBalance.fluorescent} />
                        <Picker.Item label="Incandescent" value={Camera.Constants.WhiteBalance.incandescent} />
                      </Picker>
                      <Picker
                        mode="dropdown"
                        style={{ width: 150 }}
                        selectedValue={this.state.pictureSize}
                        onValueChange={this.onPictureSizeChange}
                      >
                        { 
                          pictureSizeArray.map((pictureSize,index) => (
                            <Picker.Item label={pictureSize } key={index} value={pictureSize} />
                          ))
                        }
                      </Picker>
                    </TouchableOpacity>
                </View>
              </Camera> :
              null
          }
        </View>
      );
    }
  }
}

export default withNavigationFocus(CameraExample);