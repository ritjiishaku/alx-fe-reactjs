import { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", { username, email, password });
      // Simulate API call
      setUsername("");
      setEmail("");
      setPassword("");
    }
    setErrors(newErrors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input 
          type="text" 
          name="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
