import React, { useState } from "react";
import axios from "axios";

const G_URL = "http://127.0.0.1:5000";

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState<string>("");
  const [className, setClassName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [token, setToken] = useState<string>(""); // Add a state for the JWT token

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServerMsg("");
    setClassName("");

    if (password !== confirmPassword) {
      setIsLoading(false);
      setServerMsg("Passwords do not match.");
      setClassName("error");
      return;
    }

    try {
      const response = await axios.post(`${G_URL}/register`, {
        email,
        password,
      });

      const { status, cls, msg, payload } = response.data;

      setIsLoading(false);
      setServerMsg(msg);
      setClassName(cls);

      if (!status) {
        return;
      }

      const token = response.data.token;
      setToken(token);

      localStorage.setItem("token", token);

      console.log("Registration successful:", payload);
    } catch (error) {
      setIsLoading(false);
      setServerMsg("An error occurred. Please try again.");
      setClassName("error");
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email : </label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <label htmlFor="password">Password : </label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <label htmlFor="confirmPassword">Confirm Password : </label>
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        id="confirmPassword"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <br />
      <br />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      {isLoading && <div className="loading">Loading...</div>}
      {!isLoading && serverMsg && <div className={className}>{serverMsg}</div>}
    </form>
  );
};

export default RegisterForm;