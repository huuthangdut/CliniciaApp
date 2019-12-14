import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import theme from '../../../styles/theme';
import {Avatar} from 'react-native-elements';
import {FavoriteService} from '../../../services/FavoriteService';
import EmptyList from '../../../components/core/EmptyList';
import {AppContext} from '../../../AppProvider';

const FavoriteList = props => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {navigation} = props;

  const context = useContext(AppContext);

  const removeFromFavorite = (id, index) => {
    setFavorites(list => list.filter(x => x.doctor.id !== id));
    FavoriteService.removeFromFavorite(id).catch(e => {
      console.log(e);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    FavoriteService.getFavorites(0, 100)
      .then(result => {
        setIsLoading(false);
        // console.log(result.items);
        setFavorites(result.items);
      })
      .catch(e => {
        setIsLoading(false);
        console.log(e);
      });
  }, [context.shouldReloadFavorite.get]);

  return (
    <View style={styles.container}>
      {favorites.length === 0 && isLoading ? (
        <ActivityIndicator
          size={40}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : favorites.length === 0 && !isLoading ? (
        <EmptyList text="Không có dữ liệu." />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favorites}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('DoctorDetails', {id: item.doctor.id})}>
              <View style={styles.item}>
                <Avatar
                  rounded
                  size={64}
                  showEditButton
                  source={{uri: item.doctor.imageProfile}}
                  editButton={{
                    name: 'md-heart-dislike',
                    type: 'ionicon',
                    color: theme.colors.red,
                    size: 16,
                    containerStyle: styles.loveIcon,
                  }}
                  onEditPress={() => removeFromFavorite(item.doctor.id, index)}
                />
                <Text numberOfLines={2} style={styles.name}>
                  {item.doctor.name}
                </Text>
                <View style={styles.rating}>
                  <View style={styles.starWrapper}>
                    <Image
                      style={styles.starIcon}
                      source={theme.tabIcons.star}
                    />
                  </View>
                  <Text style={styles.ratingText}>
                    {item.doctor.rating || 0}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 10,
    justifyContent: 'center',
    // alignItems: 'flex-start',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  item: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 5,
    backgroundColor: theme.colors.favorite.backgroundGray,
    borderColor: theme.colors.lightGray,
    height: 158,
    width: Dimensions.get('screen').width / 3.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 5,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  ratingText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
    color: theme.colors.darkGray,
  },
  starWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  starIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  loveIcon: {
    backgroundColor: theme.colors.white,
    width: 22,
    height: 22,
    justifyContent: 'center',
    borderRadius: 11,
    borderColor: theme.colors.favorite.borderHeartIcon,
    borderWidth: 1,
  },
});

export default FavoriteList;
