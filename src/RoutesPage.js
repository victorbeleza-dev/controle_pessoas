import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import UserFormPage from "./pages/UserFormPage";
import HomePage from "./pages/HomePage";
import TabHeader from "./components/TabHeader";

const RoutesPage = () => {
    return (
        <BrowserRouter>
            <TabHeader />

            <Routes>
            
                <Route element={<HomePage />} path="/" />
                <Route element={<UserFormPage />} path="/register" />
                <Route element={<UserFormPage />} path="/edit/:id" />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesPage;