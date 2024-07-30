"use client";
import axios from "axios";
import { useState } from "react";

export interface UserDetail {
  username: string;
  verified: boolean;
  bio: string;
  initials: string;
  id: number;
  picture: Picture;
  website: string;
  first_name: string;
  last_name: string;
  followers: number;
  following: number;
  reviews_total: number;
  reviews_rating: number;
  seller_ratings: number;
  buyer_ratings: number;
  last_seen: string;
  items_sold: number;
}
export interface Picture {}

function Form() {
  const [userDetails, setUserDetails] = useState<UserDetail>();
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = () => (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setFetchSuccess(false);
    try {
      const loginResult = await axios.post("/api/login", formData);
      if (loginResult.status === 200) {
        const fetchUserDetailsResult = await axios.post(
          "/api/get-user-details",
          {
            token: loginResult.data.token,
          }
        );
        setLoading(false);
        if (fetchUserDetailsResult.status === 200) {
          setMessage("Login Success");
          setFetchSuccess(true);
          setUserDetails(fetchUserDetailsResult.data);
          return;
        } else {
          setMessage("Fetch User Details Failed!");
        }
      }
    } catch (error) {
      console.log(error);
      setFetchSuccess(false);
      setMessage("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="container-md p-5 ">
      <h2 className="py-2 text-xl font-bold">Login Form</h2>
      <form
        acceptCharset="UTF-8"
        method="POST"
        id="ajaxForm"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-2">
          <label htmlFor="userNameInput">User</label>
          <input
            type="text"
            className="ml-5 outline"
            id="userNameInput"
            placeholder="Enter user"
            required
            name="username"
            value={formData.username}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            className="ml-5 outline"
            id="passwordInput"
            placeholder="Enter Password"
            required
            name="password"
            value={formData.password}
            onChange={handleChange()}
          />
        </div>
        <button type="submit" className="btn bg-slate-400 px-11">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="py-2">
        <p>{message}</p>
      </div>
      {fetchSuccess && (
        <div className="py-5">
          <h3>First Name:{userDetails?.first_name}</h3>
          <h3>Last Name: {userDetails?.last_name}</h3>
        </div>
      )}
    </div>
  );
}

export default Form;
