import React, { useState, useEffect } from "react";
import { accountDetal, accountUpdate, url } from "../../api/function";
import { toast } from "react-toastify";

function Profile() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    fectData();
  }, []);
  const fectData = async () => {
    try {
      const rs = await accountDetal();
      console.log(rs?.data?.data);
      setFormData(rs?.data?.data || {});
      if (rs?.data?.data?.avata) {
        setPreview(url + "" + rs?.data?.data?.avata); // url ảnh cũ từ server
      }
    } catch (error) {}
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); // xem trước ảnh
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== null) {
          form.append(key, formData[key]);
        }
      });
      if (avatar) {
        form.append("avata", avatar);
      }
      const rs = await accountUpdate(form);
      toast.success("update profile success");
      setLoading(false);
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (Array.isArray(errors)) {
        errors.forEach((msg) => toast.error(msg));
      } else if (typeof errors === "object" && errors !== null) {
        Object.values(errors).forEach((errArray) => {
          if (Array.isArray(errArray)) {
            errArray.forEach((msg) => toast.error(msg));
          } else {
            toast.error(errArray);
          }
        });
      } else if (typeof errors === "string") {
        toast.error(errors);
      } else {
        toast.error("An error occurred, please try again.!");
      }

      setLoading(false);
    }
  };
  return (
    <div>
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg mt-3">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="avatar preview"
                className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-200 mb-3"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-3 text-gray-500">
                No Avatar
              </div>
            )}
            <label className="cursor-pointer text-blue-600 hover:underline text-sm">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              Change Avatar
            </label>
          </div>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="gender"
            value={formData.sex}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>

          {/* Birthday */}
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password old */}
          <input
            type="password"
            name="old_password"
            onChange={handleChange}
            placeholder="Old Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password new */}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="New Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
