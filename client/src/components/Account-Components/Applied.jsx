import React from "react";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import { GET_ME } from '../../utils/queries';
import Auth from "../../utils/auth";
import "../../styles/AccountStyles/Applied.css";
import active from '../../img/status/active.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Applied() {

    const userID = useParams();

    const { loading, data } = useQuery(GET_ME, {
        variables: userID,
      });

    const applied = data?.me?.jobApplications

    const componentVariant = {
      hidden:{
        y: 200
      },
      visible:{
        y: 0,
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
        <motion.div variants={componentVariant} initial="hidden" animate="visible" className="appliedContainer">
            {applied.map((app) => (
            <Link to= {`/posting/${app._id}`}> 
            <div className='job-box'>
              <h1 className='job-price'><span>$</span>20</h1>
              <img className='job-post-img' src="https://designshack.net/wp-content/uploads/placeholder-image.png" alt=''/>
              <div className='job-post-decription-box'>
                <div className='job-post-description-top'>
                  <h1 className='job-title'>{app.title}</h1>
                  <div className='status-box'>
                    <h1 className='status-main-post'>Status</h1>
                    <span>
                      <img className='status-symbol-main' src={active} alt=''/>
                    </span>
                  </div>
                </div>
                <div className='job-post-description-bottom'>
                  <h1 className='job-post-date'>{app.createdAt}</h1>
                </div>
              </div>
            </div>
            </Link>
            ))}


        </motion.div>
        )
        ) : (
          <Navigate to="/"/>
        )
    );
}

export default Applied;