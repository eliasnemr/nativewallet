import React, {FC, useState} from 'react';

import {Formik} from 'formik';
import * as Yup from 'yup';

import {Button, Text, TextInput} from 'react-native-paper';
import {ImageBackground, useColorScheme, View} from 'react-native';
import {appLayout, formStyle} from '../styles';

const customToken = {
  name: {
    name: 'CustomToken',
    description: 'A Description',
    icon: 'an icon',
  },
  amount: 'Amount to mint',
};

const CreateTokenSchema = Yup.object().shape({
  name: Yup.string().required('Field Required'),
  amount: Yup.string().required('Field Required'),
  description: Yup.string(),
  url: Yup.string(),
});

const CreateTokenScreen: FC = () => {
  const scheme = useColorScheme();
  const [btnText, setBtnText] = useState('Mint');

  return (
    <Formik
      initialValues={{name: '', description: '', url: '', amount: ''}}
      validationSchema={CreateTokenSchema}
      onSubmit={(values, {resetForm}) => {
        console.log(values);
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
              mode="contained"
              style={[formStyle.formBtn, {marginBottom: 10}]}
              labelStyle={formStyle.formBtnLabel}
              onPress={handleSubmit}>
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
        </ImageBackground>
      )}
    </Formik>
  );
};

export default CreateTokenScreen;
