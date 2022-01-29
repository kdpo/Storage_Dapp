## Introduction

This is a Decentralized Application for storing ```.txt files``` running on Ethereum blockchain.
The application is composed of two main parts:
- The backend, running on the blockchain with a smart contract in __Solidity__;
- The frontend, made in __React__ and connected to the blockchain.

### Basic Functionalities

* Upload - add new files to the blockchain. 
* Read - retrieve every file information on the blockchain.
* Update - update by replacing the file through re-uploading.
* Delete - delete files.

The system is able to track changes on the file. It is also capable of knowing whether a file has been tampered (unauthorized modification). 

You can clone the repository on your computer and run the project, but you'll need to have some tools installed on your computer.

## Requirements

The following should be installed first:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [truffle](https://www.trufflesuite.com/) - a Solidity framework, made in Node.js, that you can simply install with npm
- [ganache](https://www.trufflesuite.com/ganache) - a local Ethereum blockchain that can be used to test smart contracts
- [metamask](https://metamask.io/) - a crypto wallet that you'll need to configure to interact with the application

Otherwise, you can use [Remix](https://remix.ethereum.org/), an online Solidity IDE, to test smart contracts.

Once all the tools have been installed, you need to set up Metamask, connecting it to one of the automatic generated accounts of Ganache. You'll need to connect Metamask to this __local network__, with one of the Ganache accounts. Import your private key from one of of your Ganache accounts. Once Metamask is correctly configured you can continue with the installation.

## Dependencies and installation

Clone the repository on your computer, then compile and deploy the smart contracts to your local blockchain with this commands:
```
truffle compile
truffle deploy
```

After the smart contracts have been deployed, go to the "client" folder and install the npm dependencies:

```
cd client
npm install
```

Once installed, start the node server with:

```
npm run start
```

```npm``` dependencies:
- [@material-ui/core and @material-ui/icons](https://material-ui.com/)
- [node-sass](https://www.npmjs.com/package/node-sass)
- [react, react-dom and react-scripts](https://reactjs.org/)
- [web3](https://web3js.readthedocs.io/en/v1.3.4/)

### Contracts folder

This folder contains the smart contracts written in Solidity. The "Crud" file is the smart contract on wich the application is based and contains all the CRUD functions.

### Migrations folder

The "migration" folder contains the JavaScript files needed to deploy the contracts to the Ethereum network.

You can run the migration from the console with this command:

```
truffle migrate
```

### Youtube Tutorial

You may watch a [video presentation](https://www.youtube.com/watch?v=sv4zor4wPXc&feature=youtu.be) of the system to learn more about the implementation of the Dapp.
