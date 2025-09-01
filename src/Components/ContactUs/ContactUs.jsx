import React, { useState } from "react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const contactFromSubmitHandler = async(e) => {
    e.preventDefault();
    try{
        const response = await fetch("https://sharpener-movie-1235c-default-rtdb.firebaseio.com/contactus.json",{
            method:"POST",
            body:JSON.stringify({name,email,contactNumber}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();
        console.log("Success:",data);
    }
    catch(error){
        console.log("Error:",error);
    } 
    setName("");
    setEmail("");
    setContactNumber("");
    alert("Form Submitted Successfully");
  };
  return (
    <div className="my-5 mx-auto">
      <h1 className="text-3xl font-bold text-center my-5">Contact Us</h1>
      <form
        action=""
        className="flex flex-col justify-center mx-auto px-25 py-10 bg-amber-200 gap-5 rounded-lg"
        onSubmit={contactFromSubmitHandler}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-1 border-black p-1 pr-20 rounded-lg"
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-1 border-black p-1 rounded-lg"
          placeholder="Email"
          required
        />
        <input
          type="number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="border-1 border-black p-1 rounded-lg"
          placeholder="Contact Number"
          required
        />
        <button type="submit" className="border-1 border-red-500 p-1 hover:bg-red-300 rounded-lg active:bg-red-500">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
