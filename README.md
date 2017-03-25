# Chapel Online

This is a GSoC 2017 demo for Chapel. It's a Web service that can compile Chapel on server remotely.

## Prerequisites

- Node.js

v6.10.1 is OK. It is recommended to install Node.js through [nvm](https://github.com/creationix/nvm)
- Chapel environment

Follow the instruction [here](http://chapel.cray.com/docs/latest/usingchapel/QUICKSTART.html)

## Installing

```bash
git clone https://github.com/flyingpot/chapel_online
cd chapel_online
npm install
npm start
```
## Test
The local server is running and type the following url:
```
localhost:3000
```
## Deployment
If you want to make it listen to port 80.Do the following:
```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000
sudo iptables-save
```
