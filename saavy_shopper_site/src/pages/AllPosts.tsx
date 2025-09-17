import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar, Clock, ArrowRight, ArrowLeft, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import blogSmartShopping from "../assets/logo.jpg";
import blogCoupons from "../assets/logo.jpg";
import blogBudget from "../assets/logo.jpg";

const allBlogPosts = [
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
  },
  {
    id: 4,
    title: "Cashback Apps: The Complete Beginner's Guide",
    excerpt: "Learn how to earn money back on every purchase with the best cashback apps and strategies that actually work in 2024.",
    image: blogSmartShopping,
    readTime: "7 min read",
    date: "Mar 8, 2024",
    category: "Apps & Technology"
  },
  {
    id: 5,
    title: "Price Comparison: How to Never Overpay Again",
    excerpt: "Master the art of price comparison with tools and techniques that ensure you always get the best deal on any purchase.",
    image: blogCoupons,
    readTime: "6 min read",
    date: "Mar 5, 2024",
    category: "Shopping Tips"
  },
  {
    id: 6,
    title: "Emergency Fund: Build Yours in 6 Months",
    excerpt: "Step-by-step guide to building an emergency fund that protects your finances and gives you peace of mind.",
    image: blogBudget,
    readTime: "9 min read",
    date: "Mar 3, 2024",
    category: "Budgeting"
  }
];

const POSTS_PER_PAGE = 6;

const AllPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  const categories = ["all", ...Array.from(new Set(allBlogPosts.map(post => post.category)))];

  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);
  
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5 pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
              All Blog Posts
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover expert money-saving strategies, budgeting tips, and smart shopping guides
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-6 py-16">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts by title, content, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredPosts.length} of {allBlogPosts.length} posts
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.length > 0 ? (
            currentPosts.map((post, index) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No posts found matching your search criteria.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPosts;