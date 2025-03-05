import { userState } from "react";

const RegistrationForm = () => {
    const [ formData, setFormData] = userState ({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = userState ({});

    const validate = () => {
        const newErrors = {};

        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
          console.log("Form submitted:", formData);
        }
      };


      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <span>{errors.username}</span>}
          </div>
    
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span>{errors.email}</span>}
          </div>
    
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span>{errors.password}</span>}
          </div>
    
          <button type="submit">Register</button>
        </form>
      );
}

export default RegistrationForm;