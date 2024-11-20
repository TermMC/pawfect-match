"use client";
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faEnvelope,
  faPenToSquare,
  faCircleCheck,
  faIdBadge,
  faHourglassStart,
} from "@fortawesome/free-solid-svg-icons";
import { checkUsernameAvailability } from "@/utils/accountsFunctions";

export default function UserProfile({ user_id_main }) {
  const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successful, setSuccessful] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    date_of_birth: "",
    bio: "",
  });

  //Event Handlers ----------------------------------------------------------------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedData = Object.fromEntries(formData);

    const isUsernameAvailable = await checkUsernameAvailability(account.username,
      updatedData.username
    );
    if (!isUsernameAvailable) {
      return;
    }

    if (!validateForm(updatedData)) {
      return; // Stop submission if validation fails
    }

    try {
      const { data, error } = await supabase
        .from("account")
        .update({
          name: updatedData.name,
          username: updatedData.username,
          email: updatedData.email,
          date_of_birth: updatedData.date_of_birth,
          bio: updatedData.bio,
        })
        .eq("user_id", user_id_main)
        .single();

      if (error) throw error;

      setSuccessful(true);
      setTimeout(() => setSuccessful(false), 3000);
      setAccount({ ...account, ...updatedData });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile");
    }
  };

  // Form validation ---------------------------------------------------------------------



  const validateForm = (data) => {
    let tempErrors = {};
    let isValid = true;

    // Name validation
    if (!data.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    } else if (data.name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }
    // Email validation
    if (!data.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!EMAIL_REGEX.test(data.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    // Username validation
    if (!data.username.trim()) {
      tempErrors.username = "Username is required";
      isValid = false;
    } else if (data.username.trim().length < 3) {
      tempErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Date of birth validation
    if (!data.date_of_birth) {
      tempErrors.date_of_birth = "Date of birth is required";
      isValid = false;
    } else {
      const dob = new Date(data.date_of_birth);
      const today = new Date();
      if (dob >= today) {
        tempErrors.date_of_birth = "Invalid date of birth";
        isValid = false;
      }
    }

    // Bio validation (optional)
    if (data.bio && data.bio.length > 500) {
      tempErrors.bio = "Bio must not exceed 500 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const validateField = async (fieldName, value) => {
    let tempErrors = { ...errors };

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          tempErrors.name = "Name is required";
        } else if (value.trim().length < 2) {
          tempErrors.name = "Name must be at least 2 characters";
        } else {
          tempErrors.name = "";
        }
        break;

      case "email":
        if (!value) {
          tempErrors.email = "Email is required";
        } else if (!EMAIL_REGEX.test(value)) {
          tempErrors.email = "Please enter a valid email address";
        } else {
          tempErrors.email = "";
        }
        break;

      case "username":
        if (!value.trim()) {
          tempErrors.username = "Username is required";
        } else if (value.trim().length < 3) {
          tempErrors.username = "Username must be at least 3 characters";
        } else {
          const isAvailable = await checkUsernameAvailability(account.username, value.trim());
          if (!isAvailable) {
            tempErrors.username = "Username is already taken";
          } else {
            tempErrors.username = "";
          }
        }
        break;

      case "date_of_birth":
        if (!value) {
          tempErrors.date_of_birth = "Date of birth is required";
        } else {
          const dob = new Date(value);
          const today = new Date();
          if (dob >= today) {
            tempErrors.date_of_birth = "Invalid date of birth";
          } else {
            tempErrors.date_of_birth = "";
          }
        }
        break;

      case "bio":
        if (value && value.length > 1000) {
          tempErrors.bio = "Bio must not exceed 1000 characters";
        } else {
          tempErrors.bio = "";
        }
        break;
    }

    setErrors(tempErrors);
  };

  //Fetching account details ---------------------------------------------

  useEffect(() => {
    fetchAccount();
  }, []);

  async function fetchAccount() {
    const { data, error } = await supabase
      .from("account")
      .select("user_id, username, email, name, date_of_birth, bio, verified")
      .eq("user_id", user_id_main)
      .single();

    if (error) console.error("Error fetching account:", error);
    else setAccount(data);
    setLoading(false);
  }

  if (loading)
    return (
      <div className="loading">
        Loading <FontAwesomeIcon icon={faHourglassStart} />
      </div>
    );
  if (!account) return <div className="noAccount">No account found</div>;

  const names = account.name.split(" ");
  const first_name = names[0];

  //Return JSX ------------------------------------------------------------------------

  return (
    <>
      <section className="profilePageHolder">
        <div className="titleBox">
          <div className="profTitle">Hey, {first_name}! &#128075;</div>
        </div>
        <div className="profPictureBox">
          <Image
            src="https://avatar.iran.liara.run/public"
            className="profPicture"
            alt="Profile 
          Picture"
            priority={true}
            width={100}
            height={100}
          />
        </div>
        <div>
          <p className="displayName">
            {account.username}
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={account.verified ? "verified" : "unverified"}
            />
          </p>
        </div>
        <div className="fbox">
          <form id="pform" onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="name">Name</label>
              <div className="input-icon-wrapper">
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  defaultValue={account.name}
                  onChange={handleInputChange}
                />
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
              <label htmlFor="username">Username</label>
              <div className="input-icon-wrapper">
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username"
                  defaultValue={account.username}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <FontAwesomeIcon icon={faIdBadge} className="input-icon" />
                {errors.username && (
                  <span className="error-message">{errors.username}</span>
                )}
              </div>
              <label htmlFor="email">Email</label>
              <div className="input-icon-wrapper">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={account.email}
                  onChange={handleInputChange}
                />
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <label htmlFor="dob">Date of Birth</label>
              <div className="input-icon-wrapper">
                <input
                  type="date"
                  name="date_of_birth"
                  id="dob"
                  defaultValue={account.date_of_birth}
                  onChange={handleInputChange}
                />
                <FontAwesomeIcon icon={faCalendar} className="input-icon" />
                {errors.date_of_birth && (
                  <span className="error-message">{errors.date_of_birth}</span>
                )}
              </div>

              <label htmlFor="biofield">Bio</label>
              <div className="input-icon-wrapper">
                <textarea
                  id="biofield"
                  name="bio"
                  rows="10"
                  cols="100"
                  defaultValue={account.bio}
                  onChange={handleInputChange}
                />
                <FontAwesomeIcon icon={faPenToSquare} className="input-icon" />
                {errors.bio && (
                  <span className="error-message">{errors.bio}</span>
                )}
              </div>

              <input
                type="submit"
                name="update"
                className={!successful ? "updateButton" : "editSuccessful"}
                value={!successful ? "Update" : `Successfully Updated! ✅`}
              />
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
