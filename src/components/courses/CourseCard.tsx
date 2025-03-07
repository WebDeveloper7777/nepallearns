
import { Link } from "react-router-dom";
import { Clock, BookOpen, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Course } from "@/types";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  course: Course;
  className?: string;
}

const CourseCard = ({ course, className }: CourseCardProps) => {
  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString()}`;
  };

  return (
    <Link 
      to={`/courses/${course.id}`}
      className={cn(
        "group flex flex-col bg-card rounded-lg border overflow-hidden transition-all",
        "hover:shadow-lg hover:-translate-y-1 focus:ring-2 focus:ring-primary focus:outline-none",
        className
      )}
    >
      <div className="relative overflow-hidden">
        {/* Course image */}
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
          />
        </div>
        
        {/* Course badges */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {course.featured && (
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
          )}
          {course.popular && (
            <Badge className="bg-orange-500 text-white">Popular</Badge>
          )}
          {course.new && (
            <Badge className="bg-green-500 text-white">New</Badge>
          )}
        </div>
        
        {/* Course category */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
          <span className="text-xs text-white/90 font-medium">
            {course.category.name}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-5 flex flex-col">
        {/* Course title */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        
        {/* Course description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {course.description}
        </p>
        
        {/* Course stats */}
        <div className="flex items-center text-xs text-muted-foreground space-x-2 mt-auto mb-3">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-muted-foreground/30"></div>
          <div className="flex items-center">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-muted-foreground/30"></div>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
            <span>{course.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          {/* Instructor */}
          <div className="flex items-center">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-xs font-medium">
              {course.instructor.name}
            </span>
          </div>
          
          {/* Enrollment count */}
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{course.enrolledStudents}</span>
          </div>
        </div>
      </div>
      
      {/* Course price */}
      <div className="px-5 py-3 bg-secondary/50 border-t">
        <div className="flex items-center justify-between">
          <div>
            {course.discountPrice ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(course.discountPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through ml-2">
                  {formatPrice(course.price)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">
                {formatPrice(course.price)}
              </span>
            )}
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs capitalize",
              course.level === "Beginner" && "border-green-500 text-green-600",
              course.level === "Intermediate" && "border-blue-500 text-blue-600",
              course.level === "Advanced" && "border-purple-500 text-purple-600"
            )}
          >
            {course.level}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
