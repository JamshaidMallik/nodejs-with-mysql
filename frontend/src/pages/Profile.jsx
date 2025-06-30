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

  const [selectedImage, setSelectedImage] = useState(null); // new image file
  const [previewImage, setPreviewImage] = useState(null);   // preview URL

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
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
    const loadProfile = () => {
      fetchProfile().catch((err) => {
        console.error("Unhandled fetchProfile error:", err);
      });
    };
    loadProfile();
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
      toast.success("Profile updated successfully!");
      await fetchProfile();
      setSelectedImage(null);
      setPreviewImage(null);
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
        {loading && <p className="text-center text-gray-600 animate-pulse">Loading profile...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && userData && (
          <div className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <img
                src={
                  previewImage ||
                  (userData.profile_image
                    ? `${getProfileImageUrl(userData.profile_image)}`
                    : 'https://placehold.co/600x400')
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md transition-transform duration-300 hover:scale-105"
              />
              <div className="flex flex-col items-center space-y-1">
                <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
                <p className="text-sm text-gray-500">
                  Joined:{' '}
                  {new Date(userData.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <label className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-md shadow hover:from-red-600 hover:to-red-700 cursor-pointer transition-colors duration-300">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v16h16V4H4zm8 14v-4m0 0l-2 2m2-2l2 2m-2-2V8"
                  />
                </svg>
                Select Profile Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                rows={3}
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow duration-200 resize-none"
                placeholder="Tell something about yourself..."
              ></textarea>
            </div>

            <button
              onClick={handleUpdate}
              className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-200"
            >
              Save Changes
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-3 px-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
