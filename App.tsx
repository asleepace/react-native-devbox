import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
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
      {socket.isConnected ? (
        <Text>{'connected!'}</Text>
      ) : (
        <Text>{'not connected!'}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
  },
});

export default App;
