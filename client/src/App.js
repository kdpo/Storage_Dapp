
import React, { useState, useEffect } from "react";
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import CrudContract from "./contracts/Crud.json";
import getWeb3 from "./utils/getWeb3";
import getContractInstance from "./utils/getContractInstance";
import AppTitle from './components/atoms/appTitle/AppTitle'
import UploadFile from './components/molecules/uploadFile/UploadFile';
import FileTable from './components/molecules/fileTable/FileTable';


export default function App(props) {
    // To Save the deployed smart contract in the state
    const [contract, setContract] = useState(null);
    // The list of the movies retrieved calling the contract
    const [files, setFiles] = useState([]);
    // To Save the Metamask account address in the state
    const [account, setAccount] = useState("");

    // Fetch data when app starts
    useEffect(() => {
        (async () => {
            // Web3 instance to interact with the blockchain
            const web3 = await getWeb3();
            // Retrieve the Eth accounts and saving the first account in the state
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            console.log(accounts[0]);
            // Retrieve the contract instance
            const instance = await getContractInstance(web3, CrudContract);
            // Save the contract instance in the state
            setContract(instance)
            // Fetch movies
            reloadFiles(instance)
        })();
    }, []);

    // Function to fetch movies
    async function reloadFiles(con) {
        let filelist = await con.methods.allFiles().call()
            .then(data => {
                let counter = data[0].length;
                console.log(data);
                let filelist = [];
                for (let i = 0; i < counter; i++) {
                    let time = moment.unix(data[3][i]);
                    //console.log(data[5][i]);
                    let note = data[5][i];
                    let s_note = "";
                    
                    if (note == 1) {
                        s_note = "Newly uploaded file";
                    } else if (note == 2) {
                        s_note = "File updated"
                    } else {
                        s_note = "Unauthorized modification: File has been tampered!"
                    }
                    if (data[0][i] !== "0")
                        filelist.push({ "id": data[0][i], "title": data[1][i], "content":data[2][i],
                                    "timestamp": time.toString(), "owner":data[4][i], "note": s_note})
                }
                return filelist;
            });
        setFiles(filelist);
    }

    return (
        <>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">CMSC 191 Ethereum Prototype</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <small><a className="nav-link" href="#">Your Account: {account}</a></small>
            </li>
          </ul>
        </nav>
        <br/><br/>
        <div className="container">
            <AppTitle />
            <div className="add-file-button">
                <UploadFile account={account} contract={contract} reloadFiles={reloadFiles} />
            </div>
            <FileTable account={account} contract={contract} files={files} reloadFiles={reloadFiles} />
        </div>
        </>
    )
}