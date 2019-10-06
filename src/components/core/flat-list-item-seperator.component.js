import React from 'react';
import {View} from 'react-native';
import theme from "../../styles/theme";

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: theme.colors.lightGray,
        marginVertical: 5
      }}
    />
  );
};

export default FlatListItemSeparator;
