import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import theme from '../../styles/theme';
import {Rating, Icon, Button, Divider} from 'react-native-elements';
import Header from '../../components/core/Header';

const DoctorDetailsScreen = props => {
  const {navigation} = props;
  const [doctor, setDoctor] = useState({
    id: 1,
    image: '',
    name: 'Barbara Michelle',
    specialty: 'Pediatric',
    pricePerHour: '48',
    rating: 5,
    ratingCount: 58,
    distance: 15,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="Profile" color="white" />
        <View style={styles.card}>
          <View style={styles.row}>
            <Image
              resizeMode="cover"
              style={styles.avatar}
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
            <View style={styles.basicInfo}>
              <Text style={styles.name}>Edward Janowski</Text>
              <Text style={styles.specialty}>Accident and Emergency</Text>
              <View style={styles.rating}>
                <Rating imageSize={10} readonly startingValue={4} />
                <Text style={styles.ratingCount}>12</Text>
              </View>
            </View>
          </View>
          <View style={styles.rowInfo}>
            <View style={styles.col}>
              <Text style={styles.cardText}>$60</Text>
              <Text style={styles.subText}>Hourly</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.col}>
              <Text style={styles.cardText}>92</Text>
              <Text style={styles.subText}>Reviews</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.col}>
              <Text style={styles.cardText}>739</Text>
              <Text style={styles.subText}>Patients</Text>
            </View>
          </View>
          <View style={styles.rowInfo}>
            <View style={styles.buttonContainer}>
              <Button
                TouchableComponent={TouchableOpacity}
                onPress={() => navigation.navigate('Booking')}
                title="Book Appointment"
                type="solid"
                titleStyle={styles.buttonText}
                buttonStyle={styles.button}
              />
            </View>
            <TouchableOpacity style={styles.loveContainer}>
              <Icon
                name="heart"
                type="antdesign"
                size={22}
                iconStyle={styles.loveIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.address}>
          <Text style={styles.subText}>Location</Text>
          <Text style={styles.body} numberOfLines={2}>
            43 Bourke Street, Newbridge NSW 837 Raffles Place, Boat Band M83
          </Text>
        </View>
        <Divider style={styles.horizontalDivider} />
        <View>
          <Text style={styles.subText}>Education</Text>
          <Text style={styles.body}>UCL, MIT, Stanford University</Text>
        </View>
        <Divider style={styles.horizontalDivider} />
        <View>
          <Text style={styles.subText}>Awards</Text>
          <Text style={styles.body}>
            CMS Stage 1 EHR (2013), AAD Fellow (2016)
          </Text>
        </View>
        <Divider style={styles.horizontalDivider} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  headerContainer: {
    height: 320,
    marginBottom: 50,
    width: '100%',
    backgroundColor: theme.colors.primary
  },
  card: {
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    ...theme.styles.shadow2,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    flex: 1,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 10,
  },
  basicInfo: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Bold',
  },
  specialty: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingCount: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    marginLeft: 5,
  },
  rowInfo: {
    flexDirection: 'row',
    marginTop: 15,
  },
  divider: {
    height: '100%',
    borderLeftColor: '#D8D8D8',
    borderLeftWidth: 1,
    marginRight: 16,
  },
  cardText: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  subText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.gray,
  },
  buttonContainer: {
    flex: 1,
    marginRight: 16,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  loveContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
  },
  loveIcon: {
    color: '#C8C7CC',
  },
  content: {
    padding: 15,
  },
  address: {
    backgroundColor: '#FCFCFC',
    padding: 10,
    borderRadius: 10,
  },
  body: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  horizontalDivider: {
    marginVertical: 16,
  },
});

export default DoctorDetailsScreen;
