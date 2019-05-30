import React, {Component} from 'react';
import { Button, TouchableOpacity, Text, View, Image } from 'react-native';
import { Asset, ImageManipulator } from 'expo';

class LinksScreen extends Component {
  static navigationOptions = {
    title: 'Links',
  };

  state = {
    ready: false,
    image: null,
  };

  componentDidMount() {
    this._loadImage();
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          {this.state.ready && this._renderImage()}
          <View style={{ padding : 5 }}>
            <Button title="rotate" onPress={this._rotate90andFlip} />
          </View>
          <View style={{ padding : 5 }}>
            <Button title="crop" onPress={this._crop} />
          </View>
          <View style={{ padding : 5 }}>
            <Button title="Reset" onPress={this._loadImage} />
          </View>
        </View>
      </View>
    );
  }

  _rotate90andFlip = async () => {
    const manipResult = await ImageManipulator.manipulateAsync(
      this.state.image.localUri || this.state.image.uri,
      [{ rotate: 30}],
      { format: 'png' }
    );
    this.setState({ image: manipResult });
  }

  _crop = async () => {
    const manipResult = await ImageManipulator.manipulateAsync(
      this.state.image.localUri || this.state.image.uri,
      [{ crop : {originX : 2, originY:2, width: 100, height: 100} }]
    );
    this.setState({ image: manipResult });
  }

  _renderImage = () => {
    return (
      <View style={{marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{ uri: this.state.image.localUri || this.state.image.uri }}
          style={{ width: 300, height: 300, resizeMode: 'contain' }}
        />
      </View>
    );
  };
}

export default LinksScreen;