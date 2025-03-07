
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { courses } from "@/lib/data";
import CourseCard from "@/components/courses/CourseCard";
import { Course } from "@/types";

const FeaturedCourses = () => {
  const [activeFilter, setActiveFilter] = useState<string>("featured");
  
  const filteredCourses: Course[] = courses.filter(course => {
    if (activeFilter === "featured") return course.featured;
    if (activeFilter === "popular") return course.popular;
    if (activeFilter === "new") return course.new;
    return true;
  }).slice(0, 4);

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Discover Our Top Courses
            </h2>
            <p className="text-muted-foreground">
              Explore our handpicked selection of courses designed to help you excel in your academic
              and professional journey.
            </p>
          </div>
          
          <div className="flex space-x-2 mt-6 md:mt-0">
            <Button
              variant={activeFilter === "featured" ? "default" : "outline"}
              onClick={() => setActiveFilter("featured")}
              className="text-sm"
            >
              Featured
            </Button>
            <Button
              variant={activeFilter === "popular" ? "default" : "outline"}
              onClick={() => setActiveFilter("popular")}
              className="text-sm"
            >
              Popular
            </Button>
            <Button
              variant={activeFilter === "new" ? "default" : "outline"}
              onClick={() => setActiveFilter("new")}
              className="text-sm"
            >
              New
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/courses">
            <Button variant="outline" size="lg" className="group">
              Browse All Courses
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
