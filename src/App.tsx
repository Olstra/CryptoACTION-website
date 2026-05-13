import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.sass";
import {Monitoring} from "./components/Monitoring/Monitoring.tsx";
import {Legal} from "./components/Legal/Legal.tsx";
import {Tracing} from "./components/Tracing/Tracing.tsx";
import {About} from "./components/About/About.tsx";
import {Footer} from "./components/Footer.tsx";
import {Header} from "./components/Header/Header.tsx";
import React from "react";

export const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Monitoring/>}/>
                    <Route path="/legal" element={<Legal/>}/>
                    <Route path="/tracing" element={<Tracing/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};
