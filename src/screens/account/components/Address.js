import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import theme from '../../../styles/theme';
import {AppContext} from '../../../AppProvider';

const Address = (props) => {
  const context = useContext(AppContext);
  const {navigation} = props;
  const address = context.authUser.get ? context.authUser.get.address : '';

  return (
    <View style={styles.setting}>
      <Text style={styles.headerLabel}>Địa chỉ</Text>
      <View style={styles.addressList}>
        {
          <TouchableOpacity onPress={() => navigation.navigate('SetLocation', {shouldGoBack: true})}>
            <View style={styles.addressItem}>
              <View>
                <ListItem
                  key={1}
                  title={address}
                  titleStyle={{
                    fontSize: 15,
                    fontFamily: 'SF-Pro-Text-Regular',
                    color: theme.colors.black,
                  }}
                  bottomDivider
                  chevron
                />
              </View>
            </View>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLabel: {
    fontSize: 16,
    paddingLeft: 15,
    fontFamily: theme.colors.black,
    backgroundColor: theme.colors.lightGray,
    color: theme.colors.darkGray,
    lineHeight: 40,
  },
  addressTypeText: {
    paddingLeft: 15,
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    paddingTop: 15,
    marginBottom: 0,
  },
});

export default Address;
