import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import helpers from '../utils/helpers';
import '../styles/login.css';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function SignUp() {

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    postCode: '',
    image: helpers.getrandomicon(1,21),
  });

  const [addUser] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: {
          input:{
            ...formState
          }
        },
      });
      Auth.login(data.createUser.token);
      toast.success('Signed in successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } catch (e) {
      console.error(e);
      let error = e.graphQLErrors[0].message;
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const leftVariant = {
    hidden:{
      x: -800
    },
    visible:{
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const rightVariant = {
    hidden:{
      x: 800
    },
    visible:{
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (

    (Auth.loggedIn()) ? 
      (
          <Navigate to="/home" />
      ) : 
      (
      <div className='signup-container'>
        <motion.div variants={leftVariant} initial="hidden" animate="visible" className='left-signup-container'>
          <div className="left-inner-container">
            <div className='signup-title-container'>
              <svg className="signup-logo" width="73" height="66" viewBox="0 0 73 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_15_13)">
                <path d="M9.98819 49.8924C12.6652 51.7582 17.0054 51.7582 19.6824 49.8924C22.3592 48.0265 22.3592 45.0012 19.6824 43.1353C17.0054 41.2695 12.6652 41.2695 9.98819 43.1353C7.31123 45.0012 7.31123 48.0265 9.98819 49.8924Z" fill="#25CAAC"/>
                <path d="M37.7726 24.5539C41.7881 27.3527 48.2983 27.3527 52.3139 24.5539C56.3292 21.755 56.3292 17.2173 52.3139 14.4185C48.2983 11.6197 41.7881 11.6197 37.7726 14.4185C33.7573 17.2173 33.7573 21.755 37.7726 24.5539Z" fill="#25CAAC"/>
                <path d="M23.0235 37.2231C26.3697 39.5554 31.795 39.5554 35.1411 37.2231C38.4873 34.8907 38.4873 31.1093 35.1411 28.7769C31.795 26.4447 26.3697 26.4447 23.0235 28.7769C19.6773 31.1093 19.6773 34.8907 23.0235 37.2231Z" fill="#25CAAC"/>
                <path d="M1.50579 35.5339C3.51351 36.9333 6.76866 36.9333 8.77639 35.5339C10.7841 34.1345 10.7841 31.8657 8.77639 30.4661C6.76866 29.0668 3.51351 29.0668 1.50579 30.4661C-0.501931 31.8657 -0.501929 34.1345 1.50579 35.5339Z" fill="#25CAAC"/>
                <path d="M23.0235 10.1954C26.3697 12.5277 31.795 12.5277 35.1411 10.1954C38.4873 7.86306 38.4873 4.08159 35.1411 1.74926C31.795 -0.583086 26.3697 -0.583087 23.0235 1.74926C19.6773 4.08159 19.6773 7.86306 23.0235 10.1954Z" fill="#25CAAC"/>
                <path d="M9.98818 22.8647C12.6651 24.7306 17.0054 24.7306 19.6824 22.8647C22.3592 20.9988 22.3592 17.9736 19.6824 16.1077C17.0054 14.2419 12.6651 14.2419 9.98818 16.1077C7.31122 17.9736 7.31124 20.9988 9.98818 22.8647Z" fill="#25CAAC"/>
                <path d="M23.0235 64.2508C26.3697 66.5831 31.795 66.5831 35.1411 64.2508C38.4873 61.9184 38.4873 58.137 35.1411 55.8046C31.795 53.4723 26.3697 53.4723 23.0235 55.8046C19.6773 58.137 19.6773 61.9184 23.0235 64.2508Z" fill="#25CAAC"/>
                <path d="M55.4471 38.0678C59.4626 40.8665 65.973 40.8665 69.9884 38.0678C74.0039 35.269 74.0039 30.7312 69.9884 27.9324C65.973 25.1335 59.4626 25.1335 55.4471 27.9324C51.4318 30.7312 51.4318 35.269 55.4471 38.0678Z" fill="#25CAAC"/>
                <path d="M37.7726 51.5814C41.7881 54.3804 48.2983 54.3804 52.3139 51.5814C56.3292 48.7827 56.3292 44.245 52.3139 41.4461C48.2983 38.6474 41.7881 38.6474 37.7726 41.4461C33.7573 44.245 33.7573 48.7827 37.7726 51.5814Z" fill="#25CAAC"/>
                </g>
                <defs>
                <clipPath id="clip0_15_13">
                <rect width="73" height="66" fill="white"/>
                </clipPath>
                </defs>
              </svg>
              <h1 className='signup-title'>Odd Jobs</h1>
            </div>
            <div className='discription-container'>
              <h1 className='signup-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h1>
            </div>
          </div>
        </motion.div>
        <motion.div variants={rightVariant} initial="hidden" animate="visible" className='right-signup-container'>
          <Link to = {'/'} style={{textDecoration: 'none'}} ><h1 className='top-signup-container' >Sign In</h1></Link>
          <div className='signup-form-cotainer'>
            <div className='inner-signup-form-container'>
              <h1 className='create-your-account-text'><span className='create'>Create</span> Your Account</h1>
              <div className='signup-input-container'>
                <input className='signup-input' type="text" placeholder="Username" name="name" value={formState.name} onChange={handleChange}/>
                <input className='signup-input' type="email" placeholder="Email" name="email" value={formState.email} onChange={handleChange}/>
                <input className='signup-input' type="password" placeholder="Password" name="password" value={formState.password} onChange={handleChange}/>
                <input className='signup-input' type="text" placeholder="Postal Code" name="postCode" value={formState.postCode} onChange={handleChange}/>
              </div>
              <button className="signup-button" type="submit" onClick={handleFormSubmit}>SUBMIT</button>
            </div>

          </div>
        </motion.div>
      </div>
    )

  );
}

export default SignUp;


