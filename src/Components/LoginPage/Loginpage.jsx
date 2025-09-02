import React, { useState } from "react";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const fetchUsers = await fetch(
        "https://sharpener-movie-1235c-default-rtdb.firebaseio.com/users.json"
      );
      const user = await fetchUsers.json();

      let emailExist = false;
      if (user) {
        for (const key in user) {
          if (user[key].email === email) {
            emailExist = true;
            break;
          }
        }
      }
      if (emailExist) {
        setSending(false);
        alert("Email already exists");
        return;
      }
      const response = await fetch(
        "https://sharpener-movie-1235c-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setSending(false);
      console.log("Success:", data);
      setEmail("");
      setPassword("");
      alert("Sign Up Successful");
    }
    
    catch (error) {
        setSending(false);
      alert("Sign Up Failed");
      console.log("Error:", error);
    }
  };
  return (
    <div className="flex flex-col items-center mx-auto my-5 rounded-xl  bg-purple-400">
      <h1 className="text-2xl my-5 mx-50">Sign Up</h1>
      <div className="flex flex-col gap-5 m-5">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className=" border-1 p-2 w-70"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className=" border-1 p-2 w-70"
          required
        />
        <button type="submit" onClick={submitHandler} className="border-1 p-1">
          {sending ? "Sending Request..." : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default Loginpage;
