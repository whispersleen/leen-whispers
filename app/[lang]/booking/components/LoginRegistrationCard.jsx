"use client"

import { auth, db } from "@/firebase";
import {FacebookAuthProvider, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";

import { useEffect, useState } from "react"
import PhoneInput from "react-phone-input-2";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import BookingForm from "./BookingForm";
import SignIn from "./SignIn";
import Register from "./Register";


export default function LoginRegistrationCard({lang}) {

    const [activeTab, setActiveTab] = useState('signIn');
    const [userName, setUserName] = useState(localStorage.getItem("userName"))
    const [identifier, setIdentifier] = useState(localStorage.getItem("identifier"))

    const currentuser = auth.currentUser;
    console.log(currentuser)

    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };

    const userData = { 
        firstName: userName?.split(" ")[0] || "",
        lastName: userName?.split(" ")[1] || "",
        identifier: identifier || "",
    }

    const removeCookie = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("identifier");
        window.location.reload();
    }

  return (
    <div className="pt-8 pb-7 booking-section division">
      {userName ? (
        <>
        <div className="container text-center">
            <h2>Welcome {userName}</h2>
            <p>Thanks for registration, book an apointment</p>
            <a className="btn btn--tra-black hover--black submit" onClick={removeCookie}>
                Logout
            </a>
        </div>
        <BookingForm lang={lang} userData={userData}/>        
        </>
      ) : (    
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
            
        <div className="row">
              <div className="col-md-12">
                <ul className="nav nav-tabs justify-content-center">
                  <li className="nav-item">
                    <button
                      className={`btn btn--tra-black hover--black nav-link ${activeTab === 'signIn' ? 'active' : ''}`}
                      onClick={() => handleTabChange('signIn')}
                    >
                      Sign In
                    </button>
                  </li>
                  
                  <li className="nav-item">
                    <button
                      className={`btn btn--tra-black hover--black nav-link ${activeTab === 'registration' ? 'active' : ''}`}
                      onClick={() => handleTabChange('registration')}
                    >
                      Register
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <br />
            <br />
          <div  className="row ">
            {activeTab === 'signIn' && (<SignIn/>)}
            {activeTab === 'registration' && (<Register/>)}
        </div> 
        </div>
      </div>{" "}
    </div>)}

  </div>

  )
}
