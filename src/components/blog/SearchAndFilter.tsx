"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  selectedCategory?: string;
  categories: string[];
}

export default function SearchAndFilter({ 
  onSearch, 
  onCategoryFilter, 
  selectedCategory, 
  categories 
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleCategoryClick = (category: string) => {
    onCategoryFilter(category === selectedCategory ? "All Articles" : category);
  };

  return (
    <div className="mb-8 px-4">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 py-3 rounded-full border-gray-200 focus:border-purple-300 focus:ring-purple-200"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`
              cursor-pointer transition-all duration-200 hover:scale-105
              ${selectedCategory === category 
                ? "bg-purple-600 text-white hover:bg-purple-700" 
                : "hover:bg-purple-50 hover:border-purple-200"
              }
            `}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
}