import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../../styles/theme';
import {Avatar, Icon, Rating} from 'react-native-elements';
import {FavoriteService} from '../../../services/FavoriteService';
import {AppContext} from '../../../AppProvider';
import { Toast } from '../../../utilities/toast';

const DoctorItem = props => {
  const {item, navigation, showSpecialty} = props;

  const [isFavorited, setIsFavorited] = useState(item.isFavorited);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const context = useContext(AppContext);

  const addOrRemoveFavorite = (id, isFavorited) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setIsFavorited(value => !value);
    if (isFavorited) {
      FavoriteService.removeFromFavorite(id)
        .then(handleAddOrRemoveFavoriteSuccess)
        .catch(handleAddOrRemoveFavoriteError);
    } else {
      FavoriteService.addToFavorite(id)
        .then(handleAddOrRemoveFavoriteSuccess)
        .catch(handleAddOrRemoveFavoriteError);
    }
  };

  const handleAddOrRemoveFavoriteSuccess = () => {
    setIsSubmitting(false);
    context.shouldReloadFavorite.set(value => !value);
  };

  const handleAddOrRemoveFavoriteError = error => {
    setIsSubmitting(false);
    Toast.error(error.errorMessage);
  };

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DoctorDetails', {id: item.id})}>
      <View style={styles.image}>
        <Avatar
          size={80}
          rounded
          source={{
            uri: item.imageProfile,
          }}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{item.firstName + ' ' + item.lastName}</Text>
        <View style={styles.row}>
          <Icon
            name="map-marker"
            type="font-awesome"
            size={12}
            color="#C8C7CC"
          />
          <Text style={styles.text}>{item.distanceFromPatient} km</Text>
          {showSpecialty && (
            // <View>
              // <Icon name="dot-single" type="entypo" size={12} color="#C8C7CC" />
              <Text style={styles.text}>{item.specialty.name}</Text>
            // </View>
          )}
        </View>
        <View style={styles.row}>
          <Rating
            imageSize={10}
            readonly
            startingValue={item.rating}
            style={styles.rating}
          />
          <Text style={styles.text}>{item.ratingCount}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.likeWrapper}
        onPress={() => addOrRemoveFavorite(item.id, isFavorited)}>
        <Icon
          name={isFavorited ? 'heart' : 'hearto'}
          type="antdesign"
          size={20}
          color={theme.colors.red}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 90,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
  },
  image: {
    marginRight: 15,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Medium',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  text: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
    paddingHorizontal: 5,
  },
  rating: {
    height: 10,
  },
  price: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.black,
    paddingHorizontal: 5,
  },
  likeWrapper: {
    width: 30,
    justifyContent: 'center',
  },
});

export default DoctorItem;
