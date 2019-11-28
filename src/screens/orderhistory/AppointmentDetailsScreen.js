import React, {Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import AppointmentStatus from './components/AppointmentStatus';
import Button from '../../components/core/Button';
import theme from '../../styles/theme';
import Header from '../../components/core/Header';

const AppointmentDetailsScreen = props => {
  return (
    <Fragment>
      <Header title='Order'/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerInfo}>
            <View style={styles.image}>
              <Avatar
                size={60}
                // rounded
                // source={{
                //   uri:
                //     'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                // }}
              />
            </View>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>High5 Coffee</Text>
              <AppointmentStatus type="waitting" />
            </View>
            <View style={styles.contact}>
              <TouchableOpacity style={styles.iconWrapper} onPress={() => {}}>
                <Icon
                  iconStyle={styles.icon}
                  size={25}
                  name="heart"
                  type="feather"></Icon>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.iconWrapper}>
                <Icon
                  iconStyle={styles.icon}
                  size={25}
                  name="phone"
                  type="font-awesome"></Icon>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.divider}></View>

          <View style={styles.content}>
            <View style={styles.itemRow}>
              {/* <Text style={styles.smText}>Date & Time</Text>
              <Text style={styles.lgText}>Monday, October 24</Text> */}
              <Text style={styles.smText}>Monday, October 24 8:00 AM</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.smText}>Address</Text>
              <Text style={styles.lgText}>436 Dien Bien Phu, Thanh Khe, Da Nang</Text>
              {/* <Text style={styles.smText}>Hoan My Hospital</Text> */}
              <Text style={styles.smText}>0.31 mi away</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.smText}>Fee</Text>
              <Text style={styles.lgText}>20000d</Text>
              <Text style={styles.smText}>1 item(s)</Text>
            </View>
            {/* <View style={styles.itemRow}>
              <Text style={styles.smText}>Need</Text>
              <Text style={styles.lgText}>Treatment</Text>
              <Text style={styles.smText}>Any kind of treatment</Text>
            </View> */}
          </View>
          <Button title="Cancel" secondary disabled style={styles.button} />
        </View>
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 20
  },
  headerInfo: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
  },
  image: {
    justifyContent: 'center',
    marginRight: 15,
  },
  headerTextWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Bold',
    marginBottom: 5,
  },
  contact: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 45,
    height: 45,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: theme.colors.lightGray,
    // borderRadius: 40 / 2,
  },
  icon: {
    color: theme.colors.primary,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.lightGray,
    marginVertical: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  itemRow: {
    marginVertical: 10,
  },
  smText: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Medium',
    color: theme.colors.gray,
    lineHeight: 25,
  },
  lgText: {
    fontSize: 19,
    fontFamily: 'SF-Pro-Text-Medium',
    lineHeight: 30,
  },
  button: {
    marginVertical: 5,
  },
});

export default AppointmentDetailsScreen;
