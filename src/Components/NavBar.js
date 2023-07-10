import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from 'react';

import Home from "./HomePage";

import About from "./About/About";
import Blog from "./Blog/Blog";
import Imagine from "./Imagine/Imagine";
import Stories from "./Stories/Stories";
import PhysicsAndAllThingsMaths from "./PhysicsAndAllThingsMaths/PhysicsAndAllThingsMaths";
import Shop from "./Shop/Shop";
import ContactUs from "./ContactUs/ContactUs";

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
                            <Link className="nav-link link" to="/About">About.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Blog">Blog.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Imagine">Imagine.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Stories">Stories.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Physics">Physics.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/Shop">Shop.</Link>
                        </li>
                        <li className="link-container">
                            <Link className="nav-link link" to="/ContactUs">Contact Us.</Link>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li className="link-container"><Link className="glyphicon glyphicon-user nav-link link" to="/HomePage"><span></span>Search.</Link></li>
                    </ul>
                </div>
            </nav>

            <Routes>
                <Route path="/HomePage" element={<Home />} />
                <Route path="/" element={<Home />} />

                <Route path="/About" element={<About />} />
                <Route path="/Blog" element={<Blog />} />
                <Route path="/Imagine" element={<Imagine />} />
                <Route path="/Stories" element={<Stories />} />
                <Route path="/PhysicsAndAllThingsMaths" element={<PhysicsAndAllThingsMaths />} />
                <Route path="/Shop" element={<Shop />} />
                <Route path="/ContactUs" element={<ContactUs />} />

            </Routes>
        </BrowserRouter>
    )
}

export default NavBar;