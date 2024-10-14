import { Image, StyleSheet, Platform } from 'react-native';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1eb4e6', dark: '#1eb4e6' }}
      headerImage={
        <Image
          source={require('@/assets/images/Syntax-logo-white-horiz.png')}
          style={styles.syntaxLogo}
          resizeMode='contain'
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Erlebe Syntax Visual Inspection</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Überblick</ThemedText>
        <ThemedText>
        Erleben Sie die innovativen Möglichkeiten von Visual Inspection mit unserer Webanwendung. Diese Demo zeigt die Leistungsfähigkeit eines Machine-Learning-Modells, das speziell darauf trainiert wurde, durch einen Filzstift simulierte "Kratzer" zu erkennen.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Funktionsweise</ThemedText>
        <ThemedText>
        Verwenden Sie den Filzstift, um beliebig "Kratzer" auf dem Fahrzeug zu simulieren. Gehen Sie anschließend zum <ThemedText type="defaultSemiBold">Demo-Tab</ThemedText> und positionieren Sie das Fahrzeug vor der Kamera, um die Objekterkennung in Aktion zu erleben.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Weitere Informationen</ThemedText>
        <ThemedText>
        Möchten Sie mehr erfahren? Besuchen Sie unsere <ExternalLink href="https://de.syntax.com/syntax-visual-inspection">
          <ThemedText type="link">Homepage</ThemedText></ExternalLink> für ausführliche Informationen. Falls Sie noch keine unserer Demo-Boxen erhalten haben, füllen Sie bitte das entsprechende Formular aus, um Ihre eigene Box zu bestellen.
        </ThemedText>
      </ThemedView>
      <ThemedText>Probieren Sie die Demo aus und erleben Sie selbst, wie Syntax Ihre Qualitätskontrolle revolutionieren kann!</ThemedText>
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
