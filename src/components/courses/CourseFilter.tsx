
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/data";

interface CourseFilterProps {
  onFilter: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export interface FilterOptions {
  search: string;
  categories: string[];
  levels: string[];
  priceRange: [number, number];
  languages: string[];
}

const CourseFilter = ({ onFilter, isOpen, onToggle, className }: CourseFilterProps) => {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const applyFilters = () => {
    onFilter({
      search,
      categories: selectedCategories,
      levels: selectedLevels,
      priceRange,
      languages: selectedLanguages,
    });
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedLevels([]);
    setPriceRange([0, 10000]);
    setSelectedLanguages([]);
    
    onFilter({
      search: "",
      categories: [],
      levels: [],
      priceRange: [0, 10000],
      languages: [],
    });
  };

  return (
    <div className={className}>
      <div className="lg:hidden flex items-center justify-between mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToggle}
          className="flex items-center"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
        
        <form onSubmit={handleSearch} className="relative flex-1 max-w-sm ml-4">
          <Input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
          <Button 
            type="submit" 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
      
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="bg-card p-6 rounded-lg border space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Filters</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFilters}
              className="text-xs h-8"
            >
              Reset
            </Button>
          </div>
          
          {/* Search - Only visible in desktop */}
          <form onSubmit={handleSearch} className="hidden lg:block">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10"
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
          
          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium mb-3">Categories</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm font-normal cursor-pointer"
                  >
                    {category.name}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({category.courses})
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Price Range</h4>
              <span className="text-xs text-muted-foreground">
                Rs {priceRange[0]} - Rs {priceRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={priceRange}
              min={0}
              max={10000}
              step={500}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="my-4"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Rs 0</span>
              <span className="text-xs text-muted-foreground">Rs 10,000</span>
            </div>
          </div>
          
          {/* Level */}
          <div>
            <h4 className="text-sm font-medium mb-3">Level</h4>
            <div className="space-y-2">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <div key={level} className="flex items-center">
                  <Checkbox
                    id={`level-${level}`}
                    checked={selectedLevels.includes(level)}
                    onCheckedChange={() => handleLevelChange(level)}
                  />
                  <Label
                    htmlFor={`level-${level}`}
                    className="ml-2 text-sm font-normal cursor-pointer"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Language */}
          <div>
            <h4 className="text-sm font-medium mb-3">Language</h4>
            <div className="space-y-2">
              {["English", "Nepali", "Both"].map((language) => (
                <div key={language} className="flex items-center">
                  <Checkbox
                    id={`language-${language}`}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={() => handleLanguageChange(language)}
                  />
                  <Label
                    htmlFor={`language-${language}`}
                    className="ml-2 text-sm font-normal cursor-pointer"
                  >
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={applyFilters} 
            className="w-full"
          >
            Apply Filters
          </Button>
          
          {/* Close button on mobile */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            className="w-full mt-4 lg:hidden"
          >
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
