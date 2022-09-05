import React from "react";
import "../../styles/AccountStyles/My-Listings.css";
import active from '../../img/status/active.png';
import completed from '../../img/status/completed.png';
import pending from '../../img/status/pending.png';
import { MdModeEdit } from 'react-icons/md';
import { BsPlusCircleFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { motion } from 'framer-motion';

function MyListings() {

//Refresh page once when visiting to show latest listing changes
  const navigate = useNavigate()
  navigate(0);

    const iD = useParams()

    const {loading, data} = useQuery (GET_ME, {
        variables: iD
    });

    const mine = data?.me || [];
    const activeJobs = data?.me?.activeJobs || [];

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
          ) :(
        <motion.div variants={componentVariant} initial="hidden" animate="visible" id="myListingsContainer">
            <div className="inner-my-listing-container">
              <Link to={`/me/newPost/${Auth.getProfile().data._id}`} style={{textDecoration: 'none'}}>
                <div className='job-box add-box'>
                    <BsPlusCircleFill className="add-button"/>
                </div>
              </Link>
              {mine.activeJobs.length === 0 || mine.activeJobs === null  ? (<p></p>) : (
                <>
                  {mine.activeJobs.map((singlejob) => (
                  <Link to= {`/posting/${singlejob._id}`} style={{textDecoration: 'none'}}>
                  <div className='job-box' key = {singlejob._id}>
                  <h1 className='job-price'><span>$</span>{singlejob.cost}</h1>
                  <img className='job-post-img' src="https://designshack.net/wp-content/uploads/placeholder-image.png" alt=''/>
                  <div className='job-post-decription-box'>
                    <div className='job-post-description-top'>
                      <h1 className='job-title'>{singlejob.title}</h1>
                      <div className='status-box'>
                        <h1 className='status-main-post'>Status</h1>
                        <span>
                        {activeJobs[0].status === 'Active' ? ( 
                          <img className='status-symbol-main' src={active} alt= ""/>
                        ) : (<div></div>)}
                        {activeJobs[0].status === 'Pending' ? ( 
                          <img className='status-symbol-main' src={pending} alt= ""/>
                        ) : (<div></div>)}
                        {activeJobs[0].status === 'Completed' ? ( 
                          <img className='status-symbol-main' src={completed} alt= ""/>
                        ) : (<div></div>)}
                        </span> 
                      </div>
                    </div>
                    <div className='job-post-description-bottom'>
                    <h1 className='job-post-owner'>{mine.name}</h1>
                      <h1 className='job-post-date'> {singlejob.createdAt}</h1>
                    </div>
                  </div>
                  <Link to= {`/updatePosting/${singlejob._id}`} style={{textDecoration: 'none'}}><MdModeEdit className="edit-button"/></Link> 
                  </div>
                  </Link>
                  ))}
                </>
              )}
            </div>
        </motion.div> 
      )
      ) : (
        <Navigate to="/"/>
      )
    );
}

export default MyListings;

