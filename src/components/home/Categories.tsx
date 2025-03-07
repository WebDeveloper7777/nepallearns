
import { Link } from "react-router-dom";
import { 
  Cpu, Code, Globe, BarChart, Shield, Smartphone, Layout, Wifi
} from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryProps = {
  name: string;
  icon: React.ReactNode;
  courses: number;
  color: string;
  className?: string;
};

const CategoryItem = ({ name, icon, courses, color, className }: CategoryProps) => (
  <Link 
    to={`/courses?category=${name.toLowerCase().replace(/\s+/g, "-")}`}
    className={cn(
      "group flex flex-col items-center p-6 rounded-lg transition-all duration-300",
      "border border-border/50 hover:border-primary/50",
      "bg-card hover:shadow-lg hover:-translate-y-1",
      className
    )}
  >
    <div 
      className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center mb-4",
        "transition-all duration-300 group-hover:scale-110",
        color
      )}
    >
      {icon}
    </div>
    <h3 className="text-lg font-medium mb-1">{name}</h3>
    <p className="text-sm text-muted-foreground">{courses} Courses</p>
  </Link>
);

const Categories = () => {
  const categories = [
    { 
      name: "Computer Science", 
      icon: <Cpu className="h-6 w-6 text-primary" />, 
      courses: 42, 
      color: "bg-blue-50" 
    },
    { 
      name: "Programming", 
      icon: <Code className="h-6 w-6 text-indigo-500" />, 
      courses: 58, 
      color: "bg-indigo-50" 
    },
    { 
      name: "Web Development", 
      icon: <Globe className="h-6 w-6 text-teal-500" />, 
      courses: 36, 
      color: "bg-teal-50" 
    },
    { 
      name: "Data Science", 
      icon: <BarChart className="h-6 w-6 text-amber-500" />, 
      courses: 24, 
      color: "bg-amber-50" 
    },
    { 
      name: "Cybersecurity", 
      icon: <Shield className="h-6 w-6 text-red-500" />, 
      courses: 18, 
      color: "bg-red-50" 
    },
    { 
      name: "Mobile Development", 
      icon: <Smartphone className="h-6 w-6 text-purple-500" />, 
      courses: 22, 
      color: "bg-purple-50" 
    },
    { 
      name: "UI/UX Design", 
      icon: <Layout className="h-6 w-6 text-pink-500" />, 
      courses: 16, 
      color: "bg-pink-50" 
    },
    { 
      name: "Networking", 
      icon: <Wifi className="h-6 w-6 text-green-500" />, 
      courses: 15, 
      color: "bg-green-50" 
    },
  ];

  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Top Categories</h2>
          <p className="text-muted-foreground">
            Browse through our diverse range of courses designed for both academic studies
            and professional skill development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryItem 
              key={index}
              name={category.name}
              icon={category.icon}
              courses={category.courses}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
