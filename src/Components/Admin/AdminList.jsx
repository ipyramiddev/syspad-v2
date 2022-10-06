import React from 'react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext'
// import firebase
import { query, where, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { adminCollectionRef } from '../../lib/firebase.collections'
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

const AdminList = () => {
    const appContext = useAppContext()
    const [admins, setAdmins] = useState([]);
    const [openDlg, setOpenDlg] = useState(false);
    const [username, setUsername] = useState('');
    const [wallet, setWallet] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [curDocId, setCurDocId] = useState('');

    useEffect(() => {
        if (appContext.user.full_addr) {
            getAdmin();
        }
    }, [appContext.user.full_addr])

    const getAdmin = async () => {
        const q = query(adminCollectionRef)
        const querySnapshot = await getDocs(q)
        const res = querySnapshot.docs.map(doc => ({
            data: doc.data(),
            id: doc.id
        }));
        setAdmins(res);
    }

    const removeAdmin = async (id) => {
        console.log("removeAdmin", id)
        setCurDocId(id)
        setLoading(true)
        await deleteDoc(doc(adminCollectionRef, id));
        await getAdmin()
        toast.success("Admin deleted success!")
        setLoading(false)
    }
    const addAdmin = async () => {
        setLoading(true);
        if (username == '' || wallet == '') {
            toast.error("please enter your username and wallet address!")
            setLoading(false);
            return;
        }
        const q = query(adminCollectionRef, where("wallet_address", "==", wallet))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.docs.length > 0) {
            toast.error("Already Exisit!")
            setLoading(false);
            return;
        }

        await setDoc(doc(adminCollectionRef), {
            username: username,
            wallet_address: wallet,
        });
        await getAdmin()
        toast.success("Add admin success")
        setLoading(false);
        setOpenDlg(false)
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
                <Button variant="contained" endIcon={<AddIcon />} onClick={() => setOpenDlg(true)}>
                    Add Admin
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, color: '#fff' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell align="center">Wallet Address</StyledTableCell>
                                <StyledTableCell align="center">*</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {admins.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.data.username}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.data.wallet_address}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {
                                            curDocId == row.id && isLoading &&
                                            <CircularProgress color="inherit" size={20} />
                                        }
                                        {
                                            (curDocId != row.id || !isLoading) &&
                                            <DeleteIcon onClick={() => removeAdmin(row.id)} sx={{ cursor: 'pointer' }} />
                                        }
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <StyledDialog open={openDlg} onClose={() => setOpenDlg(false)}>
                    <DialogTitle>Add</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            please enter your username and wallet address here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Username"
                            type="text"
                            value={username}
                            fullWidth
                            variant="standard"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Wallet Address"
                            type="text"
                            value={wallet}
                            fullWidth
                            variant="standard"
                            onChange={(e) => setWallet(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDlg(false)}>Cancel</Button>
                        <Button variant="contained" onClick={addAdmin} disabled={isLoading}>
                            {isLoading && <CircularProgress color="inherit" sx={{ mr: '10px' }} size={20} />}
                            Add
                        </Button>
                    </DialogActions>
                </StyledDialog>
            </Box>
        </div>
    )
}

export default AdminList