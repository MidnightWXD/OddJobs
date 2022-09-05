import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CREATE_POSTING } from "../utils/mutations";
import logosvg from '../img/Logo.svg'
import active from '../img/status/active.png'
import { TbCloudUpload } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '../utils/auth';


function NewPost() {

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    cost: '',
    image: 'https://designshack.net/wp-content/uploads/placeholder-image.png',
    workerNumber: '',
    status: 'Active',
  });

  const navigate = useNavigate();

  const { id } = useParams();
  const [addPosting] = useMutation(CREATE_POSTING);

  const handleDropChange = (event) => {
    const { target } = event;
    const inputType = target.value;
    setFormState({
      ...formState,
      workerNumber: inputType
    })    
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    if (formState.workerNumber === '') {
      toast.error('Please enter a worker number');
    } else {
      try{
      await addPosting({
        variables: {
          input: {
            ...formState,
          }
        },
      });
      toast.success('Job listing posted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
         
      });
      navigate(`/me/${Auth.getProfile().data._id}`); 
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

  return (

    <div className="adminBody">
        <motion.div variants={sidebarVariant} initial="hidden" animate="visible" className="sidebar">
            <div className="sidebar-top">
              <Link to={`/home`}>
                <img className="navbar-logo" src={logosvg} alt=""/>
              </Link>  
                <span>OddJobs</span>
            </div>
            <div className="options">
                <section className="selected-tab">Add Post</section>
            </div>
        </motion.div>
        <motion.div variants={componentVariant} initial="hidden" animate="visible" className="header-and-component-container">
          <header className="admin-main-header">
            <h1 className="admin-title">Add Post</h1>
            <div className="admin-back-button" >
                <Link to={`/me/${ id }`} style={{ textDecoration: 'none', color:'#64FFDB' }}> <div>Profile</div> </Link>
            </div>
          </header>

          <div className="form-and-buttons-container">
            <div className="form-container">
              <div className="form-background">
                <div className="form-left">
                  <div className="my-account-form">
                    <h1 className="my-acccount-form-title">Name</h1>
                    <input className="add-input-name" type="text" placeholder="Enter name...." name= "title" value={formState.title} onChange={handleChange}></input>
                  </div>
                  <div className="my-account-form">
                    <h1 className="my-acccount-form-title">Description</h1>
                    <textarea type="text" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboriquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elim ad minim veniam, quis nostrud exercitation ullamco labo" className="description-text-area" name= "description" value={formState.description} onChange={handleChange}></textarea>
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
                      <h1 className="status-title">Worker Number</h1>
                      <div className="status-icon-and-dropdown">
                        <img className="status-icon-for-dropdown" src={active} alt=""/>
                        <select className="status-dropdown-list" name="status-dropdown-list" onChange={handleDropChange}>
                          {/* create a drop list from 1 to 20 */}
                          <option value="1"> </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                        </select>
                      </div>
                    </div>
                    <div className="price-container">
                      <h1 className="price-title">Price</h1>
                      <div className="price-input-container">
                        <span className="input-dollar-sign">$</span>
                        <input className="price-input"  placeholder="30" type="number" name= "cost" value={formState.cost} onChange={handleChange}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="button-container">
              <div className="inner-button-container">
                {/* <div className="inner-inner-button-container">
                    <div className="listing-delete-button">
                       <div>Delete</div>
                    </div>
                </div>
                <div className="inner-inner-button-container">
                    <div className="listing-cancel-button">
                       <div>Cancel</div>
                    </div>
                </div> */}
                <div className="inner-inner-button-container">
                    <div onClick={handleFormSubmit} className="listing-create-button">
                    <div>Create</div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
    </div>
  )
}



export default NewPost;