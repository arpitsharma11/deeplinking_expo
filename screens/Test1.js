import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';

class Test1 extends Component{
    render(){
        return(
            <View style={styles.container} >
                <Text>
                    Test Screen 1
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

export default Test1;