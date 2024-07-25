import React, { useState,createContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {Header} from '../components/pageHeader';
import Button from '../components/submitButton';
import axios from 'axios';


interface ThemeContextProps {
    theme: string;
    toggletheme: () => void;
  }

export const ThemeContext = createContext<ThemeContextProps | null>(null);

 export const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [theme, setTheme] = useState<string>('dark');
    const navigate = useNavigate();

    const toggletheme = () => {
      setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    }



    const handleSubmitLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/user/login`, { email, password })
          .then((result) => {
            if (result.status===200) {
              localStorage.setItem('token', result.data.token);
              alert('Login In Successfully');
              navigate('/todo');
            } else {
              alert(result.data.message);
            }
          })
          .catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
              alert(err.response.data.message);
            } else {
              alert("Don't have an account sign up before logging in ");
              navigate('/registerform');
            }
            console.log(err);
          });
      };


    return (
<ThemeContext.Provider value={{theme,toggletheme}}>
            <div className="container" id={theme}>

                <Header toggleTheme={toggletheme}/>

                <hr />
                <div className="Login lineHeight-24">Login</div>
                <div className="form flex-col align-center">
                    <input
                        type="text"  className="txt mb-12"  id="email"   placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" id="password" placeholder="Password"  value={password}  onChange={(e) => setPassword(e.target.value)}  />
                    <span>
                   Don't have an account yet ?{' '}
                      <Link to={'/registerform'} className="signupLink">Signup</Link>
       
      </span>

                    <Button text='Login' page='login' submitFunction={handleSubmitLogin} />
                    
                </div>
            </div>
          </ThemeContext.Provider>
    );
};





