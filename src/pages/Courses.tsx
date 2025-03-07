
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseFilter from "@/components/courses/CourseFilter";
import CourseGrid from "@/components/courses/CourseGrid";
import { courses, categories } from "@/lib/data";
import { Course, Category } from "@/types";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<string>("newest");
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      // Find the category by name (converted from URL format)
      const formattedParam = categoryParam.replace(/-/g, " ");
      const category = categories.find(
        cat => cat.name.toLowerCase() === formattedParam.toLowerCase()
      );
      if (category) {
        setActiveCategory(category.id);
      }
    }
  }, [searchParams]);

  // Filter courses based on selected filters
  useEffect(() => {
    let result = [...courses];
    
    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(course => course.category.id === activeCategory);
    }
    
    // Filter by level
    if (selectedLevel !== "all") {
      result = result.filter(course => course.level === selectedLevel);
    }
    
    // Filter by language
    if (selectedLanguage !== "all") {
      result = result.filter(course => 
        course.language === selectedLanguage || course.language === "Both"
      );
    }
    
    // Filter by price range
    result = result.filter(
      course => {
        const coursePrice = course.discountPrice || course.price;
        return coursePrice >= priceRange[0] && coursePrice <= priceRange[1];
      }
    );
    
    // Sort
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        result.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case "popular":
        result.sort((a, b) => b.enrolledStudents - a.enrolledStudents);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        // Assuming courses are already sorted by newest in the data
        break;
    }
    
    setFilteredCourses(result);
  }, [activeCategory, selectedLevel, selectedLanguage, priceRange, sortBy]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Page Header */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Our Courses</h1>
              <p className="text-muted-foreground">
                Discover courses tailored for Nepali students, from academic subjects to professional skills.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Filters */}
              <div className="w-full md:w-1/4 lg:w-1/5">
                <CourseFilter 
                  categories={categories}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  selectedLevel={selectedLevel}
                  setSelectedLevel={setSelectedLevel}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>
              
              {/* Course Grid */}
              <div className="w-full md:w-3/4 lg:w-4/5">
                <CourseGrid courses={filteredCourses} />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
