# React Native DevBox

The default port this project listens on is `9090` and can be changed from within the application.

## Quick Start

```bash
# install dependencies
yarn install
npx pod-install

# start the application
yarn start
```

## Sending UDP Packets

Quickly test if the UDP packets are working by sending a packet to the local server:

```bash
echo -n "hello" | nc -4u -w0 localhost 9090
```