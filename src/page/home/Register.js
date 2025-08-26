import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAccount } from "../../api/function";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFromData] = useState({
    full_name: "",
    birthday: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const newErrors = {};
    const {
      full_name,
      birthday,
      gender,
      email,
      phone,
      password,
      confirmPassword,
    } = formData;

    if (!full_name) newErrors.full_name = "Vui lòng nhập Họ và Tên.";
    if (!birthday) newErrors.birthday = "Vui lòng nhập Ngày sinh.";
    if (!gender) newErrors.gender = "Vui lòng chọn Giới tính.";
    if (!email) {
      newErrors.email = "Vui lòng nhập Email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!phone) newErrors.phone = "Vui lòng nhập Số điện thoại.";
    if (!password) newErrors.password = "Vui lòng nhập Mật khẩu.";
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validateForm()) {
    //   return;
    // }
    setIsLoading(true);
    try {
      const rs = await registerAccount({
        full_name: formData.full_name,
        username: formData.email,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        birthday: formData.birthday,
      });
      navigate("/otp", {
        state: { email: formData.email, case: "vefify-account" },
      });
    } catch (error) {
      const errors = error.response?.data?.errors;
      if (errors) {
        Object.values(errors).forEach((errArray) => {
          errArray.forEach((msg) => toast.error(msg));
        });
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Register</h2>

      <div className="form-group">
        <label htmlFor="full_name">Full name:</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          value={formData.full_name}
          onChange={handleChange}
        />
        {errors.full_name && (
          <p className="error-message">{errors.full_name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="birthday">Date of birth:</label>
        <input
          id="birthday"
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
        />
        {errors.birthday && <p className="error-message">{errors.birthday}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="0">Male</option>
          <option value="1">Female</option>
          <option value="2">Other</option>
        </select>
        {errors.gender && <p className="error-message">{errors.gender}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
      </div>

      {errors.api && (
        <p className="error-message" style={{ textAlign: "center" }}>
          {errors.api}
        </p>
      )}

      <button type="submit" className="submit-btn" disabled={isLoading}>
        Register
      </button>
    </form>
  );
}

export default Register;
