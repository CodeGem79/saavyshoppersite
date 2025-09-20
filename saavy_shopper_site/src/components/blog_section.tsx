import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// Corrected import: 'db' is from your local file, other functions from the library
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'; 
import blogSmartShopping from "../assets/logo.jpg";
// import blogCoupons from "../assets/logo.jpg";
// import blogBudget from "../assets/logo.jpg";

// const imageMap = {
//   "Shopping Tips": blogSmartShopping,
//   "Coupons": blogCoupons,
//   "Budgeting": blogBudget,
//   "Apps & Technology": blogSmartShopping,
// };

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      setLoading(true);
      try {
        const postsQuery = query(collection(db, "blog_posts"), orderBy("createdAt", "desc"), limit(3));
        const querySnapshot = await getDocs(postsQuery);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: new Date(doc.data().createdAt.seconds * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          image: doc.data().image || blogSmartShopping,
          readTime: doc.data().readTime || "5 min read",
        }));
        setBlogPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching latest posts: ", error);
      }
      setLoading(false);
    };

    fetchLatestPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-muted-foreground">Loading latest posts...</div>;
  }

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
          {blogPosts.length > 0 ? (
            blogPosts.map((post, index) => (
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
            <div className="col-span-full text-center text-muted-foreground">No posts found.</div>
          )}
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link to="/blog">
            <Button variant="cta" size="lg">
              View All Posts
            </Button>
          </Link>
          <Link to="/contribute">
            <Button variant="outline" size="lg">
              Contribute
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;