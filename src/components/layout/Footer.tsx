
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary pt-16 pb-8 text-secondary-foreground">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Laptop className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">NepalLearns</span>
            </Link>
            <p className="text-muted-foreground">
              Empowering Nepali students with quality education and practical skills
              for academic and professional success.
            </p>
            <div className="flex space-x-3 pt-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/instructors" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Instructors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Popular Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/courses?category=cs" className="text-muted-foreground hover:text-primary transition-colors">
                  Computer Science
                </Link>
              </li>
              <li>
                <Link to="/courses?category=prog" className="text-muted-foreground hover:text-primary transition-colors">
                  Programming
                </Link>
              </li>
              <li>
                <Link to="/courses?category=web" className="text-muted-foreground hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/courses?category=data" className="text-muted-foreground hover:text-primary transition-colors">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/courses?category=cyber" className="text-muted-foreground hover:text-primary transition-colors">
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-primary mt-0.5" />
                <span className="text-muted-foreground">+977-01-1234567</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-primary mt-0.5" />
                <span className="text-muted-foreground">info@nepallearns.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h5 className="font-medium mb-2">Subscribe to Newsletter</h5>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-background"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} NepalLearns. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
