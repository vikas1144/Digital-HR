import React, { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import aryan from '../../assets/aryan.png'

const fixedDocId = "employeeProfile"; // fixed doc id to store data

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    employeeId: "",
    status: "",
    department: "",
    address: "",
    hireDate: "",
    birthDate: "",
    position: "",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  // Load profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "profiles", fixedDocId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storage = getStorage();
    const storageRef = ref(storage, `profilePictures/${fixedDocId}`);

    try {
      setUploading(true);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setProfile((prev) => ({ ...prev, avatarUrl: downloadURL }));
      setMessage("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Failed to upload image.");
    }
    setUploading(false);
  };

  // Save updated profile
  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const docRef = doc(db, "profiles", fixedDocId);
      await setDoc(docRef, profile);
      setMessage("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Failed to save profile.");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="text-gray-800 p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-white">My Profile</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Editable Profile Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full lg:w-1/3">
          <div className="flex flex-col items-center text-center">
            <img
              src={aryan}
              alt="Profile"
              className="rounded-full w-28 h-28 mb-4 object-cover"
            />

            {/* Upload Image Button */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />
            {uploading && <p className="text-blue-500">Uploading...</p>}

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border rounded px-2 py-1 mb-2 w-full text-center"
            />
            <input
              type="text"
              name="position"
              value={profile.position}
              onChange={handleChange}
              placeholder="Position"
              className="border rounded px-2 py-1 mb-4 w-full text-center"
            />

            <div className="text-sm space-y-1 text-left w-full">
              {/* Same fields as before */}
              {[
                { label: "Email", type: "email", name: "email" },
                { label: "Phone", type: "text", name: "phone" },
                { label: "Employee ID", type: "text", name: "employeeId" },
                { label: "Status", type: "text", name: "status" },
                { label: "Department", type: "text", name: "department" },
                { label: "Address", type: "text", name: "address" },
                { label: "Hire Date", type: "date", name: "hireDate" },
                { label: "Birth Date", type: "date", name: "birthDate" },
              ].map((field) => (
                <label key={field.name} className="block">
                  <strong>{field.label}:</strong>
                  <input
                    type={field.type}
                    name={field.name}
                    value={profile[field.name]}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
              ))}
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>

            {message && (
              <p
                className={`mt-2 text-center ${
                  message.includes("Failed") ? "text-red-500" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Right Section - Calendar & Events (unchanged) */}
        <div className="flex flex-col gap-6 w-full lg:w-2/3">
          {/* Calendar Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold mb-2">Calendar</h4>
            <div className="flex flex-col items-center">
              <CalendarDays className="text-4xl text-gray-400 mb-2" />
              <p className="text-gray-500">August 2025</p>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold mb-4">Upcoming Events</h4>
            <ul className="space-y-3 text-sm">
              <li className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-2 rounded">
                <p className="font-medium">Design Review</p>
                <p className="text-gray-500 text-xs">10:00 AM - 11:00 AM</p>
              </li>
              <li className="border-l-4 border-green-500 pl-4 bg-green-50 py-2 rounded">
                <p className="font-medium">Team Standup</p>
                <p className="text-gray-500 text-xs">1:00 PM - 1:30 PM</p>
              </li>
              <li className="border-l-4 border-purple-500 pl-4 bg-purple-50 py-2 rounded">
                <p className="font-medium">Dev Sprint</p>
                <p className="text-gray-500 text-xs">3:00 PM - 4:00 PM</p>
              </li>
            </ul>
          </div>

          {/* Onboarding Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold mb-2">
              Onboarding Progress <span className="text-purple-600">75%</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>✔ Access software suite</span>
                <span className="text-green-600">Completed</span>
              </li>
              <li className="flex justify-between">
                <span>✔ HR meeting</span>
                <span className="text-green-600">Completed</span>
              </li>
              <li className="flex justify-between">
                <span>Office tour</span>
                <span className="text-yellow-500">In Progress</span>
              </li>
              <li className="flex justify-between">
                <span>Email setup</span>
                <span className="text-gray-400">Pending</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
