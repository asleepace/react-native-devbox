import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {MessageContainer} from './src/components/MessageContainer';
import {useSocket} from './src/hooks/useSocket';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const socket = useSocket({port: 9090});

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        {socket.isConnected ? (
          <Text style={styles.text}>{'connected!'}</Text>
        ) : (
          <Text style={styles.text}>{'not connected!'}</Text>
        )}
      </View>
      <MessageContainer messages={socket.data} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 8,
  },
  header: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  messages: {
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
  },
});

export default App;
