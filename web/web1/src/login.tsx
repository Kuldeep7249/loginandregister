import React from "react";
import axios from "axios";

const G_URL = "http://127.0.0.1:5000";

const LoginForm:React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [serverMsg, setServerMsg] = React.useState<string>("");
  const [className, setClassName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServerMsg("");
    setClassName("");

    try {
      const response = await axios.post(`${G_URL}/login`, {
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

      // Handle successful login (e.g., redirect, store token, etc.)
      console.log("Login successful:", payload);
    } catch (error) {
      setIsLoading(false);
      setServerMsg("An error occurred. Please try again.");
      setClassName("error");
      console.error("Login error:", error);
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
      <br />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {isLoading && <div className="loading">Loading...</div>}
      {!isLoading && serverMsg && <div className={className}>{serverMsg}</div>}
    </form>
  );
};

export default LoginForm;