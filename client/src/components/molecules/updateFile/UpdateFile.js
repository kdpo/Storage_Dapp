import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

import './updateFile.scss'

export default function UpdateFile(props) {
    // Open and close the modal
    const [open, setOpen] = React.useState(false);
    // Id of the selected file
    const [id, setId] = React.useState(null)
    const [file, setFile] = React.useState("");

      // Handles file upload event and updates state
    function handleUpload(event) {
        setFile(event.target.files[0]);
    }

    // Handle click on open modal button
    const handleClickOpen = (e) => {
        // Get the id of the selected file
        let newId = Number.isNaN(parseInt(e.target.id.split("-")[1])) ? parseInt(e.target.parentElement.id.split("-")[1]) : parseInt(e.target.id.split("-")[1]);
        // Set the id
        setId(newId)
        setOpen(true);
    };
    // Handle ckick on close modal button
    const handleClose = () => {
        setOpen(false);
    };

    // Handle onClick on Edit button
    const handleEdit = async () => {
        // file data before edit
        let oldTitle, oldContent;
        props.files.map(file => {
            if(parseInt(file.id) === id) {
                oldTitle = file.title;
                oldContent = file.content;
            }
        })
        
        // Controls to see if the user filled the form fields
        let title = file.name;
        const reader = new FileReader();
        reader.onload = async function(evt) {
            let result = evt.target.result;
            // Update file with the smart contract method 
            await props.contract.methods.update(id, title, result, props.address).send({"from": props.address});
            props.reloadFiles(props.contract);
        };
        reader.readAsText(file);
        
        // Close modal
        setOpen(false)
    }

    return (
        <div>
            <EditIcon onClick={handleClickOpen} id={`edit-${props.id}`} className="edit-icon" />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">UPDATE</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Re-upload to update your file
                </DialogContentText>
                <div id="upload-box">
                    <input type="file" onChange={handleUpload} />
                    <p>File type: {file.type}</p>
                    <p>File size: {file.size} bytes</p>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            <Button onClick={handleEdit} color="primary">
                UPDATE
            </Button>
            </DialogActions>
            </Dialog>
        </div>
        );
}