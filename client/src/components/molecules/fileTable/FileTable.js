
import React, { useState } from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import DeleteFile from '../deleteFile/DeleteFile';
import UpdateFile from '../updateFile/UpdateFile';

import './fileTable.scss'

// Table columns
const columns = [
    { id: 'id', label: 'ID', maxWidth: 30, align: "center" },
    { id: 'title', label: 'File Name', maxWidth: 50, align: "center" },
    { id: 'content', label: 'Content Preview', maxWidth: 100, align: "center" },
    { id: 'owner', label: 'Owner', maxWidth: 20, align: "center" },
    { id: 'timestamp', label: 'Timestamp', maxWidtth: 100, align: "center" },
    { id: 'delete', label: 'Delete', maxWidth: 100, align: "center" },
    { id: 'update', label: 'Update', maxWidth: 100, align: "center" },
    { id: 'note', label: 'Note', maxWidth: 100, align: "center" }
];

export default function FileTable(props) {
    // State variable to set the table page
    const [page, setPage] = useState(0);
    // State variable to set the rows per page
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // Change page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    // Change rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return(
        <Paper className="table-paper">
                <TableContainer className="table-container">
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.files.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            switch(column.id) {
                                                case "delete":
                                                    return(
                                                        <TableCell key={column.id} align={column.align}>
                                                            <DeleteFile contract={props.contract} id={row.id} account={props.account} reloadFiles={props.reloadFiles} />
                                                        </TableCell>
                                                    )
                                                    break;
                                                case "update":
                                                    return(
                                                        <TableCell key={column.id} align={column.align}>
                                                            <UpdateFile id={row.id} reloadFiles={props.reloadFiles} files={props.files} address={props.account} contract={props.contract} />
                                                        </TableCell>
                                                    )
                                                    break;
                                                default:
                                                    return(
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    )
                                                    break;
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={props.files.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    className="table-pagination"
                />
            </Paper>
    )
}