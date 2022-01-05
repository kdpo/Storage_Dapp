## Introduction

This is an example of simple CRUD DApp, a decentralized application running on Ethereum blockchain.
The application is composed of two main parts:
- The backend, running on the blockchain with a smart contract (in Solidity);
- The frontend, made in React and connected to the blockchain to allow CRUD operations.

You can clone the repository on your computer and run the project, but you'll need to have some tools installed on your computer.

## Requirements

As mentioned above, you need to satisfy the requirements to run this application. 
You need to have installed on your computer:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [truffle](https://www.trufflesuite.com/) --> a Solidity framework, made in Node.js, that you can simply install with npm
- [ganache](https://www.trufflesuite.com/ganache) --> a local Ethereum blockchain that can be used to test smart contracts
- [metamask](https://metamask.io/) --> a crypto wallet that you'll need to configure to interact with the application

Otherwise, you can use [Remix](https://remix.ethereum.org/), an online Solidity IDE, to test smart contracts.

Once all the tools have been installed, you need to set up Metamask, connecting it to one of the automatic generated accounts of Ganache.

You'll need to connect Metamask to this __local network__, with one of the Ganache accounts. Once Metamask is correctly configured you can continue with the installation.

## Dependencies and installation

You need to clone the repository on your computer, than compile and deploy the smart contracts to your local blockchain with this commands:
```
truffle compile
truffle deploy
```

Now the smart contracts are deployed, you have to go to the "client" folder and install the npm dependencies:

```
cd client
npm install
```

Once installed the dependecies, all is ready and you only need to start the node server with:

```
npm run start
```

Let's see the npm dependencies:
- [@material-ui/core and @material-ui/icons](https://material-ui.com/)
- [node-sass](https://www.npmjs.com/package/node-sass)
- [react, react-dom and react-scripts](https://reactjs.org/)
- [web3](https://web3js.readthedocs.io/en/v1.3.4/) --> a collaction of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.

### Contracts folder

This folder contains the smart contracts written in Solidity. The "Crud" file is the smart contract on wich the application is based and contains all the CRUD functions.

### Migrations folder

The "migration" folder contains the JavaScript files needed to deploy the contracts to the Ethereum network.

You can run the migration from the console with this command:

```
truffle migrate
```
