
import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Categories from "@/components/home/Categories";
import { instructors } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ChevronRight, Clock, Users } from "lucide-react";

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <FeaturedCourses />
        <Categories />
        
        {/* Why Choose Us Section */}
        <section className="py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                    alt="Student learning"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-primary/20 rounded-lg -z-10" />
                
                <div className="absolute top-6 -left-6 bg-white shadow-lg rounded-lg p-4 max-w-xs animate-float">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Flexible Learning</p>
                      <p className="text-xs text-muted-foreground">Learn at your own pace</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 left-12 bg-white shadow-lg rounded-lg p-4 max-w-xs animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Community Support</p>
                      <p className="text-xs text-muted-foreground">Learn with peers</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Badge className="mb-2">Why Choose Us</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Tailored Learning Experience for Nepali Students
                </h2>
                <p className="text-muted-foreground">
                  NepalLearns is designed specifically for Nepali students, with courses
                  that align with academic curricula and job market demands, making it the ideal
                  learning platform for your educational journey.
                </p>
                
                <div className="space-y-4 pt-2">
                  {[
                    "Courses aligned with Nepali university curricula",
                    "Experienced instructors from top institutions",
                    "Flexible learning options with both English and Nepali content",
                    "Interactive learning with live sessions and community support",
                    "Affordable pricing with local payment options"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 bg-primary/10 p-1 rounded-full">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <p className="ml-3">{feature}</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Link to="/about">
                    <Button className="group">
                      Learn More About Us
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Instructors Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-2">Meet Our Instructors</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Learn from Industry Experts
              </h2>
              <p className="text-muted-foreground">
                Our instructors bring years of academic and industry experience to provide
                you with quality education and practical insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {instructors.map((instructor) => (
                <motion.div
                  key={instructor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6 text-center">
                    <div className="relative mx-auto w-24 h-24 mb-4">
                      <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
                      <img
                        src={instructor.avatar}
                        alt={instructor.name}
                        className="rounded-full object-cover w-full h-full relative z-10 border-2 border-white"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{instructor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{instructor.role}</p>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{instructor.students.toLocaleString()}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/30"></div>
                      <div>
                        <span>
                          {instructor.courses} courses
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/instructors">
                <Button variant="outline" className="group">
                  View All Instructors
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0"></div>
          <div className="absolute inset-0 opacity-20 z-0" style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}></div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-2">Get Started Today</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Start Your Learning Journey with NepalLearns
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already advancing their careers and academic
                performance with our comprehensive courses.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/courses">
                  <Button size="lg" className="px-8">
                    Explore Courses
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="px-8">
                    Sign Up for Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
