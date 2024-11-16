"use client";

import type { AIResponse } from "@/types";
import { actions, isActionError } from "astro:actions";
import { useState } from "react";

export default function BrandNameGenerator() {
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("3");
  const [brandNames, setBrandNames] = useState<AIResponse["brandNames"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const generateBrandNames = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await actions.generateNames({ description });
    if (error) {
      if (isActionError(error)) {
        console.log(error);
        return;
      }

      console.log(error);
      return;
    }
    // Simulating API call for brand name generation
    const names = data.data.brandNames as AIResponse["brandNames"];
    console.log(names);
    setBrandNames(names);
    setIsLoading(false);
  };

  const generateNames = (desc: string, count: number) => {
    // This is a simple name generation logic. In a real application, you might use an AI service or more complex algorithm.
    const words = desc.split(" ");
    const names = [];
    for (let i = 0; i < count; i++) {
      const name =
        words[Math.floor(Math.random() * words.length)] +
        words[Math.floor(Math.random() * words.length)];
      names.push({ name, domain: null, social: null });
    }
    return names;
  };

  // TODO
  const checkAvailability = async (name: string) => {
  };

  // TODO
  const checkNameAvailability = async (index: number) => {
  };

  const closeGeneratedCard = () => {
    setBrandNames([]);
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      {brandNames.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-zinc-50 mt-16">
          <h1 className="text-2xl font-bold mb-2">Brand Name Generator</h1>
          <p className="text-gray-600 mb-4">
            Generate unique brand names from your idea description
          </p>
          <form onSubmit={generateBrandNames} className="space-y-4">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Idea Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your idea description"
              />
            </div>
            <div>
              <label
                htmlFor="count"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Number of Names
              </label>
              <select
                id="count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Generate Brand Names"}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-center relative">
            <button
              onClick={closeGeneratedCard}
              className="absolute left-0 top-0 text-lg bg-zinc-100 px-2 rounded-md"
            >
              x
            </button>
            <h2 className="text-center text-xl font-bold mb-2">
              Generated Brand Names
            </h2>
          </div>
          <p className="text-gray-600 mb-4">
            Click on a name to check availability
          </p>
          <ul className="space-y-2">
            {brandNames.map((brand, index) => (
              <li
                key={brand+index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
              >
                <span className="font-medium">{brand}</span>
                <div>
                  <button
                    onClick={() => checkNameAvailability(index)}
                    className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Check Availability
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
