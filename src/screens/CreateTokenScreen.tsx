import React, {FC, useState} from 'react';

import {Formik} from 'formik';
import * as Yup from 'yup';

import {colorPalette} from '../themes/themes';

import {
  Button,
  Portal,
  Avatar,
  Text,
  TextInput,
  Modal,
  Card,
  Divider,
  Caption,
} from 'react-native-paper';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {appLayout, formStyle} from '../styles';

import {tokencreate} from '../api/rpc-commands';

const CreateTokenSchema = Yup.object().shape({
  name: Yup.string().required('Field Required'),
  amount: Yup.string().required('Field Required'),
  description: Yup.string(),
  url: Yup.string(),
});

const CreateTokenScreen: FC = () => {
  const scheme = useColorScheme();
  const [btnText, setBtnText] = useState('Mint');

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Formik
      initialValues={{name: '', description: '', url: '', amount: ''}}
      validationSchema={CreateTokenSchema}
      onSubmit={(values, {resetForm}) => {
        // console.log(values);
        setBtnText('Minting...');

        const customToken = {
          name: {
            name: values.name,
            description: values.description,
            icon: values.url,
          },
          amount: values.amount,
        };

        tokencreate(customToken)
          .then((res: any) => {
            if (res.status) {
              Alert.alert('Minting Progress', 'Token minted successfully.');

              setBtnText('Mint');

              resetForm();
            } else {
              throw new Error(res.message);
            }
          })
          .catch(err => {
            setBtnText('Mint');
            Alert.alert('Minting Progress', `${err}`);
          });
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
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
          <View style={appLayout.sv}>
            {errors.name && touched.name ? (
              <Text style={formStyle.error}>{errors.name}</Text>
            ) : null}
            <TextInput
              style={formStyle.formInput}
              placeholder="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />

            {errors.amount && touched.amount ? (
              <Text style={formStyle.error}>{errors.amount}</Text>
            ) : null}
            <TextInput
              style={formStyle.formInput}
              placeholder="Amount"
              onChangeText={handleChange('amount')}
              onBlur={handleBlur('amount')}
              value={values.amount}
            />

            {errors.description && touched.description ? (
              <Text style={formStyle.error}>{errors.description}</Text>
            ) : null}
            <TextInput
              style={formStyle.formInput}
              placeholder="Description"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />

            {errors.url && touched.url ? (
              <Text style={formStyle.error}>{errors.url}</Text>
            ) : null}
            <TextInput
              style={formStyle.formInput}
              placeholder="Url for image"
              onChangeText={handleChange('url')}
              onBlur={handleBlur('url')}
              value={values.url}
            />
            <Button
              color={colorPalette.colors.accent}
              mode="outlined"
              style={[formStyle.formBtn, {marginBottom: 10}]}
              labelStyle={formStyle.formBtnLabel}
              onPress={showModal}>
              Preview
            </Button>
            <Button
              mode="contained"
              style={formStyle.formBtn}
              labelStyle={formStyle.formBtnLabel}
              disabled={btnText !== 'Mint' && !touched}
              onPress={handleSubmit}>
              {btnText}
            </Button>
          </View>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={style.container}>
              <Card style={style.card}>
                <Card.Title title="Preview" />
                <Card.Cover
                  style={{margin: 50, marginBottom: 30, marginTop: 10}}
                  source={
                    values.url && values.url.length > 0
                      ? {uri: values.url}
                      : {uri: `https://robohash.org/0x00`}
                  }
                />
                <Divider />
                <Card.Title
                  style={style.cardTitle}
                  title={values.name}
                  subtitle={values.description}
                  titleNumberOfLines={1}
                  subtitleNumberOfLines={3}
                />

                <Divider />
                <View style={style.cardCaptionWrapper}>
                  <Avatar.Image
                    size={24}
                    source={require('../assets/images/minimaLogoSquare.png')}
                  />
                  <Caption style={style.cardCaption}>Minted on Minima</Caption>
                </View>
              </Card>
            </Modal>
          </Portal>
        </ImageBackground>
      )}
    </Formik>
  );
};

export default CreateTokenScreen;

const style = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 30,
  },
  card: {
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
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
