"use client";

const destinations = [
  { name: "Dworzec Zachodni", distance: "7.4" },
  { name: "Dom Marii", distance: "2.3" },
  { name: "Siłownia", distance: "3.6" },
];

import { useState } from "react";
import { Check, ChevronDown, Copy, CopyCheck } from "lucide-react";

export default function FuelCalc() {
  const [distance, setDistance] = useState("");
  const [fuelPrice, setFuelPrice] = useState("6");
  const [consumption, setConsumption] = useState("8");
  const [roundTrip, setRoundTrip] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [copied, setCopied] = useState(false); // Nowy stan do zarządzania ikoną

  const handleSelectDistance = (value: string, name: string) => {
    setDistance(value);
    setSelectedDestination(name);
    setShowDropdown(false);
  };

  // Calculate fuel cost
  const calculateCost = () => {
    const dist = Number.parseFloat(distance) || 0;
    const price = Number.parseFloat(fuelPrice) || 0;
    const cons = Number.parseFloat(consumption) || 0;

    const totalDistance = roundTrip ? dist * 2 : dist;
    const fuelNeeded = (totalDistance * cons) / 100;
    const totalCost = fuelNeeded * price;

    return totalCost.toFixed(2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(calculateCost());
    setCopied(true); // Ustaw ikonę na CopyCheck
    setTimeout(() => setCopied(false), 30000); // Przywróć ikonę po 30 sekundach
  };

  return (
    <div className="h-dvh bg-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 px-2">
        {/* Header */}
        <div className="text-center space-y-1 -mt-10 mb-20 pointer-events-none">
          <h1 className="text-7xl font-extralight text-stone-900">FuelCalc</h1>
          <p className="text-stone-600 text-lg font-light tracking-wider">
            Smart Fuel Cost Calculator
          </p>
        </div>

        {/* Distance Input */}
        <div className="relative space-y-4">
          <div className="relative">
            <input
              type="text"
              value={distance}
              onChange={(e) => {
                setDistance(e.target.value);
                setSelectedDestination("");
              }}
              className="w-full h-16 px-6 text-2xl font-light text-center bg-white border-2 border-stone-300 rounded-full focus:outline-none focus:border-stone-400 transition-colors shadow-custom"
              placeholder="distance"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <div className="absolute z-10 inset-y-0 right-4 flex items-center space-x-5">
              <span className="text-xl font-light text-stone-500">km</span>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-stone-100 rounded-full focus:outline-none"
              >
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-stone-500" />
              </button>
              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 w-min whitespace-nowrap bg-white border border-stone-300 rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    {destinations.map(({ name, distance }) => (
                      <li
                        onClick={() => handleSelectDistance(distance, name)}
                        className="px-3 sm:px-4 py-2 hover:bg-stone-100 cursor-pointer"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {selectedDestination && (
            <p className="absolute text-center text-stone-600 text-sm font-light bottom-0 left-1/2 transform -translate-x-1/2">
              ({selectedDestination})
            </p>
          )}
        </div>

        {/* Round Trip Checkbox */}
        <div className="flex items-center justify-center space-x-3">
          <span className="text-stone-700 text-lg font-light">round trip</span>
          <button
            onClick={() => setRoundTrip(!roundTrip)}
            className={`w-8 h-8 rounded-full border-2 flex items-center shadow-custom justify-center transition-all ${
              roundTrip
                ? "bg-stone-800 border-stone-800"
                : "bg-white border-stone-300 hover:border-stone-400"
            }`}
          >
            {roundTrip && <Check className="w-5 h-5 text-white" />}
          </button>
        </div>

        {/* Price and Consumption Inputs */}
        <div className="flex space-x-4">
          {/* Fuel Price Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              className="w-full h-14 px-4 text-xl font-light text-center shadow-custom bg-white border-2 border-stone-300 rounded-full focus:outline-none focus:border-stone-400 transition-colors"
              placeholder="6"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <div className="absolute inset-y-0 right-9 flex items-center pointer-events-none">
              <span className="text-base font-light text-stone-500">zł</span>
            </div>
          </div>

          {/* Fuel Consumption Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
              className="w-full h-14 px-4 text-xl shadow-custom font-light text-center bg-white border-2 border-stone-300 rounded-full focus:outline-none focus:border-stone-400 transition-colors"
              placeholder="8"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <span className="text-base font-light text-stone-500">
                l/100km
              </span>
            </div>
          </div>
        </div>

        {/* Cost Result */}
        <div className="pt-6 relative">
          <div className="text-center">
            <span className="text-stone-600 text-lg font-light">cost</span>
          </div>
          <div className="w-full h-20 px-6 bg-white border-2 shadow-custom border-stone-300 rounded-3xl flex items-center justify-center relative">
            <div className="relative flex justify-center items-center h-10">
              <span className="z-10 text-4xl font-light text-stone-900 text-center">
                {calculateCost()}
              </span>
              <span className="absolute left-full text-2xl font-light text-stone-500 ml-3 mt-2">
                zł
              </span>
            </div>
            {/* Ikona kopiowania */}
            <button
              onClick={handleCopy}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-stone-100 rounded-full shadow-custom hover:bg-stone-200 focus:outline-none transition-transform duration-200 ${
                copied ? "scale-110" : ""
              }`}
            >
              {copied ? (
                <CopyCheck className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-stone-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
