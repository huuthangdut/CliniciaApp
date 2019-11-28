import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import theme from '../../../styles/theme';

export default function CartItem(props) {
  const { item } = props;
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.name}</Text>
          <View>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      </View>
      <View style={styles.changeQtyStyle}>
        <Text
          style={{
            paddingHorizontal: 8,
          }}
        >
          {item.quantity}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 130,
    width: 130,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderColor: theme.colors.lightGray,
    paddingVertical: 8,
  },
  addToCart: {
    width: 25,
    height: 25,
  },
  title: {
    // fontSize: theme.text.size.xl,
    // fontFamily: theme.text.fonts.sfpt,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
  },
  changeQtyStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  price: {
    // fontFamily: theme.text.fonts['sfpt-medium'],
    color: theme.colors.gray,
  },
});
