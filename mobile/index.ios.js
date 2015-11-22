'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var MainContainer = React.createClass({
  render: function() {
    return (
      <View style={styles.mainContainer}>
        <Text>Timer</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('Mindfulnets', () => MainContainer);
