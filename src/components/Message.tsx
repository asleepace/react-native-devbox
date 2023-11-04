import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export type MessageProps = {
  index: number;
  data: any;
};

export function Message({data, index}: MessageProps) {
  const memoizedString = React.useMemo(() => {
    if (typeof data === 'string') {
      return data;
    }
    if (typeof data === 'number') {
      return String(data);
    }
    if (Array.isArray(data)) {
      return data.join(' ');
    }
    if (typeof data === 'object') {
      return JSON.stringify(data);
    } else {
      return String(data);
    }
  }, [data]);

  console.log('memoizedString', memoizedString);

  const tint = index % 2 === 0 ? styles.backgroundTint : undefined;

  return (
    <View style={[styles.background, tint]}>
      <Text style={styles.message}>{memoizedString}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    fontFamily: 'Roboto',
    letterSpacing: 1.2,
    fontWeight: '300',
    fontSize: 22,
    color: '#aaa',
  },
  backgroundTint: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  background: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
