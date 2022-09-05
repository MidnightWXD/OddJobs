import React from "react";
import "../../styles/Applications.css";
import active from '../../img/status/active.png';
import profile65 from '../../img/profiles/2.svg'
import StarRating from "../StarRating";
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';



function Applications() {

    const iD = useParams()

    const {data} = useQuery (GET_ME, {
        variables: iD
    });


    const received = data?.me?.activeJobs || [];

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
        <motion.div variants={componentVariant} initial="hidden" animate="visible" className="applicationsContainer">
            {/* Map through Users active jobs  to render on screen */}
            {received.map((job) => (
            <div className="inner-applications-container">
                <div className="job-detail-container">
                    <h1 className="applications-job-title">{job.title}</h1>
                    <div className="applications-status-box">
                        <h1 className="applications-status-title">Status</h1>
                        <img src={active} className="applications-status-icon" alt=''/>
                    </div>
                </div>
                {/* Nested Map to iterate through all the applications to the Users active jobs and then render them on screen  */}
                {job.applications.map((next) => (
                <div className="job-applicants-container">
                    
                    <div className="username-and-pic-container">
                        <img src={profile65} className="job-applicant-profile-pic" alt="icon"/>
                        <h1 className="job-applicant-name"> {next.name} </h1>
                    </div>
                    <div className="rating-container">
                        <StarRating rating={5} />
                    </div>
                </div>
                ))}
            </div>
            ))}
        </motion.div>
    );
}

export default Applications;