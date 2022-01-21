import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './uploadFile.scss'


export default function UploadFile(props) {
    // Open and close the modal
    const [open, setOpen] = React.useState(false);
    // Handle click on open modal button

    const [file, setFile] = React.useState("");

      // Handles file upload event and updates state
      function handleUpload(event) {
        setFile(event.target.files[0]);

        // Add code here to upload file to server
        // ...
      }

    const handleClickOpen = () => {
        setOpen(true);
    };
    // Handle ckick on close modal button
    const handleClose = () => {
        setOpen(false);
    };
    
    // Handle onClick on Create button
    const handleCreate = async () => {
        // Extract data from form fields
        let title = file.name;
        const reader = new FileReader();
        reader.onload = async function(evt) {
            let result = evt.target.result;
            console.log(result)

            if(result != "") {
            // Create new file with the smart contract method
            await props.contract.methods.create(title, result, props.account).send({"from": props.account});
    
            // Call function to reload file list
            props.reloadFiles(props.contract);
    
            // Close modal
            setOpen(false)
        } else {
            // Aler user
            alert(`Your file is empty! You need to insert something.`)
        }
        };
        reader.readAsText(file);

    }

    return (
        <div>
            <Button variant="outlined" color="primary" className="add-button" onClick={handleClickOpen}>
                Upload file
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Upload File</DialogTitle>
                <DialogContent>
                {/* <DialogContentText>
                    Upload a new file
                </DialogContentText> */}
                    <div id="upload-box">
                      <input className="mb-2" type="file" onChange={handleUpload} /><br/>
                      <span>File name: {file.name}</span><br/>
                      <span>File type: {file.type}</span><br/>
                      <span>File size: {file.size} bytes</span>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color="primary">
                        ADD
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}