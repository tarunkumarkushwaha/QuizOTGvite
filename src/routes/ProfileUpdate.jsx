import React, { useContext, useEffect, useState } from "react";
import { Context } from "../MyContext";
import { toast } from "react-toastify";

const ProfileUpdate = () => {
  const { backendURL, accessToken } = useContext(Context);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
    location: "",
    website: "",
    profilePic: "",
  });

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(`${backendURL}/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        const user = data.user || data;
        const profile = data.profile || data;

        console.log(data, "data");

        setFormData({
          username: user.username || "",
          displayName: profile.displayName || "",
          bio: profile.bio || "",
          location: profile.location || "",
          website: profile.website || "",
          profilePic: profile.profilePic || "",
        });
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      loadProfile();
    }
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const dataToSend = new FormData();

      dataToSend.append("username", formData.username || "");
      dataToSend.append("displayName", formData.displayName || "");
      dataToSend.append("bio", formData.bio || "");
      dataToSend.append("location", formData.location || "");
      dataToSend.append("website", formData.website || "");

      if (formData.profilePic instanceof File) {
        dataToSend.append("profilePic", formData.profilePic);
      }

      const res = await fetch(`${backendURL}/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: dataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      toast.success(data.message || "Profile updated successfully");

      if (data.user || data.profile) {
        setFormData((prev) => ({
          ...prev,

          ...(data.user || {}),

          ...(data.profile || {}),
        }));
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div
              className="mx-auto w-28 h-28 rounded-full overflow-hidden
              bg-gradient-to-br from-blue-500 to-purple-600
              flex items-center justify-center shadow-lg"
            >
              {formData.profilePic ? (
                <img
                  src={formData.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {formData.username?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-slate-800 mt-5">
              Edit Profile
            </h1>

            <p className="text-slate-500 mt-2">
              Update your profile information
            </p>
          </div>

          <form onSubmit={updateProfile} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300
                px-4 py-3 outline-none
                focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Display Name
              </label>

              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-300
                px-4 py-3 outline-none
                focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Bio
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell something about yourself..."
                rows={4}
                maxLength={500}
                className="w-full rounded-xl border border-slate-300
                px-4 py-3 outline-none resize-none
                focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-xs text-slate-400 text-right mt-1">
                {formData.bio.length}/500
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Your location"
                className="w-full rounded-xl border border-slate-300
                px-4 py-3 outline-none
                focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Website
              </label>

              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full rounded-xl border border-slate-300
                px-4 py-3 outline-none
                focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Profile Picture URL
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setFormData((prev) => ({
                      ...prev,
                      profilePic: file,
                    }));

                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              {preview && <img
                src={preview || formData.profilePic || "/default-profile.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />}
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl
              bg-gradient-to-r from-blue-500 to-purple-600
              text-white font-semibold
              shadow-lg transition
              hover:shadow-xl
              disabled:opacity-50
              active:scale-[0.98]"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
