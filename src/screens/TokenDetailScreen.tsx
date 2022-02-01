import {useNavigation} from '@react-navigation/native';
import React, {FC, useState, useCallback} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Avatar,
  Card,
  Divider,
  Paragraph,
  Title,
  Text,
} from 'react-native-paper';
import {Icon} from 'react-native-vector-icons/Icon';
import {appLayout} from '../styles';

const NUM_OF_LINES = 5;

const TokenDetailScreen: FC = (props: any) => {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const [showMore, setShowMore] = useState(false);
  const [numOfLines, setNumOfLines] = useState(NUM_OF_LINES);
  const onTextLayout = useCallback(
    e => {
      setShowMore(e.nativeEvent.lines.length > numOfLines);
    },
    [numOfLines],
  );

  const {name, icon, description, amount, confirmed, unconfirmed, tokenid} =
    props.route.params;
  return (
    <ImageBackground
      source={
        scheme === 'dark'
          ? require('../assets/images/DM.jpg')
          : require('../assets/images/LM.jpg')
      }
      resizeMode="cover"
      style={{
        flex: 1,
      }}>
      <ScrollView style={appLayout.sv}>
        <Card style={style.card}>
          <View style={style.cardTopSection}>
            <Avatar.Image
              size={98}
              style={style.imageContainer}
              source={
                tokenid === '0x00'
                  ? require('../assets/images/minimaLogoSquare.png')
                  : icon && icon.length > 0
                  ? {uri: icon}
                  : {uri: `https://robohash.org/0x00`}
              }></Avatar.Image>

            <Title style={style.title}>{name}</Title>
          </View>
          <Divider style={{margin: 15}} />
          <View style={style.cardBottomSection}>
            {tokenid === '0x00' ? (
              <Paragraph
                style={[
                  style.description,
                  tokenid === '0x00' ? {textAlign: 'center'} : null,
                ]}>
                Minima's official test token.
              </Paragraph>
            ) : (
              <Paragraph
                numberOfLines={numOfLines}
                onTextLayout={onTextLayout}
                style={style.description}>
                {description}
              </Paragraph>
            )}
          </View>
          <Text
            onPress={() => {
              {
                // setNumOfLines(numOfLines + 1);
                showMore
                  ? setNumOfLines(numOfLines + 1)
                  : setNumOfLines(NUM_OF_LINES);
              }
            }}
            style={[style.showMore, showMore ? null : {color: 'red'}]}>
            {showMore ? 'Show More' : 'Show Less'}{' '}
            {showMore ? (
              <Image source={require('../assets/images/vector.png')} />
            ) : null}
          </Text>
        </Card>
      </ScrollView>
    </ImageBackground>
  );
};

export default TokenDetailScreen;

const style = StyleSheet.create({
  showMore: {
    flex: 1,
    textAlign: 'center',
    padding: 20,
    fontWeight: '800',
    color: '#317AFF',
    letterSpacing: 1,
  },
  cardTopSection: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  cardBottomSection: {
    marginLeft: 15,
    marginRight: 15,
    flex: 4,
  },
  imageContainer: {marginTop: 16, marginBottom: 16},
  title: {fontSize: 16, fontWeight: '700'},
  description: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 2,
    textAlign: 'left',
  },
  container: {
    backgroundColor: 'transparent',
    padding: 30,
  },
  card: {
    justifyContent: 'space-evenly',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    elevation: 0,
    minHeight: 351,
  },
  cardTitle: {
    marginBottom: 20,
  },
  cardCaption: {
    fontWeight: '800',
    marginLeft: 5,
    fontSize: 12,
  },
  cardCaptionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    margin: 10,
  },
});
