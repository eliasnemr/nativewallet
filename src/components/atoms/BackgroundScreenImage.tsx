import React, {FC} from 'react';
import {ImageBackground, useColorScheme} from 'react-native';

const BackgroundScreenImage: FC = () => {
  const scheme = useColorScheme();

  return (
    <ImageBackground
      source={
        scheme === 'dark'
          ? require('../../assets/images/DM.jpg')
          : require('../../assets/images/LM.jpg')
      }
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: 'center',
      }}></ImageBackground>
  );
};

export default BackgroundScreenImage;
