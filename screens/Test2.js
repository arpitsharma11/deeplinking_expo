import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';

class Test2 extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>
                    Test Screen 2
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 40,
    }
});

export default Test2;