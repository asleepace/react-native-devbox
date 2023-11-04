import {useEffect, useState} from 'react';
import dgram from 'react-native-udp';
import { decode } from '../utils/decoder';

export enum Status {
  INIT = 'INIT',
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
  const [status, setStatus] = useState<Status>(Status.INIT);
  const [error, setError] = useState<Error | undefined>();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    console.log('[useSocket] creating connection!');
    // create the socket instance
    const socket = dgram.createSocket({
      reusePort: true,
      type: 'udp4',
      debug: true,
    });

    // bind socket to the specified port
    socket.bind(port);

    socket.once('listening', () => {
      console.log('[listening] socket is now listening!');
      setStatus(Status.LISTENING);
      // send a message to the same host to hole punch and allow
      // incoming connections from anywhere.
      socket.send(
        'holePunch',
        undefined,
        undefined,
        port,
        host,
        (sendError: Error | undefined) => {
          if (sendError) {
            setError(error);
            setStatus(Status.ERROR);
          }
        },
      );
    });

    // triggered when a message occurs
    socket.on('message', (message, info) => {
      const string = decode(message);
      console.log('[message] str:', string);
      setData(prevData => [...prevData, string]);
    });
    // triggered when an error happens
    socket.on('error', (nextError: Error) => {
      console.log('[error]', nextError);
      setError(nextError);
      setStatus(Status.ERROR);
    });

    // cleanup the socket
    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // derived values
  const isConnected = status === Status.LISTENING;

  // output values
  return {status, data, error, isConnected};
}
