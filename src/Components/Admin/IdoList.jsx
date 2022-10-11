import React from "react";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

// import firebase
import {
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { projectCollectionRef } from "../../lib/firebase.collections";
import { toast } from "react-toastify";
import { useConfirmDialog } from "react-mui-confirm";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CircularProgress from "@mui/material/CircularProgress";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: "#f7c200",
    fontWeight: "600",
    fontSize: "16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#fff",
  },
}));
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#fff !important",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const IdoList = () => {
  const navigate = useNavigate();

  const appContext = useAppContext();
  const [idos, setIdos] = useState([]);
  const [openDlg, setOpenDlg] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [curDocId, setCurDocId] = useState("");

  const [pName, setName] = useState("");
  const [pAddress, setAddress] = useState("");
  const [pTokenAddr, setTokenAddress] = useState("");

  const confirm = useConfirmDialog();

  useEffect(() => {
    if (appContext.user.full_addr) {
      getIdos();
    }
  }, [appContext.user.full_addr]);

  const getIdos = async () => {
    const q = query(projectCollectionRef);
    const querySnapshot = await getDocs(q);
    const res = querySnapshot.docs.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    setIdos(res);
  };

  const removeIdo = async (id) => {
    setCurDocId(id);
    setLoading(true);
    try {
      await deleteDoc(doc(projectCollectionRef, id));
      await getIdos();
      toast.success("IDO project deleted!");
      setLoading(false);
    } catch (error) {
      console.log("remove error", error);
      toast.error("remove error");
      setLoading(false);
    }
  };
  const modifyIdo = async () => {
    setLoading(true);
    if (curDocId == "") {
      toast.error("something error!");
      setLoading(false);
      return;
    }
    if (pName == "" || pAddress == "" || pTokenAddr == "") {
      setLoading(false);
      toast.error("input required fields!");
      return;
    }
    try {
      await updateDoc(doc(projectCollectionRef, curDocId), {
        name: pName,
        address: pAddress,
        token_address: pTokenAddr,
      });
      await getIdos();
      toast.success("IDO project updated!");
      setLoading(false);
      setOpenDlg(false);
    } catch (error) {
      console.log("update error", error);
      toast.error("update error");
      setLoading(false);
      setOpenDlg(false);
    }
  };

  return (
    <div className="container">
      <Box
        sx={{
          border: "1px solid #1d3b94",
          borderRadius: "10px",
          marginTop: "40px",
          backgroundColor: "#090e4e !important",
          padding: "50px",
          mb: "100px",
        }}
      >
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => navigate("/create_launchpad")}
        >
          Add New IDO
        </Button>
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "inherit !important" }}
        >
          <Table
            sx={{ minWidth: 650, color: "#fff" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Project Name</StyledTableCell>
                <StyledTableCell align="center">
                  Contract Address
                </StyledTableCell>
                <StyledTableCell align="center">Token Address</StyledTableCell>
                <StyledTableCell align="center">*</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {idos.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.data.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.data.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.data.token_address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {curDocId == row.id && isLoading && (
                      <CircularProgress color="inherit" size={20} />
                    )}
                    {(curDocId != row.id || !isLoading) && (
                      <>
                        <BorderColorIcon
                          sx={{ cursor: "pointer", mr: "20px" }}
                          onClick={() => {
                            setOpenDlg(true);
                            setCurDocId(row.id);
                          }}
                        />
                        <DeleteIcon
                          onClick={() =>
                            confirm({
                              title: "Are you sure you want to remove item?",
                              onConfirm: () => removeIdo(row.id),
                            })
                          }
                          sx={{ cursor: "pointer" }}
                        />
                      </>
                    )}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledDialog open={openDlg} onClose={() => setOpenDlg(false)}>
          <DialogTitle>Update IDO Project</DialogTitle>
          <DialogContent>
            <DialogContentText>please input fields</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Project Name"
              type="text"
              value={pName}
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Contract Address"
              type="text"
              value={pAddress}
              fullWidth
              variant="standard"
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Token Address"
              type="text"
              value={pTokenAddr}
              fullWidth
              variant="standard"
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDlg(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={modifyIdo}
              disabled={isLoading}
            >
              {isLoading && (
                <CircularProgress
                  color="inherit"
                  sx={{ mr: "10px" }}
                  size={20}
                />
              )}
              Update
            </Button>
          </DialogActions>
        </StyledDialog>
      </Box>
    </div>
  );
};

export default IdoList;
