import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from '../components/header'
// import './Home.css';

const Login = () => {
    const navigate = useNavigate();


     return (
    <>
      <Header />
      <main className="auth-page">  

         <form className="auth-form">
           
            

            <div className="auth-input-group">
              <label htmlFor="email">E-mail</label>
              
            
                <input
                  type="email"
                  id="email"
                  placeholder="exemplo@email.com"
                
                 
                  required
                />
              </div>
            

           

            <button type="submit" >
             
            </button>
          </form>
      </main>
            < Footer />
   
    </>
  )
}
    




export default Login;