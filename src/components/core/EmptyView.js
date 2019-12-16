import React from 'react'
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  global: {
    marginBottom: 20
  },
  image: {
    width: 250,
    height: 250
  },
  title: {
    fontSize: 20
  },
  desc: {
    width: 280,
    textAlign: 'center'
  },
  button: {
    color: 'red'
  }
})

module.exports = React.createClass({
  propTypes: {
    showIf: React.PropTypes.bool.isRequired,
    view: React.PropTypes.node.isRequired,
    image: React.PropTypes.any, // TODO: validate Image type
    title: React.PropTypes.node,
    desc: React.PropTypes.node,
    button: React.PropTypes.object,
    background: React.PropTypes.string // TODO: validate colors
  },
  render() {
    if (!this.props.showIf) {
      return (
        <View style={styles.container}>
          {this._getElement('image')}
          {this._getElement('title')}
          {this._getElement('desc')}
          {this._getElement('button')}
        </View>
      )
    }

    return (this.props.view)
  },
  _getElement(type) {
    if (typeof this.props[type] !== 'undefined') {
      switch (type) {
        case 'image':
          return <Image
            source={this.props.image}
            resizeMode="stretch"
            style={[
              styles.global,
              styles.image,
              this.props.stylesheet.image
            ]}
          />

        case 'title':
          return <Text
            style={[
              styles.global,
              styles.title,
              this.props.stylesheet.title
            ]}>
            {this.props.title}
          </Text>

        case 'desc':
          return <Text
            style={[
              styles.global,
              styles.desc,
              this.props.stylesheet.desc
            ]}>
            {this.props.desc}
          </Text>

        case 'button':
          return <TouchableHighlight
            style={[styles.global, this.props.stylesheet.button]}
            onPress={this.props.button.action}>
            <Text style={styles.button}>{this.props.button.text}</Text>
          </TouchableHighlight>
      }
    }

    return
  }
})