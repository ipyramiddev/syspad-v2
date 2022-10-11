import React from 'react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext'
import { useLocation, useNavigate } from "react-router-dom";

// import firebase
import { query, where, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { projectCollectionRef } from '../../lib/firebase.collections'
import { toast } from 'react-toastify';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.common.black,
        color: '#f7c200',
        fontWeight: '600',
        fontSize: '16px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: '#fff',
    },
}));
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#fff !important'
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const IdoList = () => {
    const navigate = useNavigate();

    const appContext = useAppContext()
    const [idos, setIdos] = useState([]);
    const [openDlg, setOpenDlg] = useState(false);
    const [username, setUsername] = useState('');
    const [wallet, setWallet] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [curDocId, setCurDocId] = useState('');

    useEffect(() => {
        if (appContext.user.full_addr) {
            getIdos();
        }
    }, [appContext.user.full_addr])

    const getIdos = async () => {
        const q = query(projectCollectionRef)
        const querySnapshot = await getDocs(q)
        const res = querySnapshot.docs.map(doc => ({
            data: doc.data(),
            id: doc.id
        }));
        setIdos(res);
    }

    const removeIdo = async (id) => {
        setCurDocId(id)
        setLoading(true)
        await deleteDoc(doc(projectCollectionRef, id));
        await getIdos()
        toast.success("IDO project deleted success!")
        setLoading(false)
    }

    return (
        <div className="container">
            <Box sx={{
                border: '1px solid #1d3b94',
                borderRadius: '10px',
                marginTop: '40px',
                backgroundColor: '#090e4e !important',
                padding: '50px',
                mb: '100px'
            }}>
                <Button variant="contained" endIcon={<AddIcon />} onClick={() => navigate('/create_launchpad')}>
                    Add New IDO
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, color: '#fff' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Project Name</StyledTableCell>
                                <StyledTableCell align="center">Contract Address</StyledTableCell>
                                <StyledTableCell align="center">Token Address</StyledTableCell>
                                <StyledTableCell align="center">*</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {idos.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.data.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.data.address}</StyledTableCell>
                                    <StyledTableCell align="center">{row.data.token_address}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {
                                            curDocId == row.id && isLoading &&
                                            <CircularProgress color="inherit" size={20} />
                                        }
                                        {
                                            (curDocId != row.id || !isLoading) &&
                                            <DeleteIcon onClick={() => removeIdo(row.id)} sx={{ cursor: 'pointer' }} />
                                        }
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}

export default IdoList