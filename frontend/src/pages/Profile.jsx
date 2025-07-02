import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import authApi from "../api/authApi";
import { getProfileImageUrl } from '../utils/AppUtils';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        navigate("/");
      }
    });
  };

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.getProfile();
      const data = response.data;
      setUserData(data);
      setNewName(data.name);
      setNewBio(data.bio || "");
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    if (!newName.trim()) {
      toast.error("Name cannot be empty!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newName);
    formData.append("bio", newBio);
    if (selectedImage) formData.append("profile_image", selectedImage);

    try {
      await authApi.updateProfile(formData);
      toast.success("Profile updated!");
      await fetchProfile();
      setSelectedImage(null);
      setPreviewImage(null);
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err.message || "Update failed");
    }
  };

  return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row mx-4">
          {/* Profile Header */}
          <div className="flex-1 bg-gradient-to-b from-purple-700 to-pink-600 text-white flex flex-col justify-center items-center p-6 sm:p-8">
            {loading && <p className="text-center text-white animate-pulse">Loading...</p>}
            {error && <p className="text-center text-red-200">{error}</p>}

            {!loading && !error && userData && (
                <>
                  <img
                      src={previewImage || (userData.profile_image ? getProfileImageUrl(userData.profile_image) : 'https://placehold.co/600x400')}
                      alt="Profile"
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-xl transform hover:scale-110 transition-transform duration-300 mb-4"
                  />
                  <h2 className="text-2xl sm:text-3xl font-bold text-center">{userData.name}</h2>
                  <p className="text-xs sm:text-sm text-white/80 mt-1 text-center break-words">{userData.email}</p>
                  <p className="text-xs mt-1 text-center">
                    Joined {new Date(userData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </>
            )}
          </div>

          {/* Profile Form */}
          {!loading && !error && userData && (
              <div className="flex-1 p-6 sm:p-8 space-y-6 flex flex-col justify-center bg-white">
                <div className="flex justify-center">
                  <label className="inline-flex items-center px-4 py-2 bg-purple-700 text-white rounded-md shadow hover:bg-purple-800 cursor-pointer transition duration-200">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4zm8 14v-4m0 0l-2 2m2-2l2 2m-2-2V8" />
                    </svg>
                    Change Profile Image
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-200"
                      required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                      rows={3}
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-200 resize-none"
                      placeholder="Tell something about yourself..."
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                      onClick={handleUpdate}
                      className="flex-1 py-3 rounded-lg bg-purple-700 text-white font-semibold shadow hover:bg-purple-800 transition-all duration-200"
                  >
                    Save Changes
                  </button>

                  <button
                      onClick={handleLogout}
                      className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold shadow hover:bg-gray-100 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
          )}
        </div>
      </div>
  );

};

export default Profile;
