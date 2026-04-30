import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
// import './Home.css';

const Home = () => {
    const navigate = useNavigate();


    return (
        <>
            <Header />
            <div><h1>teste</h1></div>
            < Footer />
        </>
    )
}

export default Home;