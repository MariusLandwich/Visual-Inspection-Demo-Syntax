import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Syntax-logo-white-horiz.png')}
          style={styles.syntaxLogo}
          resizeMode='contain'
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Wilkommen zu unserer Syntax Visual Inspection Demo! <HelloWave /></ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Überblick</ThemedText>
        <ThemedText>
        Diese Webapp bieten einen Vorgeschmack auf die vielfältigen Möglichkeiten, die Visual Inspection bietet. Dabei wird ein Machine-Learning-Modell genutzt, das darauf trainiert wurde, durch einen Filzstift simulierte "Kratzer" zu erkennen.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Funktionsweise</ThemedText>
        <ThemedText>
        Nutzen Sie den Filzstift, um beliebig "Kratzer" auf dem Fahrzeug zu platzieren. Wählen Sie dann den <ThemedText type="defaultSemiBold">Demo</ThemedText> Tab aus und platzieren Sie das Fahrzeug vor der Kamera für die Objekterkennung.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Weitere Infos</ThemedText>
        <ThemedText>
        Wenn Sie mehr erfahren möchten, schauen Sie unbedingt auf unserer <ExternalLink href="https://de.syntax.com/syntax-visual-inspection">
          <ThemedText type="link">Homepage</ThemedText> vorbei. Falls Sie noch keine unserer Demo-Boxen erhalten haben, können Sie hier das entsprechende Formular ausfüllen und sich eine zusenden lassen.
        </ExternalLink>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  syntaxLogo: {
    height: 100,
    width: 300,
    bottom: -75,
    left: 10,
    position: 'relative',
  },
});
