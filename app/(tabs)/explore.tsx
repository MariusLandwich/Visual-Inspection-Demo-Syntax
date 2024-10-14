import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { Asset } from 'expo-asset';

import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function TabTwoScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const loadLocalModel = async () => {
    try {
      // Die model.json Datei aus dem Assets-Ordner laden
      const modelJsonAsset = Asset.fromModule(require('./assets/model/model.json'));
      await modelJsonAsset.downloadAsync();  // Sicherstellen, dass die Datei heruntergeladen ist
  
      const modelJsonUri = modelJsonAsset.uri;  // Der HTTP-Pfad zur Datei
  
      // Lade das Modell mit loadGraphModel unter Angabe des Pfades
      const model = await tf.loadGraphModel(modelJsonUri);
      console.log('Modell erfolgreich geladen!');
      return model;
    } catch (error) {
      console.error('Fehler beim Laden des Modells:', error);
    }
  };

  return (
    <View style={styles.cameraContainer}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
        </View>
      </CameraView>
    </View>
  );

}
const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraMessage: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});









