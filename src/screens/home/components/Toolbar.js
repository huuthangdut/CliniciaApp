import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import theme from '../../../styles/theme';
import {Icon} from 'react-native-elements';

const Toolbar = props => {
  const [sortBy, setSortBy] = useState('top');

  return (
    <View style={[styles.buttonGroup, styles.row]}>
      <TouchableOpacity style={[styles.col, styles.center]} activeOpacity={0.5} onPress={() => goToMap()}>
        <View style={styles.row}>
          <Icon
            iconStyle={styles.mapIcon}
            name="map-marker-circle"
            type="material-community"
            size={30}></Icon>
          <Text style={styles.buttonText}>View Nearby</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '100%',
    height: 44,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EFEFF4',
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems:'center',
    flex: 1
  },
  col: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
    lineHeight: 18,
  },
  divider: {
    borderLeftWidth: 1,
    borderLeftColor: '#EFEFF4',
  },
  mapIcon: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.gray,
  },
});

export default Toolbar;
