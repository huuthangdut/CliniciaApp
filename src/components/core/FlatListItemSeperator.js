import React from 'react';
import {View} from 'react-native';
import theme from '../../styles/theme';

const FlatListItemSeparator = props => {
  const {marginVertical = 5} = props;

  return (
    <View
      style={[
        {
          height: 1,
          width: '100%',
          backgroundColor: theme.colors.lightGray,
        },
        {marginVertical},
      ]}
    />
  );
};

export default FlatListItemSeparator;
