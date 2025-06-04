import { useRef, useState } from "react";
import { FaFileUpload, FaSave } from "react-icons/fa";

export default function AdminCreateNotice() {
    const [noticeName, setNoticeName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [docName, setDocName] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDocName(e.target.files[0].name);
        }
    };

    const handleSave = () => {
        // Save logic here (send to backend)
        // Reset form after save
        setNoticeName("");
        setStartDate("");
        setStartTime("");
        setEndDate("");
        setEndTime("");
        setDocName("");
        alert("Notice saved!");
    };

    return (
        <div className="mml-[1vw] mt-2 px-24 py-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-[calc(100vh-4rem)]">
            <div className="max-w-xl mx-auto bg-gradient-to-br from-blue-950/80 to-gray-900/80 border border-blue-900/30 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-blue-200 mb-2">Create Notice</h2>
                {/* Notice Name */}
                <div>
                    <label className="block text-blue-300 font-semibold mb-1">
                        Notice Name
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-blue-100 border border-blue-700 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={noticeName}
                        onChange={(e) => setNoticeName(e.target.value)}
                        placeholder="Enter notice name"
                    />
                </div>
                {/* Start Date & Time */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-blue-300 font-semibold mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-blue-100 border border-blue-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="Select start date"
                            title="Start Date"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-blue-300 font-semibold mb-1">
                            Start Time
                        </label>
                        <input
                            type="time"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-blue-100 border border-blue-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            placeholder="Select start time"
                            title="Start Time"
                        />
                    </div>
                </div>
                {/* End Date & Time */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-blue-300 font-semibold mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-blue-100 border border-blue-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="Select end date"
                            title="End Date"
                        />
                    </div>