import React, { useRef, useState } from "react";
import { FaTimes, FaImage } from "react-icons/fa";

// Replace these with actual user data from context/auth if available
const user = {
  department: "CSE",
  hall: "Shahporan Hall",
};

const CONTEXT_OPTIONS = [
  "Not Specified",
  "FES",
  "ARC",
  "CEP",
  "CEE",
  "CSE",
  "EEE",
  "FET",
  "IPE",
  "MEE",
  "PME",
  "SWE",
  "BMB",
  "GEB",
  "Business Administration",
  "Chemistry",
  "Mathematics",
  "Physics",
  "Statistics",
  "GEE",
  "OCG",
  "ANP",
  "BNG",
  "ECO",
  "ENG",
  "PSS",
  "PAD",
  "SCW",
  "SOC",
  "Academic Building A",
  "Academic Building B",
  "Academic Building C",
  "Academic Building D",
  "Academic Building E",
  "D Building Extension",
  "SUST IICT",
  "SUST Library",
  "SUST Central Mosque",
  "SUST Central Cafeteria",
  "Administration Building",
  "Controller Building",
  "Post Office",
  "SUST Bank",
  "Foodcourt",
  "SUST Medical Center",
  "SUST Central Field",
  "SUST Handball Field",
  "SUST Basketball Court",
  "SUST Shaheed Minar",
  "SUST Golchottor",
  "SUST Central Auditorium",
  "SUST Mini Auditorium",
  "Shahporan Hall",
  "Second Hall",
  "Syed Mujtaba Ali Hall",
  "First ladies hall",
  "Begum Sirajunnesa Chowdhury hall",
  "Begum Fajilatunnesa mujib hall",
];

export default function ComplaintBox({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedContext, setSelectedContext] = useState<string>(
    user.department
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle complaint submission here, use selectedContext as the context
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-lg bg-gradient-to-br from-blue-950 via-gray-900 to-blue-900 rounded-2xl shadow-2xl p-0 border border-blue-700/30">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-2xl"
          onClick={onClose}
          title="Close"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        {/* Title */}
        <div className="px-8 pt-8 pb-2 text-center">
          <h2 className="text-3xl font-bold text-blue-200 mb-1 tracking-wide drop-shadow">
            SUSTverse Complaint Box
          </h2>
          <p className="text-blue-300 text-sm mb-2">
            Raise your concern to the right authority
          </p>
        </div>
        <form className="flex flex-col gap-6 px-8 pb-8" onSubmit={handleSubmit}>
          {/* Complaint Context Dropdown */}
          <div>
            <label
              htmlFor="complaint-context"
              className="block text-blue-300 text-xs mb-2 font-semibold"
            >
              Complaint Context
            </label>
            <select
              id="complaint-context"
              value={selectedContext}
              onChange={(e) => setSelectedContext(e.target.value)}
              className="w-full max-w-xs px-4 py-2 rounded-lg bg-gray-800 text-blue-100 border border-blue-700 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              {CONTEXT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {/* Date and Time */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                className="block text-xs text-blue-300 mb-1"
                htmlFor="complaint-date"
              >
                Date
              </label>
              <input
                id="complaint-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-gray-800/80 border border-blue-400/20 text-blue-100 shadow focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-xs text-blue-300 mb-1"
                htmlFor="complaint-time"
              >
                Time
              </label>
              <input
                id="complaint-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-gray-800/80 border border-blue-400/20 text-blue-100 shadow focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          {/* Description */}
          <div>
            <label
              className="block text-xs text-blue-300 mb-1"
              htmlFor="complaint-desc"
            >
              Description
            </label>
            <textarea
              id="complaint-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-800/80 text-blue-100 px-4 py-3 rounded-xl outline-none border-none text-base font-normal shadow-inner resize-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Describe your complaint..."
              required
            />
          </div>
          {/* Image Upload */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold hover:from-blue-800 hover:to-indigo-800 transition-colors shadow"
              onClick={() => fileInputRef.current?.click()}
              title="Upload Image"
            >
              <FaImage />
              Upload Picture
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
              title="Upload an image"
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-xl border-2 border-blue-400 shadow"
              />
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors mt-2"
          >
            Raise a Complaint
          </button>
        </form>
      </div>
    </div>
  );
}
