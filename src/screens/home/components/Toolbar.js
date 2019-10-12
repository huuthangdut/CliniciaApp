import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import theme from '../../../styles/theme';
import {Icon} from 'react-native-elements';

const Toolbar = props => {
  const [sortBy, setSortBy] = useState('top');

  return (
    <View style={[styles.buttonGroup, styles.row]}>
      <TouchableOpacity style={[styles.col, styles.center]} activeOpacity={0.5}>
        <View style={styles.row}>
          <Picker
            mode="dropdown"
            selectedValue={sortBy}
            style={[{flex: 1, marginLeft: 5}, styles.buttonText]}
            itemStyle={styles.buttonText}
            onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}>
            <Picker.Item label="Top rated" value="top" />
            <Picker.Item label="Nearest" value="nearest" />
          </Picker>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={[styles.col, styles.center]} activeOpacity={0.5}>
        <View style={styles.row}>
          <Icon
            iconStyle={styles.mapIcon}
            name="map"
            type="entypo"
            size={15}></Icon>
          <Text style={styles.buttonText}>Map</Text>
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
    lineHeight: 18,
  },
});

export default Toolbar;
