import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { UPDATE_POSTING } from "../utils/mutations";
import { Link, useNavigate } from 'react-router-dom';
import logosvg from '../img/Logo.svg'
import active from '../img/status/active.png'
import { TbCloudUpload } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import StarRating from '../components/StarRating';
import {GET_SINGLE_POSTING} from '../utils/queries';
import { Navigate } from 'react-router-dom'
import { REMOVE_POSTING } from "../utils/mutations";
import Auth from '../utils/auth';
import profile1 from '../img/profiles/profile1.svg';

function UpdatePosting() {

  const postId = useParams()
  const {loading, data} = useQuery (GET_SINGLE_POSTING, {
    variables: postId 
  });

  const singlepost = data?.singlePosting || [];

  const [formState, setFormState] = useState ({
    title: '',
    description: '',
    cost: '',
    status:'',
  });

  const [updatePosting] = useMutation(UPDATE_POSTING);

  const handleDropChange = (event) => {
    const { target } = event;
    const inputType = target.value;
    setFormState({
      ...formState,
      status: inputType
    })    
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      await updatePosting({
        variables: {
          ...postId, 
          input:{
            ...formState
          }
        },
      });

      navigate(`/me/${Auth.getProfile().data._id}`);

      toast.success('Job posting updated!', {
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
      toast.error('Error, please try again', {
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

  const sidebarVariant = {
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

  const componentVariant = {
      hidden:{
          opacity: 0
      },
      visible:{
          opacity: 1,
          transition: {
              duration: 0.45
          }
      }
  }

  const [deletePosting] = useMutation(REMOVE_POSTING)

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();

    try {
      await deletePosting({
        variables: {
          ...postId
        },
      });
      navigate(`/me/${Auth.getProfile().data._id}`);
      toast.success('Job posting deleted!', {
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
      toast.error('Error, please try again', {
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

  return(
    (Auth.loggedIn()) ? (
      (loading) ? (
        <div>Loading...</div>
      ) : (  
    <div className="adminBody">
        <motion.div variants={sidebarVariant} initial="hidden" animate="visible" className="sidebar">
            <div className="sidebar-top">
                <img className="navbar-logo" src={logosvg} alt=""/>
                <span>OddJobs</span>
            </div>
            <div className="options">
                <section className="selected-tab">Updating Post</section>
            </div>
        </motion.div>
        <motion.div variants={componentVariant} initial="hidden" animate="visible" className="header-and-component-container">
          <header className="admin-main-header">
            <h1 className="admin-title">Updating Post</h1>
            <div className="admin-back-button" >
                <Link to={`/home`} style={{ textDecoration: 'none', color:'#64FFDB' }}> <div>Home</div> </Link>
            </div>
          </header>
          <div className="form-and-buttons-container">
            <div className="form-container">
              <div className="form-background">
                <div className="form-left">
                  <div className="my-account-form">
                    <h1 className="my-acccount-form-title">Name</h1>
                    <input value={formState.title} name="title" onChange={handleChange} className="add-input-name" type="text" placeholder={singlepost.title}></input>
                  </div>
                  <div className="my-account-form">
                    <h1 className="my-acccount-form-title">Description</h1>
                    <textarea onChange={handleChange} value={formState.description} name="description" type="text" placeholder={singlepost.description} className="description-text-area"></textarea>
                  </div>
                  <div className="job-applicants-container">
                  <div className="username-and-pic-container">
                      <img src={profile1} className="job-applicant-profile-pic" alt="icon"/>
                      <h1 className="job-applicant-name">Dave Johnson</h1>
                  </div>
                  <div className="rating-container">
                      <StarRating rating={4} />
                  </div>
              </div>
                </div>
                <div className="form-right">
                  <div className="upload-pic-box">
                    <div className="upload-components-box">
                      <TbCloudUpload className="upload-file-logo"/>
                      <h1 className="upload-file-title">Select a file or drag and drop here</h1>
                      <h1 className="upload-file-specifics">JPG, PNG, or PDF, file size no more than 10MB</h1>
                      <div className="upload-button-container">
                        <input type="file" name="upload-file-button" className="upload-file-button" />
                      </div>
                    </div>
                  </div>
                  <div className="status-and-price-container">
                    <div className="status-container">
                      <h1 className="status-title">Status</h1>
                      <div className="status-icon-and-dropdown">
                        <img className="status-icon-for-dropdown" src={active} alt=""/>
                        <select className="status-dropdown-list" name="status-dropdown-list" onChange={handleDropChange}>
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div className="price-container">
                      <h1 className="price-title">Price</h1>
                      <div className="price-input-container">
                        <span className="input-dollar-sign">$</span>
                        <input onChange={handleChange} type="text" name="cost" value={formState.cost} className="price-input"  placeholder={singlepost.cost}/>
                      </div>
                    </div>
                  </div>
                  <div className="inner-button-container">
                <div className="inner-inner-button-container">
                    <div className="listing-delete-button" onClick={handleDeleteSubmit}>
                      <div>Delete</div>
                    </div>
                </div>
                <div className="inner-inner-button-container">
                    <div className="listing-cancel-button">
                      <div>Cancel</div>
                    </div>
                </div>
                <div className="inner-inner-button-container">
                  <div className="listing-create-button" onClick={handleFormSubmit}>
                  <div>Update</div>  
                    </div> 
                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
    </div>
    )
    ) : (
      <Navigate to="/"/>
    )
  );
}

export default UpdatePosting;