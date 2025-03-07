
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { courses, reviews } from "@/lib/data";
import { Course, Review } from "@/types";
import { Star, Clock, BookOpen, Globe, BarChart4, Users, CheckCircle2, CalendarDays, PlayCircle, FileText, MessageSquare, Share2, Heart, ShoppingCart, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [courseReviews, setCourseReviews] = useState<Review[]>([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find course by ID
    const foundCourse = courses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Get mock reviews
      setCourseReviews(reviews.slice(0, 5));
    }
  }, [courseId]);
  
  if (!course) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };
  
  const handleEnroll = () => {
    toast.success("Successfully enrolled in course!");
  };
  
  // Calculate average rating
  const avgRating = courseReviews.reduce((acc, review) => acc + review.rating, 0) / courseReviews.length;
  
  // Calculate rating distribution
  const ratingDistribution = {
    5: courseReviews.filter(r => r.rating === 5).length,
    4: courseReviews.filter(r => r.rating === 4).length,
    3: courseReviews.filter(r => r.rating === 3).length,
    2: courseReviews.filter(r => r.rating === 2).length,
    1: courseReviews.filter(r => r.rating === 1).length,
  };
  
  const formatPrice = (price: number) => {
    return `Rs ${price.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Course Header */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {course.category.name}
                    </Badge>
                    <Badge variant="outline" className={
                      course.level === "Beginner" ? "bg-green-500/10 text-green-600 border-green-500/30" :
                      course.level === "Intermediate" ? "bg-blue-500/10 text-blue-600 border-blue-500/30" :
                      "bg-purple-500/10 text-purple-600 border-purple-500/30"
                    }>
                      {course.level}
                    </Badge>
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/30">
                      {course.language}
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                  
                  <p className="text-muted-foreground mb-6">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.round(course.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">{course.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground ml-1">({courseReviews.length} reviews)</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{course.enrolledStudents.toLocaleString()} students</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Last updated April 2024</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                      <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{course.instructor.name}</p>
                      <p className="text-sm text-muted-foreground">{course.instructor.role}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card border rounded-lg shadow-sm overflow-hidden sticky top-24"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Button variant="ghost" className="text-white hover:text-white bg-white/20 hover:bg-white/30 rounded-full w-16 h-16 flex items-center justify-center">
                        <PlayCircle className="h-10 w-10" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      {course.discountPrice ? (
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-primary mr-2">
                            {formatPrice(course.discountPrice)}
                          </span>
                          <span className="text-xl text-muted-foreground line-through">
                            {formatPrice(course.price)}
                          </span>
                          <Badge className="ml-2 bg-red-500 text-white">
                            {Math.round((1 - course.discountPrice / course.price) * 100)}% OFF
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-primary">
                          {formatPrice(course.price)}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <Button className="w-full" size="lg" onClick={handleEnroll}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Enroll Now
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={handleAddToWishlist}
                      >
                        <Heart className={`mr-2 h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                      </Button>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">This course includes:</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                          <div>
                            <p>{course.duration} of content</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <BookOpen className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                          <div>
                            <p>{course.lessons} lessons</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                          <div>
                            <p>Downloadable resources</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MessageSquare className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                          <div>
                            <p>Discussion forum access</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Award className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                          <div>
                            <p>Certificate of completion</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Globe className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                          <div>
                            <p>Lifetime access</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                      
                      <div className="text-sm text-muted-foreground">
                        30-Day Money-Back Guarantee
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="mb-8 w-full md:w-auto flex flex-wrap justify-start">
                <TabsTrigger value="curriculum" className="flex-1 md:flex-none">Curriculum</TabsTrigger>
                <TabsTrigger value="overview" className="flex-1 md:flex-none">Overview</TabsTrigger>
                <TabsTrigger value="instructor" className="flex-1 md:flex-none">Instructor</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 md:flex-none">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curriculum" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                  <div className="text-sm text-muted-foreground mb-6">
                    <p className="mb-2">{course.lessons} lessons • {course.duration} total length</p>
                  </div>
                  
                  <Accordion type="single" collapsible className="border rounded-lg divide-y">
                    {course.syllabus?.map((section, index) => (
                      <AccordionItem key={index} value={`section-${index}`} className="px-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <div className="flex flex-col items-start text-left">
                            <div className="font-medium">{section.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {section.topics.length} lessons • {section.duration}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pt-0 pb-4">
                          <div className="space-y-2 mt-2">
                            {section.topics.map((topic, topicIndex) => (
                              <div 
                                key={topicIndex} 
                                className="flex items-start py-2 px-4 rounded-md hover:bg-muted transition-colors"
                              >
                                <PlayCircle className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                                <div className="flex-1">
                                  <p className="text-sm">{topic}</p>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {Math.floor(Math.random() * 20) + 5}:00
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="overview" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-6">Course Description</h2>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      {course.description}
                    </p>
                    <p className="mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquet lacinia, 
                      nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl. Sed euismod, nunc sit amet aliquet lacinia,
                      nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl.
                    </p>
                    <p className="mb-4">
                      Nec aliquet nisl nisl sit amet nisl. Sed euismod, nunc sit amet aliquet lacinia, nisl nisl aliquet nisl, 
                      nec aliquet nisl nisl sit amet nisl.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-4">Requirements</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      <li>Basic understanding of computer operation</li>
                      <li>Stable internet connection</li>
                      <li>No prior programming experience needed</li>
                      <li>Enthusiasm to learn new skills</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-4">Target Audience</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Students pursuing academic degrees in related fields</li>
                      <li>Professionals looking to upskill</li>
                      <li>Beginners interested in learning a new skill</li>
                      <li>Anyone interested in Nepali-language technical education</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="instructor" className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/3 lg:w-1/4">
                    <div className="text-center">
                      <Avatar className="h-32 w-32 mx-auto">
                        <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                        <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-bold mt-4">{course.instructor.name}</h3>
                      <p className="text-muted-foreground">{course.instructor.role}</p>
                      
                      <div className="flex justify-center space-x-3 mt-4">
                        {course.instructor.social?.twitter && (
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                          </Button>
                        )}
                        {course.instructor.social?.linkedin && (
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                          </Button>
                        )}
                        {course.instructor.social?.website && (
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Globe className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-card border rounded-lg p-6 mt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Courses</span>
                          <span className="font-medium">{course.instructor.courses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Students</span>
                          <span className="font-medium">{course.instructor.students.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Reviews</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span className="font-medium">{course.instructor.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 lg:w-3/4">
                    <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
                    <div className="prose max-w-none">
                      <p className="mb-4">{course.instructor.bio}</p>
                      <p className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquet lacinia, 
                        nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl. Sed euismod, nunc sit amet aliquet lacinia,
                        nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl.
                      </p>
                      <p>
                        Nec aliquet nisl nisl sit amet nisl. Sed euismod, nunc sit amet aliquet lacinia, nisl nisl aliquet nisl, 
                        nec aliquet nisl nisl sit amet nisl.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="col-span-1 md:border-r md:pr-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2">{avgRating.toFixed(1)}</div>
                        <div className="flex justify-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < Math.round(avgRating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{courseReviews.length} ratings</p>
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                          const percentage = (count / courseReviews.length) * 100;
                          
                          return (
                            <div key={rating} className="flex items-center">
                              <div className="flex items-center w-24">
                                <span className="mr-2">{rating}</span>
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                              </div>
                              <div className="flex-1 mx-3">
                                <Progress value={percentage} className="h-2" />
                              </div>
                              <div className="w-12 text-right text-muted-foreground text-sm">
                                {percentage.toFixed(0)}%
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {courseReviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={review.user.avatar} alt={review.user.name} />
                            <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{review.user.name}</h4>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex mt-1 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} 
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button variant="outline">Load More Reviews</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetails;
