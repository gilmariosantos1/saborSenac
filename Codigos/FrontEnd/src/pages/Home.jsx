import { useNavigate } from "react-router-dom";
import Header from '../components/header'
// import './Home.css';

const Home = () => {
    const navigate = useNavigate();


    return (
        <>
            <Header />
            <div><h1>teste</h1></div>
        </>
    )
}



export default Home;