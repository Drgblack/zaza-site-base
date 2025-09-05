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
    <div className="sticky top-[72px] z-20 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 mb-8">
      <div className="py-4 px-4">
        {/* Search Bar */}
        <div className="relative w-full max-w-md md:max-w-lg mx-auto mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-10 py-3 text-base rounded-full border-gray-200 focus:border-purple-300 focus:ring-purple-200 bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`
                cursor-pointer transition-all duration-200 hover:scale-105 shrink-0 snap-start
                ${selectedCategory === category 
                  ? "bg-purple-600 text-white hover:bg-purple-700" 
                  : "hover:bg-purple-50 hover:border-purple-200 bg-white"
                }
              `}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}