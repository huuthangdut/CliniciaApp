import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import theme from '../../../styles/theme';

const Toolbar = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
          <Image style={styles.icon} source={theme.tabIcons.filter} />
          <Text style={styles.text}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
          <Image style={styles.icon} source={theme.tabIcons.sort} />
          <Text style={styles.text}>Sort</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44
  },
  tab: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderTopColor: '#EFEFF4',
    borderBottomColor: '#EFEFF4',
    borderRightColor: '#EFEFF4',
    borderLeftWidth: 0,
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: 15,
    color: '#666666'
  },
  text: {
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: 15,
    color: theme.colors.darkGray
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 8
  },
});

export default Toolbar;
