import { CameraType } from 'expo-camera/build/legacy/Camera.types';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';

const loadLocalModel = async () => {
  try {
    const modelJsonAsset = Asset.fromModule(require('../../assets/model/model.json'));
    const modelWeightsAsset = Asset.fromModule(require('../../assets/model/group1-shard1of1.bin'));
    await modelJsonAsset.downloadAsync();  // Ensure the file is downloaded
    await modelWeightsAsset.downloadAsync();  // Ensure the file is downloaded

    const modelJsonUri = modelJsonAsset.uri;  // The HTTP path to the file
    const modelWeightsUri = modelWeightsAsset.uri;  // The HTTP path to the file

    // Load the model with loadGraphModel using the path
    const model = await tf.loadGraphModel(modelJsonUri);
    console.log('Model successfully loaded!');
    return model;
  } catch (error) {
    console.error('Error loading the model:', error);
  }
};

// Ensure Camera component is correctly typed and used
const TensorCamera = cameraWithTensors(Camera as any);

const Explore = () => {
  const cameraRef = useRef<any>(null);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      await tf.ready();
      const loadedModel = await loadLocalModel();
      if (loadedModel) {
        setModel(loadedModel);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  const handleCameraStream = (images: any) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
  
      if (nextImageTensor && model) {
        const processedImage = preprocessImage(nextImageTensor);  // Bild vorverarbeiten
        const prediction = await model.predict(processedImage) as tf.Tensor;
        console.log('Vorhersage:', prediction);
      }
  
      requestAnimationFrame(loop);
    };
  
    loop();
  };

  const preprocessImage = (imageTensor: tf.Tensor) => {
    // Implement your image preprocessing logic here
    return imageTensor;
  };
  

  return (
    <View style={{ flex: 1 }}>
      {model ? (
        <TensorCamera
          style={styles.camera}
          type={CameraType.back}
          cameraTextureHeight={1920}
          cameraTextureWidth={1080}
          resizeHeight={224}
          resizeWidth={224}
          resizeDepth={3}
          onReady={handleCameraStream}
          autorender={true} useCustomShadersToResize={false}        />
      ) : (
        <View><Text>Loading model...</Text></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});

export default Explore;