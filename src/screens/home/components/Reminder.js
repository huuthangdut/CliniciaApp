import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import theme from '../../../styles/theme'
import Carousel from 'react-native-snap-carousel'

const { width: screenWidth } = Dimensions.get('window')

const Reminder = props => {
  const {item} = props; 

  const [data, setData] = useState([
    { name: 'phuc', title: 'sss',  },
    { name: 'phuc', title: 'sss',  },
    { name: 'phuc', title: 'sss',  },
    { name: 'phuc', title: 'sss',  }
  ])

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
      </View>
    )
  }
  
  return (
      <View style={styles.card}>
      <Carousel
        // ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth-60}
        data={data}
        renderItem={_renderItem}
        hasParallaxImages
        slideStyle={{
          backgroundColor: theme.colors.primary,
          borderRadius: 10
        }}
        containerCustomStyle={{
          width: '100%',
          flex: 1
        }}
      />
      </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    height: 200,
    borderRadius: 12,
  }
});

export default Reminder;