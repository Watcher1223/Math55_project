import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';

export default function TabOneScreen() {
  return (
    <ImageBackground source={require('../../assets/images/cover.png')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.container}>
            {/* Heading */}
            <Text style={styles.title}>Climate Change Analysis in California</Text>

            {/* Description */}
            <Text style={styles.description}>
              Using graph theory to visualize and analyze climate change data.
              This animation represents climate impact over time.
            </Text>

            {/* Explanation of Graph Theory Usage */}
            <View style={styles.explanationContainer}>
              <Text style={styles.explanation}>
                In California, graph theory can be applied to understand climate
                change trends by representing various climate factors as nodes
                and the relationships between them as edges. For example:
              </Text>
              <Text style={styles.explanation}>
                1. **Nodes**: Climate factors such as temperature, precipitation,
                air quality, and sea levels.
              </Text>
              <Text style={styles.explanation}>
                2. **Edges**: The relationships between these factors, like how
                rising temperatures affect rainfall patterns or how droughts are
                linked to increased wildfires.
              </Text>
              <Text style={styles.explanation}>
                By visualizing these connections, we can detect patterns,
                understand the dynamics between factors, and predict how certain
                variables might change under different conditions.
              </Text>
              <Text style={styles.explanation}>
                Graph-based models help make complex data more understandable,
                allowing researchers, policymakers, and the public to make
                better-informed decisions to combat climate change.
              </Text>
            </View>

            {/* Graphical Animation */}
            <View style={styles.animationContainer}>
              <Svg height="200" width="100%">
                {/* Example of a simple animation using SVG */}
                <Line
                  x1="0"
                  y1="100"
                  x2="100"
                  y2="100"
                  stroke="blue"
                  strokeWidth="2"
                />
                <Circle cx="50" cy="50" r="20" stroke="green" strokeWidth="2" fill="green" />
              </Svg>
            </View>

            {/* Separator */}
            <View style={styles.separator} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContainer: {
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', // To contrast with the background
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white', // To contrast with the background
  },
  explanationContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  explanation: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 10,
    color: 'white', // To contrast with the background
  },
  animationContainer: {
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});