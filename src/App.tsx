import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import GlobalLayer from "./components/GlobalLayer.tsx";
import NationalLayer from "./components/NationalLayer.tsx";
import EULayer from "./components/EULayer.tsx";
import Home from "./components/Home.tsx";
import "./App.css";

const App: React.FC = () => {
    return (
        <Router>
            <header className="navbar">
                <div className="container">
                    <div className="brand">
                        <img src={reactLogo} alt="Logo" className="nav-logo"/>
                        <span className="nav-title">CryptoACTION</span>
                    </div>

                    <nav className="nav-links">
                        <NavLink to="/" end
                                 className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                        <NavLink to="/global" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Global
                            Layer</NavLink>
                        <NavLink to="/national" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>National
                            Layer</NavLink>
                        <NavLink to="/eu" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>EU
                            Layer</NavLink>
                    </nav>
                </div>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/global" element={<GlobalLayer/>}/>
                    <Route path="/national" element={<NationalLayer/>}/>
                    <Route path="/eu" element={<EULayer/>}/>
                </Routes>
            </main>

            <footer className="site-footer">
                <div className="container">
                <p>© {new Date().getFullYear()} UZH, Blockchain Center, CryptoACTION</p>
                </div>
            </footer>
        </Router>
    );
};

export default App;