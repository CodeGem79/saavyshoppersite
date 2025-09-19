import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";
import { useState, useEffect } from "react";
import { db, doc, getDoc } from '../firebaseConfig';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      const docRef = doc(db, "blog_posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const postData = docSnap.data();
        setPost({
          id: docSnap.id,
          ...postData,
          image: postData.image || '/src/assets/shopping_cart.jpg',
          date: new Date(postData.createdAt.seconds * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
        });
      } else {
        console.log("No such document!");
        setPost(null);
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      setPost(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="relative h-96 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 left-6">
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <article className="lg:col-span-3">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </header>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-muted/30 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">About the Author</h3>
                <p className="text-sm text-muted-foreground">
                  {post.authorBio ? post.authorBio : `${post.author} is a financial expert specializing in consumer savings strategies and smart shopping techniques.`}
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold mb-4">More Money-Saving Tips</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get exclusive money-saving tips and early access to our latest guides.
                </p>
                <Button className="w-full">
                  Download Our App
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;