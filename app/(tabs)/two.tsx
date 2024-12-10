import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text, ScrollView } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import Slider from '@react-native-community/slider';

// Define types for nodes and edges
interface Node {
  id: number;
  label: string;
  temp: number;
  x: number;
  y: number;
}

interface Edge {
  from: number;
  to: number;
}

// Define city data with latitude and longitude
const cities = [
  { name: 'Los Angeles', lat: 33.2202, lon: -120.5437 },
  { name: 'San Francisco', lat: 36.9749, lon: -122.4194 },
  { name: 'San Diego', lat: 31.8157, lon: -119.1611 },
  { name: 'Sacramento', lat: 38.5816, lon: -121.4944 },
  { name: 'Fresno', lat: 36.7378, lon: -119.7871 },
];

// Map latitude/longitude to coordinates (custom mapping for California)
const mapLatLonToXY = (lat: number, lon: number, width: number, height: number) => {
  // Normalized bounds for California (lat: 32-42, lon: -124 to -114)
  const latMin = 32, latMax = 42, lonMin = -124, lonMax = -114;
  const x = ((lon - lonMin) / (lonMax - lonMin)) * width;
  const y = ((latMax - lat) / (latMax - latMin)) * height;
  return { x, y };
};

// Create edges based on temperature similarity
const createEdges = (nodes: Node[], threshold: number): Edge[] => {
  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.abs(nodes[i].temp - nodes[j].temp) < threshold) {
        edges.push({ from: i, to: j });
      }
    }
  }
  return edges;
};

export default function TabTwoScreen() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [tempRange, setTempRange] = useState({ min: 15, max: 30 }); // Temperature range
  const [threshold, setThreshold] = useState(5); // Edge threshold
  const [showText, setShowText] = useState(false); // State to control when to show the text

  useEffect(() => {
    const updateGraph = () => {
      const mapWidth = 400; // Width of the SVG map
      const mapHeight = 400; // Height of the SVG map

      // Simulate updated nodes with positions based on lat/lon
      const updatedNodes = cities.map((city, index) => {
        const { x, y } = mapLatLonToXY(city.lat, city.lon, mapWidth, mapHeight);
        const temp = Math.floor(Math.random() * (tempRange.max - tempRange.min + 1)) + tempRange.min;
        return {
          id: index,
          label: `${city.name} - ${temp}°C`,
          temp,
          x,
          y,
        };
      });

      const updatedEdges = createEdges(updatedNodes, threshold);
      setNodes(updatedNodes);
      setEdges(updatedEdges);
    };

    // Update the graph every 2 seconds
    const intervalId = setInterval(updateGraph, 2000);
    setShowText(true); // Show the explanation text at the end
    return () => clearInterval(intervalId);
  }, [tempRange, threshold]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/california-map.png')} // Correct relative path
          style={styles.mapBackground}
        >
          <Svg height={450} width={450}>
            {/* Draw edges */}
            {edges.map((edge, index) => {
              const fromNode = nodes[edge.from];
              const toNode = nodes[edge.to];
              return (
                <Line
                  key={index}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="black"
                  strokeWidth="2"
                />
              );
            })}

            {/* Draw nodes */}
            {nodes.map((node, index) => (
              <React.Fragment key={index}>
                <Circle cx={node.x} cy={node.y} r="10" fill="blue" />
                <SvgText
                  x={node.x}
                  y={node.y - 15}
                  fontSize="10"
                  fill="black"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {node.label}
                </SvgText>
              </React.Fragment>
            ))}
          </Svg>
        </ImageBackground>

        {/* Controls */}
        <View style={styles.controls}>
          <Text>Temperature Range:</Text>
          <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={10}
            maximumValue={40}
            value={tempRange.max}
            onValueChange={(value) => setTempRange({ ...tempRange, max: Math.floor(value) })}
            step={1}
          />
          <Text>Max Temp: {tempRange.max}°C</Text>

          <Text>Edge Threshold (Temperature Difference):</Text>
          <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={1}
            maximumValue={10}
            value={threshold}
            onValueChange={(value) => setThreshold(Math.floor(value))}
            step={1}
          />
          <Text>Threshold: {threshold}°C</Text>
        </View>

        {/* Explanation Text */}
        {showText && (
          <Text style={styles.explanationText}>
            The temperature range and edge threshold help us simulate the changing climate in California. By adjusting the temperature range, we can visualize how different cities may experience varying temperatures due to climate change. The edge threshold determines which cities are considered to have similar climates, based on temperature differences. A lower threshold creates more precise groupings of cities, while a higher threshold connects cities with broader temperature ranges, representing larger climate zones.
            <br /><br />
            This model uses **discrete mathematics**, specifically **graph theory**, to represent the cities as nodes and their temperature similarities as edges. The edge threshold controls the connectivity between cities, showing us how regions with similar climates could be interconnected. The graph evolves as the temperature ranges change, illustrating the shifting climate patterns across the state.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapBackground: {
    width: 350,
    height: 500,
    resizeMode: 'cover',
  },
  controls: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explanationText: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'lightyellow',
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
  },
});
