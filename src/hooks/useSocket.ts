import {useEffect, useRef, useState} from 'react';
import dgram from 'react-native-udp';

export enum Status {
  INIT = 'INIT',
  CONNECTED = 'CONNECTED',
  LISTENING = 'LISTENING',
  ERROR = 'ERROR',
}

export type SocketProps = {
  host?: string;
  port?: number;
};

export function useSocket({
  host = 'http://localhost',
  port = 9090,
}: SocketProps) {
  console.log('[useSocket] host', host, 'port', port);
  const [status, setStatus] = useState<Status>(Status.INIT);
  const [error, setError] = useState<Error | undefined>();
  const [data, setData] = useState<any[]>([]);
  const socket = useRef(
    dgram.createSocket({
      reusePort: true,
      type: 'udp4',
      debug: true,
    }),
  ).current;

  useEffect(() => {
    if (!socket || !port) {
      console.warn('[useSocket] socket or port is not defined');
      return;
    }
    // bind socket to the specified port
    socket.bind(port);
    // triggered once connected
    socket.once('connection', () => {
      console.log('[connection] socket is now connected!');
      setStatus(Status.CONNECTED);
    });
    // triggered when a message occurs
    socket.on('message', (...args) => {
      console.log('[message]', ...args);
      setData(prevData => [...prevData, args]);
    });
    // triggered when an error happens
    socket.on('error', (nextError: Error) => {
      console.log('[error]', nextError);
      setError(nextError);
      setStatus(Status.ERROR);
    });
  }, [socket, port]);

  // derived values
  const isConnected = status === Status.CONNECTED;

  // output values
  return {status, data, error, isConnected};
}
