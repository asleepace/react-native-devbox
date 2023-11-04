import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Message} from './Message';

export type MessageContainerProps = {
  messages: any[];
};

export function MessageContainer({messages}: MessageContainerProps) {
  console.log('messages', messages)
  return (
    <View style={styles.container}>
      {messages.map((data, index) => {
        console.log('rendering:', data)
        return <Message key={index} data={data} index={index} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    flex: 1,
  },
});
