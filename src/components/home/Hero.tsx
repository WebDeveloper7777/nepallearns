
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, GraduationCap, Book, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

type StatType = {
  value: number;
  label: string;
  icon: React.ReactNode;
};

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Stats animation
  const [stats, setStats] = useState<StatType[]>([
    { value: 0, label: "Total Courses", icon: <Book className="h-5 w-5" /> },
    { value: 0, label: "Students", icon: <Users className="h-5 w-5" /> },
    { value: 0, label: "Instructors", icon: <GraduationCap className="h-5 w-5" /> },
    { value: 0, label: "Certifications", icon: <Award className="h-5 w-5" /> },
  ]);

  const targetStats = [
    { value: 200, label: "Total Courses", icon: <Book className="h-5 w-5" /> },
    { value: 25000, label: "Students", icon: <Users className="h-5 w-5" /> },
    { value: 50, label: "Instructors", icon: <GraduationCap className="h-5 w-5" /> },
    { value: 15000, label: "Certifications", icon: <Award className="h-5 w-5" /> },
  ];

  useEffect(() => {
    const duration = 2000; // ms
    const interval = 20; // ms
    const steps = duration / interval;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      
      setStats(
        targetStats.map((target, index) => ({
          ...target,
          value: Math.floor(target.value * progress),
        }))
      );
      
      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 bg-gradient-to-br from-background to-secondary/30">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5 z-0" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3271&q=80')" }}
      />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <motion.div 
            className="flex-1 space-y-6 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
                #1 Learning Platform in Nepal
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
              Learn <span className="text-primary">Tomorrow's</span> Skills Today
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
              Join thousands of Nepali students mastering in-demand skills with our curated courses
              designed for academic excellence and professional growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <div className="relative w-full sm:w-auto flex-1 max-w-lg">
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="absolute right-1 top-1" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Link to="/courses">
                <Button className="w-full sm:w-auto px-6 py-3 h-auto">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 max-w-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3]">
              <div className="absolute -top-6 -left-6 w-full h-full bg-primary/10 rounded-lg animate-float"></div>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                alt="Students learning"
                className="w-full h-full object-cover rounded-lg shadow-xl relative z-10"
              />
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm shadow-lg p-4 rounded-lg z-20 transform animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Trusted by</p>
                    <p className="text-base font-bold">Top Universities in Nepal</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 md:mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card shadow-sm border rounded-lg p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                {stat.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">{stat.value.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
