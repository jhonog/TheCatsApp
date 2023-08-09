import React from 'react';
import {useCats} from '../hooks/useGetCats';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const Home = () => {
  const {cats, isLoadingCats} = useCats();

  return (
    <SafeAreaView>
      <>
        {isLoadingCats ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.Container}>
            <View  >
              <Text style={{fontWeight:'bold', fontSize:16, textAlign:'center'}} >CatsBreeds</Text>
            </View>
            <FlatList
              data={cats}
              renderItem={({item}) => (
                <View style={styles.cardContainer}>
                  <Text style={styles.breedName}>{item?.bredName}</Text>
                  {item?.imageUrl && (
                    <Image
                      style={styles.image}
                      source={{uri: item?.imageUrl}}
                    />
                  )}
                  <View style={{flex:1, width:'100%', justifyContent:'space-between', flexDirection:'row'}} >
                    <Text style={styles.origin}>Origin: {item.origin}</Text>
                    <Text style={styles.intelligence}>
                      Intelligence: {item.intelligence}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.bredName}
            />
          </View>
        )}
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  breedName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  origin: {
    color: '#555',
  },
  intelligence: {
    color: 'blue',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
    marginTop: 8,
    marginVertical: 12,
    alignSelf: 'center',
  },
  Container: {
    padding: 20,
    flexGrow: 1,
  },
});
