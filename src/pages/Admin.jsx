import React from 'react'
import Header from '../Components/Global/Header';
import AdminList from '../Components/Admin/AdminList';
import Footer from '../Components/Global/Footer';
import { useAppContext } from '../context/AppContext'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => {
    const appContext = useAppContext()
    const navigate = useNavigate();

    useEffect(() => {
        let wallet = localStorage.getItem("setFullAddress");
        if (!wallet || (Object.keys(appContext.user).length !== 0 && !appContext.user.isAdmin)) {
            navigate("/home"); return;
        }
    }, [appContext.user.isAdmin])
    return (
        <>
            <Header />
            <AdminList />
            <Footer />
        </>
    )
}

export default Admin