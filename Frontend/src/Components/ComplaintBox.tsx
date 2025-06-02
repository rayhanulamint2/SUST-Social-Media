import React, { useRef, useState } from "react";
import { FaTimes, FaImage, FaCheckCircle } from "react-icons/fa";

// Replace these with actual user data from context/auth if available
const user = {
  department: "CSE",
  hall: "Shahporan Hall",
};

const COMPLAINT_TYPES = [user.department, user.hall, "Administration"];

export default function ComplaintBox({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

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
    // Handle complaint submission here
    onClose();
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    type: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTypeToggle(type);
    }
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
          <p className="text-blue-300 text-sm mb-2">Raise your concern to the right authority</p>
        </div>
        <form className="flex flex-col gap-6 px-8 pb-8" onSubmit={handleSubmit}>
          {/* Complaint Types - Pill Buttons */}
          <div>
            <div
              id="complaint-type-label"
              className="text-blue-300 text-xs mb-2 font-semibold"
            >
              Complaint Context
            </div>
            <div className="flex gap-3 flex-wrap">
              {COMPLAINT_TYPES.map((type) => {
                const selected = selectedTypes.includes(type);
                return (
                  <button
                    type="button"
                    key={type}
                    role="checkbox"
                    aria-checked={selected}
                    aria-labelledby="complaint-type-label"
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold border transition-colors text-base shadow-sm
                      ${
                        selected
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg"
                          : "bg-gray-800/80 text-blue-200 border-blue-400 hover:bg-blue-900/40"
                      }`}
                    onClick={() => handleTypeToggle(type)}
                    onKeyDown={(e) => handleKeyDown(e, type)}
                    title={type}
                  >
                    {selected && (
                      <FaCheckCircle className="text-green-300 text-lg" />
                    )}
                    {type}
                  </button>
                );
              })}
            </div>
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