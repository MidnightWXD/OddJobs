import React from "react";
import "../../styles/AccountStyles/My-Account.css";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { motion } from 'framer-motion';
import IMAGES from '../../img/profiles/index.js';
import { Navigate } from 'react-router-dom'
import Auth from "../../utils/auth";



import StarRating from "../StarRating";

function MyAccount() {

    const logout = (e) => {
        e.preventDefault();
        Auth.logout();
    }


    const {loading, data} = useQuery (GET_ME);

    const mine = data?.me || [];
    const userIcon = IMAGES[mine.image];


    const componentVariant = {
        hidden:{
          opacity: 0
        },
        visible:{
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    }

    return (
        (Auth.loggedIn()) ? (
            (loading) ? (
                <div>Loading...</div>
              ) : ( 
        <motion.div variants={componentVariant} initial="hidden" animate="visible" className="my-account-outer-body">
            <div className="my-account-body">
                <div className="profile-and-signout">
                    <img className="my-account-profile-pic" src={userIcon} alt=''/>
                    <div className="admin-signout-button">
                            <div onClick={logout}>Sign out</div>
                    </div>
                </div>

                <div className="my-account-form-box">
                    <div className="my-account-form">
                        <h1 className="my-acccount-form-title">Name </h1>
                        <div className="my-account-data-box">

                            <h1 className="my-account-form-data"> {mine.name}</h1>

                        </div>
                    </div>
                    <div className="my-account-form">
                        <h1 className="my-acccount-form-title">Email</h1>
                        <div className="my-account-data-box">
                            <h1 className="my-account-form-data">{mine.email}</h1>
                        </div>
                    </div>
                    <div className="my-account-form">
                        <h1 className="my-acccount-form-title">Password</h1>
                        <div className="my-account-data-box">
                            <h1 className="my-account-form-data">*****************************</h1>
                        </div>
                    </div>
                    <div className="my-account-form">
                        <h1 className="my-acccount-form-title">Rating</h1>
                        <div className="my-account-data-box">
                            <div className="my-account-star-rating">
                                <StarRating rating={5} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
        ) 
        ) : (
        <Navigate to="/"/>
        )
    );
}

export default MyAccount;

