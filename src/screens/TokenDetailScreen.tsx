import {useNavigation} from '@react-navigation/native';
import React, {FC, useState, useCallback} from 'react';
import {
  Alert,
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
  List,
  TouchableRipple,
} from 'react-native-paper';
import {appLayout} from '../styles';

import Clipboard from '@react-native-clipboard/clipboard';

const NUM_OF_LINES = 5;

const TokenDetailScreen: FC = (props: any) => {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const [showMore, setShowMore] = useState(false);
  const [numOfLines, setNumOfLines] = useState(NUM_OF_LINES);
  const [totalLines, setTotalLines] = useState(0);

  const [copying, setCopying] = useState(false);
  const onTextLayout = useCallback(
    e => {
      setTotalLines(e.nativeEvent.lines.length);
      setShowMore(e.nativeEvent.lines.length > numOfLines);
    },
    [numOfLines],
  );

  const copyToClipboard = (data: string) => {
    try {
      // setCopyIcon('check-outline');
      setCopying(true);
      Clipboard.setString(data);
      setTimeout(() => {
        setCopying(false);
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        // setCopyIcon('clipboard');
      }, 1000);
      Alert.alert(err);
    }
  };

  const {
    name,
    icon,
    description,
    amount,
    confirmed,
    unconfirmed,
    tokenid,
    sendable,
  } = props.route.params;
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
      <View style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: 20}}>
        <TouchableRipple onPress={() => navigation.goBack()}>
          <Text style={{textAlign: 'center', letterSpacing: 2, fontSize: 16}}>
            Dismiss
          </Text>
        </TouchableRipple>
      </View>
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
          {description && description.length > 0 && totalLines > 5 ? (
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
          ) : null}
        </Card>
        <Card
          style={[
            style.card,
            {
              marginTop: 20,
              marginBottom: 20,
              justifyContent: 'space-evenly',
              minHeight: 280,
            },
          ]}>
          <View style={{paddingTop: 10}}>
            <Text style={style.detailLabel}>Name</Text>
            <List.Item style={style.detail} title={name}></List.Item>
          </View>
          <View style={{paddingTop: 10}}>
            <Text style={style.detailLabel}>Total Supply</Text>
            <List.Item style={style.detail} title={amount}></List.Item>
          </View>
          <View style={{paddingTop: 10}}>
            <Text style={style.detailLabel}>Token ID</Text>
            <View style={{flexDirection: 'row'}}>
              <List.Item
                titleEllipsizeMode="middle"
                style={[
                  style.detail,
                  {
                    flex: 1,
                    marginRight: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
                title={tokenid}></List.Item>
              <View
                style={[
                  style.detailCopyBtn,
                  copying ? {backgroundColor: '#40A960'} : null,
                ]}>
                <TouchableRipple
                  onPress={() => {
                    copyToClipboard(tokenid);
                  }}>
                  <Image
                    source={
                      !copying
                        ? require('../assets/images/clipboard.png')
                        : null
                    }
                  />
                </TouchableRipple>
              </View>
            </View>
          </View>
        </Card>

        <Card
          style={[
            style.card,
            {
              marginTop: 20,
              marginBottom: 20,
              justifyContent: 'space-evenly',
              minHeight: 280,
            },
          ]}>
          <View style={{paddingTop: 10}}>
            <Text style={style.detailLabel}>Confirmed</Text>
            <List.Item style={style.detail} title={confirmed}></List.Item>
          </View>
          <View style={{paddingTop: 10}}>
            <Text style={style.detailLabel}>Unconfirmed</Text>
            <List.Item style={style.detail} title={unconfirmed}></List.Item>
          </View>
          <View style={{paddingTop: 10}}>
            <Text style={style.detailLabel}>Sendable</Text>
            <List.Item style={style.detail} title={sendable}></List.Item>
          </View>
        </Card>
      </ScrollView>
    </ImageBackground>
  );
};

export default TokenDetailScreen;

const style = StyleSheet.create({
  detailCopyBtn: {
    minWidth: 44,
    minHeight: 50,
    marginRight: 15,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#317AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: '700',
    paddingLeft: 30,
    paddingBottom: 6,
  },
  detail: {
    fontWeight: '400',
    letterSpacing: 2,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
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
    marginTop: 30,
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
