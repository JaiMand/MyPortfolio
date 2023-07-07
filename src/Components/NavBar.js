import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from 'react';
import './navbar.css';

import Home from "./HomePage";

import About from "./About/SellerProperty";
import Blog from "./Seller/AddSellerForm";
import Imagine from "./Seller/ManageSellerProperty";
import Stories from "./Seller/AddSellerPropertyForm";
import Physics from "./Buyer/BuyerProperty";
import Shop from "./Buyer/AddBuyerForm";
import ContactUs from "./Buyer/ManageBuyerBookings";

function NavBar() {

    return (
        <BrowserRouter>
        <nav class="navbar navbar-inverse navbar-expand-sm navbar-dark" id="topNavBar">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <ul class="collapse navbar-collapse navbar-nav nav" id="collapsibleNavbar">
                        <li className="link-container">
                            <Link className="nav-link link" to="/">Home.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Seller/SellerProperty">About.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Buyer/BuyerProperty">Blog.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Property/PropertySearch">Imagine.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Property/PropertySearch">Stories.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Property/PropertySearch">Physics.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Property/PropertySearch">Shop.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Property/PropertySearch">Contact Us.</Link>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li className="link-container"><Link className="glyphicon glyphicon-user nav-link link" to="/HomeProperty"><span></span>Search.</Link></li>
                    </ul>
                </div>
            </nav>

            <Routes>
                <Route path="/HomeProperty" element={<Home />} />
                <Route path="/" element={<Home />} />

                <Route path="/Seller/SellerProperty" element={<About />} />
                <Route path="/Seller/AddSellerForm" element={<Blog />} />
                <Route path="/Seller/ManageSellerProperty/:sellerId/:firstName/:surname" element={<Imagine />} />
                <Route path="/Seller/AddSellerPropertyform/:sellerId/:firstName/:surname" element={<Stories />} />
                <Route path="/Buyer/BuyerProperty" element={<Physics />} />
                <Route path="/Buyer/AddBuyerForm" element={<Shop />} />
                <Route path="/Buyer/ManageBuyerBookings/:buyerId/:firstName/:surname" element={<ContactUs />} />

            </Routes>
        </BrowserRouter>
    )
}

export default NavBar;