import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import './deleteFile.scss';

export default function DeleteFile(props) {
    // Open and close the modal
    const [open, setOpen] = React.useState(false);
    // Id of the selected file
    const [id, setId] = React.useState(null)

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

    // Handle onClick on Delete button
    const handleDelete = async () => {
        await props.contract.methods.destroy(parseInt(id)).send({ "from": props.account });

        // Call function to reload file list
        props.reloadFiles(props.contract);

        // Close modal
        setOpen(false)
    }

    return (
        <div>
            <DeleteForeverIcon onClick={handleClickOpen} id={`delete-${props.id}`} className="delete-icon" color="secondary" />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to delete this file?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        DELETE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}