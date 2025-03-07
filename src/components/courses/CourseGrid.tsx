
import { Course } from "@/types";
import CourseCard from "./CourseCard";
import { motion } from "framer-motion";

interface CourseGridProps {
  courses: Course[];
  isLoading?: boolean;
}

const CourseGrid = ({ courses, isLoading = false }: CourseGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div 
            key={index} 
            className="bg-card rounded-lg border overflow-hidden animate-pulse"
          >
            <div className="aspect-[16/9] bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-10 bg-gray-200 rounded w-full mt-6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No courses found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <CourseCard course={course} />
        </motion.div>
      ))}
    </div>
  );
};

export default CourseGrid;
