import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerAccount } from "../../api/function";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    birthday: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    avatar: null, // file ảnh
    avatarPreview: null, // link preview
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // cleanup URL khi component unmount để tránh rò rỉ bộ nhớ
  useEffect(() => {
    return () => {
      if (formData.avatarPreview) {
        URL.revokeObjectURL(formData.avatarPreview);
      }
    };
  }, [formData.avatarPreview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("full_name", formData.full_name);
      formDataToSend.append("username", formData.email);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("birthday", formData.birthday);
      // if (formData.avatar) {
        formDataToSend.append("image", formData.avatar);
      // }

      const rs = await registerAccount(formDataToSend);

      navigate("/otp", {
        state: { email: formData.email, case: "verify-account" },
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
      <div className="form-group">
        <label htmlFor="avatar">Avatar:</label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        {errors.avatar && <p className="error-message">{errors.avatar}</p>}
        {formData.avatarPreview && (
          <div className="mt-3">
            <img
              src={formData.avatarPreview}
              alt="Preview Avatar"
              className="w-24 h-24 object-cover rounded-full border shadow"
            />
          </div>
        )}
      </div>

      {errors.api && (
        <p className="error-message" style={{ textAlign: "center" }}>
          {errors.api}
        </p>
      )}

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? "Loading..." : "Register"}
      </button>
    </form>
  );
}

export default Register;
