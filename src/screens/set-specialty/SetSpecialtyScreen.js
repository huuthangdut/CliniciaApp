import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import theme from '../../styles/theme';
import Header from '../../components/core/Header';
import {Divider, CheckBox, Icon} from 'react-native-elements';
import {Toast} from '../../utilities/toast';
import {SpecialtyService} from '../../services/SpecialtyService';
import {DoctorService} from '../../services/DoctorService';

const SetSpecialtyScreen = props => {
  const {navigation} = props;

  const [selectedSpecialty, setSelectedSpecialty] = useState();

  const [specialties, setSpecialities] = useState([]);

  const Loader = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
      }}>
      <ActivityIndicator size={30} style={{color: '#000'}} />
    </View>
  );

  const onSave = () => {
    if (!selectedSpecialty) {
      Toast.error('Vui lòng chọn chuyên khoa');
      return;
    }
    DoctorService.setSpecialty(selectedSpecialty.id)
      .then(() => {
        navigation.navigate('Tab');
      })
      .catch(error => {
        Toast.error(error.errorMessage);
      });
  };

  useEffect(() => {
    SpecialtyService.getSpecialties(0, 100).then(result => {
      if (result.items) {
        setSpecialities(result.items);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header hasBackIcon={false} title="Chọn chuyên khoa" />
      <ScrollView>
        {specialties.length > 0 ? (
          specialties.map((item, index) => (
            <View style={styles.itemContainer} key={index}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => setSelectedSpecialty(item)}>
                <View style={styles.specialtyContainer}>
                  <Text numberOfLines={2} style={styles.body}>
                    {item.name}
                  </Text>
                </View>
                <CheckBox
                  containerStyle={styles.checkBox}
                  checkedColor={theme.colors.secondary}
                  uncheckedColor={theme.colors.gray}
                  checkedIcon="checkbox-marked-circle"
                  uncheckedIcon="checkbox-blank-circle-outline"
                  iconType="material-community"
                  size={22}
                  right
                  checked={selectedSpecialty && item.id == selectedSpecialty.id}
                  onPress={() => setSelectedSpecialty(item)}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Loader />
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.7}
        onPress={() => onSave()}>
        <Icon
          type="material-community"
          name="arrow-right-circle"
          size={60}
          color={theme.colors.primary}
          style={{marginBottom: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.lightGray,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    height: 60,
    borderRadius: 10,
  },
  container: {
    position: 'relative',
    flex: 1,
    marginHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 50,
    marginVertical: 5,
  },
  checkBox: {
    backgroundColor: theme.colors.lightGray,
    marginRight: 0,
    width: 40,
  },
  specialtyContainer: {
    flex: 1,
  },
  body: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 9999,
  },
});
export default SetSpecialtyScreen;
