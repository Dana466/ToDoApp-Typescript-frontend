import React, { useState,createContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Header} from '../components/pageHeader';
import Button from '../components/submitButton';
import axios from 'axios';
import './signup.css';

interface ThemeContextProps {
    theme: string;
    toggletheme: () => void;
  }

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const Signup: React.FC = () => {


    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [theme, setTheme] = useState<string>('dark');

const navigate=useNavigate();
    const toggletheme = () => {
      setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    }

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        try {
          const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, { email, password });
          console.log(result.data);
          alert(result.data.message);
          navigate('/loginform');
        } 
        catch (err) {
            if (axios.isAxiosError(err)) {
              console.log(err);
              if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                alert(err.response.data.error);
              } else if (err.request) {
                console.log(err.request);
              } else {
                console.log('Error', err.message);
              }
            } else {
              console.log('Unexpected error', err);
            }
          }
      };
      
      const handleRegister = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const result = validateEmailAndPassword(email, password, confirmPassword);
        if (result === 'Email and password are valid.') {
          await handleSubmit(e);
        } else {
          alert(result);
        }
      };
      
      const validateEmailAndPassword = (email: string, password: string, confirmPassword: string): string => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
          return 'Invalid email format. Retype new email having example.user@example.com format';
        }
        if (password.length < 5) {
          return 'Password should be at least 5 characters long.';
        }
        if (!emailRegex.test(email) && password.length < 5) {
          return 'Wrong email and password';
        }
        if (password !== confirmPassword) {
          return 'Password and Confirm Password should match.';
        }
        return 'Email and password are valid.';
      };
      

    return (
<ThemeContext.Provider value={{theme,toggletheme}}>

            <div className="container" id={theme} >

                   <Header toggleTheme={toggletheme}/>

                <hr />
                <div className="register lineHeight-24">Register</div>
                <div className="form flex-col align-center">
                    <input
                        type="text"  className="txt mb-12"  id="email"   placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" id="password" placeholder="Password"  value={password}  onChange={(e) => setPassword(e.target.value)}  />
                    <input type="password" id="confirmPassword"  placeholder="Confirm Password" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} />
                    <span className="span opacity-50">
                        Already have an account?{' '}
                        <Link to="/loginform" className="logLink">Login</Link>
                    </span>
                    <Button text='Register' page='login' submitFunction={handleRegister}/>
                  
                </div>
            </div>
            </ThemeContext.Provider>
    );
};



