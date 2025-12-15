"use client"; // This is required for Next.js App Router

import React, { useState } from "react";

export default function SellPage() {
  // 1. State to handle the form data
  const [formData, setFormData] = useState({
    cropName: "",
    variety: "",
    price: "",
    location: "",
    mobile: "",
  });

  // 2. State to handle the visibility of the dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // 3. List of crops for the dropdown
  const cropOptions = [
    "Wheat",
    "Rice",
    "Corn",
    "Barley",
    "Sugarcane",
    "Cotton",
    "Soybean",
    "Mustard",
  ];

  // Handle simple input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (Just a placeholder for now)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Listing Submitted! (Check console for data)");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      
      {/* --- Main Card Container --- */}
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-md overflow-hidden">
        
        {/* --- Header Section (Green) --- */}
        <div className="bg-green-600 p-6">
          <h1 className="text-2xl font-bold text-white">Sell Your Produce</h1>
          <p className="text-green-100">List your crop on the live market.</p>
        </div>

        {/* --- Form Section --- */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Crop Name Field (WITH THE FIX) */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Crop Name
              </label>
              <input
                type="text"
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
                onFocus={() => setShowDropdown(true)}
                // We delay hiding slightly so the click on the item registers
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
                placeholder="Select or type..."
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                autoComplete="off"
              />

              {/* THE DROPDOWN LIST */}
              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {cropOptions
                    .filter((crop) =>
                      crop.toLowerCase().includes(formData.cropName.toLowerCase())
                    )
                    .map((crop) => (
                      <div
                        key={crop}
                        onClick={() => {
                          setFormData({ ...formData, cropName: crop });
                          setShowDropdown(false);
                        }}
                        // --- THE FIX IS HERE ---
                        // text-gray-900 (Dark Text) by default
                        // hover:text-white (White Text) only on hover
                        className="cursor-pointer px-4 py-2 text-gray-900 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        {crop}
                      </div>
                    ))}
                  {/* Message if no crop matches */}
                  {cropOptions.filter((c) => 
                     c.toLowerCase().includes(formData.cropName.toLowerCase())
                  ).length === 0 && (
                     <div className="px-4 py-2 text-gray-500">No matching crops</div>
                  )}
                </div>
              )}
            </div>

            {/* 2. Variety Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Variety (Optional)
              </label>
              <input
                type="text"
                name="variety"
                value={formData.variety}
                onChange={handleChange}
                placeholder="e.g. Basmati"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              />
            </div>

            {/* 3. Your Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Amritsar, Punjab"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              />
            </div>

            {/* 4. Expected Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Expected Price (₹/Quintal)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="2200"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              />
            </div>
            
             {/* 5. Mobile Number */}
             <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              />
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-md hover:bg-slate-800 transition-colors"
          >
            List My Crop
          </button>

        </form>
      </div>
    </div>
  );
}