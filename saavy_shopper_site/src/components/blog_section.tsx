import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import blogSmartShopping from "../assets/logo.jpg";
import blogCoupons from "../assets/logo.jpg";
import blogBudget from "../assets/logo.jpg";

const blogPosts = [
  {
    id: 1,
    title: "10 Smart Shopping Tricks That Will Cut Your Bills in Half",
    excerpt: "Discover the insider secrets that professional shoppers use to save thousands every year. From timing your purchases to leveraging technology.",
    image: blogSmartShopping,
    readTime: "5 min read",
    date: "Mar 15, 2024",
    category: "Shopping Tips"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Couponing in 2024",
    excerpt: "Master the art of couponing with our comprehensive guide. Learn how to stack deals, find hidden discounts, and maximize your savings.",
    image: blogCoupons,
    readTime: "8 min read", 
    date: "Mar 12, 2024",
    category: "Coupons"
  },
  {
    id: 3,
    title: "Creating a Monthly Budget That Actually Works",
    excerpt: "Stop struggling with budgets that fail. Our proven method helps you create a realistic budget that you'll actually stick to long-term.",
    image: blogBudget,
    readTime: "6 min read",
    date: "Mar 10, 2024",
    category: "Budgeting"
  }
];

const BlogSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Money-Saving Tips & Guides
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn expert strategies to maximize your savings and make every dollar count
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="overflow-hidden hover-lift shadow-card border-0 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>
                </Link>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`}>
                  <Button variant="ghost" className="group p-0 h-auto font-medium">
                    Read More 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/blog">
            <Button variant="cta" size="lg">
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;