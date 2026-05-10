import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Monitoring from "./components/monitoring/Monitoring.tsx";
import Legal from "./components/legal/Legal.tsx";
import Tracing from "./components/tracing/Tracing.tsx";
import About from "./components/About.tsx";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";

const App: React.FC = () => {
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

export default App;