
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/lib/data";
import { Clock, BookOpen, PlayCircle, BarChart, Award, FileText, MessageSquare, BookMarked, CheckCircle, CalendarDays } from "lucide-react";
import { Course } from "@/types";

const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [wishlistCourses, setWishlistCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate enrolled courses (first 3 courses)
    setEnrolledCourses(courses.slice(0, 3));
    
    // Simulate wishlist (next 2 courses)
    setWishlistCourses(courses.slice(3, 5));
  }, []);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
    role: "student",
    joinedDate: "January 2024",
    progress: {
      totalCourses: 3,
      completedCourses: 1,
      inProgressCourses: 2,
      totalHours: 45,
      completedHours: 18,
    },
    achievements: [
      { name: "Early Adopter", date: "Jan 15, 2024" },
      { name: "First Course Completed", date: "Feb 20, 2024" },
      { name: "Perfect Attendance", date: "Mar 10, 2024" },
    ],
    upcomingEvents: [
      { name: "Web Development Live Session", date: "Apr 15, 2024", time: "2:00 PM" },
      { name: "Group Discussion: React Basics", date: "Apr 18, 2024", time: "4:30 PM" },
    ],
    notifications: [
      { message: "New course recommendation based on your interests", time: "2 hours ago" },
      { message: "Your instructor replied to your question", time: "1 day ago" },
      { message: "'Introduction to Data Science' course has been updated", time: "3 days ago" },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* User Profile Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl">{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                      <Badge className="mt-2">Student</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground text-center">
                      Member since {user.joinedDate}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">Edit Profile</Button>
                  </CardFooter>
                </Card>
                
                {/* Progress Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Course Completion</span>
                        <span className="font-medium">
                          {user.progress.completedCourses}/{user.progress.totalCourses}
                        </span>
                      </div>
                      <Progress 
                        value={(user.progress.completedCourses / user.progress.totalCourses) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Hours Completed</span>
                        <span className="font-medium">
                          {user.progress.completedHours}/{user.progress.totalHours}
                        </span>
                      </div>
                      <Progress 
                        value={(user.progress.completedHours / user.progress.totalHours) * 100} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-primary/10 p-2 rounded-full mr-3">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{achievement.name}</p>
                            <p className="text-xs text-muted-foreground">{achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-primary/10 p-2 rounded-full mr-3">
                            <CalendarDays className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{event.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.date} at {event.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">View Calendar</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
            
            {/* Main Content */}
            <div className="w-full lg:w-3/4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                          <p className="text-2xl font-bold">{user.progress.totalCourses}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-500/10 p-3 rounded-full">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completed</p>
                          <p className="text-2xl font-bold">{user.progress.completedCourses}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-amber-500/10 p-3 rounded-full">
                          <Clock className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Hours Spent</p>
                          <p className="text-2xl font-bold">{user.progress.completedHours}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-500/10 p-3 rounded-full">
                          <Award className="h-6 w-6 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Certificates</p>
                          <p className="text-2xl font-bold">{user.progress.completedCourses}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Main Tabs */}
                <Tabs defaultValue="my-courses" className="space-y-6">
                  <TabsList className="w-full border-b rounded-none p-0">
                    <TabsTrigger value="my-courses" className="rounded-none py-3 px-6">My Courses</TabsTrigger>
                    <TabsTrigger value="recommended" className="rounded-none py-3 px-6">Recommended</TabsTrigger>
                    <TabsTrigger value="wishlist" className="rounded-none py-3 px-6">Wishlist</TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-none py-3 px-6">Notifications</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="my-courses" className="space-y-6">
                    <h2 className="text-xl font-semibold">In Progress</h2>
                    
                    {enrolledCourses.slice(0, 2).map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-64 aspect-video md:aspect-auto">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                  Instructor: {course.instructor.name}
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span className="text-xs">{course.duration}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span className="text-xs">{course.lessons} lessons</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {course.level}
                                  </Badge>
                                </div>
                                
                                <div className="space-y-2 mb-4">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span className="font-medium">
                                      {Math.floor(Math.random() * 60) + 20}%
                                    </span>
                                  </div>
                                  <Progress value={Math.floor(Math.random() * 60) + 20} className="h-2" />
                                </div>
                              </div>
                              
                              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                                <Button variant="default" size="sm">
                                  <PlayCircle className="mr-2 h-4 w-4" />
                                  Continue
                                </Button>
                                <Link to={`/courses/${course.id}`}>
                                  <Button variant="outline" size="sm">
                                    Course Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    <h2 className="text-xl font-semibold mt-8">Completed</h2>
                    
                    {enrolledCourses.slice(2, 3).map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-64 aspect-video md:aspect-auto">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center mb-1">
                                  <h3 className="text-lg font-semibold mr-2">{course.title}</h3>
                                  <Badge className="bg-green-500 text-white">Completed</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                  Instructor: {course.instructor.name}
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span className="text-xs">{course.duration}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span className="text-xs">{course.lessons} lessons</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {course.level}
                                  </Badge>
                                </div>
                                
                                <div className="space-y-2 mb-4">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span className="font-medium">100%</span>
                                  </div>
                                  <Progress value={100} className="h-2" />
                                </div>
                              </div>
                              
                              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                                <Button variant="outline" size="sm">
                                  <Award className="mr-2 h-4 w-4" />
                                  Certificate
                                </Button>
                                <Link to={`/courses/${course.id}`}>
                                  <Button variant="outline" size="sm">
                                    Course Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    <div className="text-center mt-8">
                      <Link to="/courses">
                        <Button variant="outline">Browse More Courses</Button>
                      </Link>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="recommended" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {courses.slice(5, 9).map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                          <div className="aspect-video">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{course.title}</CardTitle>
                            <CardDescription>{course.instructor.name}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span className="text-xs">{course.duration}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {course.level}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {course.description}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Link to={`/courses/${course.id}`} className="w-full">
                              <Button variant="outline" className="w-full">View Course</Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="wishlist" className="space-y-6">
                    {wishlistCourses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {wishlistCourses.map((course) => (
                          <Card key={course.id} className="overflow-hidden">
                            <div className="aspect-video">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{course.title}</CardTitle>
                              <CardDescription>{course.instructor.name}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span className="text-xs">{course.duration}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {course.level}
                                </Badge>
                              </div>
                              <div className="mt-2">
                                {course.discountPrice ? (
                                  <div className="flex items-baseline">
                                    <span className="font-bold text-primary mr-2">
                                      Rs {course.discountPrice.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-muted-foreground line-through">
                                      Rs {course.price.toLocaleString()}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="font-bold text-primary">
                                    Rs {course.price.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between space-x-2">
                              <Button variant="default" className="flex-1">Enroll Now</Button>
                              <Link to={`/courses/${course.id}`} className="flex-1">
                                <Button variant="outline" className="w-full">View</Button>
                              </Link>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BookMarked className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                        <p className="text-muted-foreground mb-6">
                          Browse courses and add them to your wishlist to save for later.
                        </p>
                        <Link to="/courses">
                          <Button>Browse Courses</Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Notifications</CardTitle>
                        <CardDescription>
                          Stay updated with your course activity and announcements
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {user.notifications.map((notification, index) => (
                            <div key={index} className="flex items-start pb-4 border-b last:border-b-0 last:pb-0">
                              <div className="bg-primary/10 p-2 rounded-full mr-3">
                                <MessageSquare className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm">{notification.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" className="w-full">
                          View All Notifications
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
