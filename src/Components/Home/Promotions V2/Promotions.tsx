import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';

type CardProps = {
  imageUri: string;
  text: string;
  link: string;
};

const Card: React.FC<CardProps> = ({ imageUri, text, link }) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity 
      style={[styles.cards, styles.cardElevated]}
      onPress={() => Linking.openURL(link)}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
    </TouchableOpacity>
    <Text style={styles.cardText}>{text}</Text>
  </View>
);

export default function Promotions() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch('http://65.0.18.159:8080/quickVerse/v1/promotionItem/IIMU-313001');
        const result = await response.json();
        
        const promotionsWithCorrectedImageUrls = result.promotions.promotions.map((item: any) => ({
          ...item,
          promoImage: item.promoImage.replace('imgur.com/', 'i.imgur.com/') + '.jpg',
        }));
        console.log("result",result.promotions.promotions);
        console.log("image",promotionsWithCorrectedImageUrls);
        setPromotions(promotionsWithCorrectedImageUrls);

      } catch (err) {
        setError('Failed to fetch promotions');
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#103E60" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Promotions</Text>
      </View>
      <View style={styles.categories}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          {promotions.map((item) => (
            <Card
              key={item.promoId.toString()}
              imageUri={item.promoImage}
              text={item.promoName}
              link={item.promoLink}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 7,
  },
  headingText: {
    fontSize: 24,
    fontWeight: '900',
    paddingHorizontal: 8,
    color: '#103E60',
    marginTop: 5,
  },
  categories: {
    flexDirection: 'row',
    padding: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    marginHorizontal: 6, 
  },
  cards: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 8,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    paddingTop: 4,
  },
  cardElevated: {
    elevation: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#EF5354',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});
