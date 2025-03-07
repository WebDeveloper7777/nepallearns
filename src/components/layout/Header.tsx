
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, ChevronDown, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/data";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Instructors", path: "/instructors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold text-primary transition-opacity duration-300 hover:opacity-80"
        >
          <Laptop className="h-8 w-8" />
          <span className="hidden sm:inline">NepalLearns</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            link.name === "Courses" ? (
              <DropdownMenu key={link.name}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-base font-medium flex items-center",
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    {link.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56 p-2">
                  {categories.slice(0, 6).map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link
                        to={`/courses?category=${category.id}`}
                        className="w-full px-2 py-2 cursor-pointer"
                      >
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem asChild>
                    <Link
                      to="/courses"
                      className="w-full px-2 py-2 font-medium text-primary cursor-pointer"
                    >
                      View All Categories
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-4 py-2 text-base font-medium transition-colors",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Search className="h-5 w-5" />
          </Button>

          <Link to="/login">
            <Button variant="outline" className="font-medium">
              Log In
            </Button>
          </Link>

          <Link to="/signup">
            <Button className="font-medium">Sign Up</Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t animate-slide-down shadow-lg">
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search courses..."
                className="flex-1 px-4 py-2 outline-none"
              />
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary text-white rounded-none"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-md transition-colors",
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <Link to="/login" className="flex-1">
                <Button variant="outline" className="w-full font-medium">
                  Log In
                </Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="w-full font-medium">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
