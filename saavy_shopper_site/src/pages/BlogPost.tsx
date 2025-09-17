import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";
import blogSmartShopping from "../assets/logo.jpg";
import blogCoupons from "../assets/logo.jpg";
import blogBudget from "../assets/logo.jpg";

const blogPostsData = {
  "1": {
    id: 1,
    title: "10 Smart Shopping Tricks That Will Cut Your Bills in Half",
    excerpt: "Discover the insider secrets that professional shoppers use to save thousands every year. From timing your purchases to leveraging technology.",
    image: blogSmartShopping,
    readTime: "5 min read",
    date: "Mar 15, 2024",
    category: "Shopping Tips",
    author: "Sarah Johnson",
    content: `
      <h2>The Power of Strategic Shopping</h2>
      <p>Shopping smart isn't just about finding discounts—it's about developing a systematic approach that consistently saves you money. These 10 proven strategies can literally cut your shopping bills in half when applied consistently.</p>
      
      <h3>1. Master the Art of Timing</h3>
      <p>The key to massive savings lies in understanding retail cycles. Major retailers follow predictable patterns for markdowns and clearance events. Here's when to shop for maximum savings:</p>
      <ul>
        <li><strong>Electronics:</strong> Best deals in January (post-holiday) and September (new model releases)</li>
        <li><strong>Clothing:</strong> End-of-season clearances in February and August</li>
        <li><strong>Home goods:</strong> January white sales and August back-to-school promotions</li>
      </ul>

      <h3>2. The 24-Hour Rule</h3>
      <p>Before making any non-essential purchase over $50, wait 24 hours. This simple rule eliminates impulse buying and gives you time to research better deals. Studies show this technique reduces unnecessary purchases by 67%.</p>

      <h3>3. Price Tracking Technology</h3>
      <p>Use apps like Honey, CamelCamelCamel, or Invisible Hand to track price histories and get alerts when prices drop. Set up alerts for items on your wishlist and wait for the optimal buying moment.</p>

      <h3>4. The Magic of Cashback Stacking</h3>
      <p>Combine multiple cashback sources for maximum returns:</p>
      <ul>
        <li>Cashback credit cards (1-5% back)</li>
        <li>Store loyalty programs (additional 1-3%)</li>
        <li>Cashback apps like Rakuten (up to 10%)</li>
        <li>Manufacturer coupons</li>
      </ul>

      <h3>5. Strategic Social Media Following</h3>
      <p>Follow your favorite brands on social media for exclusive discount codes and flash sales. Many companies offer special promotions to their social media followers before announcing them publicly.</p>

      <blockquote>
        "The average family can save $3,000-5,000 per year just by implementing these strategic shopping techniques consistently."
      </blockquote>

      <h3>The Bottom Line</h3>
      <p>Smart shopping is a skill that pays dividends for life. Start with 2-3 of these strategies and gradually incorporate more as they become habits. Your future self will thank you for every dollar saved today.</p>
    `
  },
  "2": {
    id: 2,
    title: "The Ultimate Guide to Couponing in 2024",
    excerpt: "Master the art of couponing with our comprehensive guide. Learn how to stack deals, find hidden discounts, and maximize your savings.",
    image: blogCoupons,
    readTime: "8 min read", 
    date: "Mar 12, 2024",
    category: "Coupons",
    author: "Michael Chen",
    content: `
      <h2>Couponing Revolution: Beyond Clipping Papers</h2>
      <p>Modern couponing has evolved far beyond newspaper clippings. Today's savvy shoppers use sophisticated digital strategies to maximize savings while minimizing effort.</p>
      
      <h3>Digital-First Approach</h3>
      <p>The future of couponing is digital. Here are the essential apps and websites every smart shopper needs:</p>
      <ul>
        <li><strong>Manufacturer Apps:</strong> Procter & Gamble, Unilever, and General Mills offer exclusive digital coupons</li>
        <li><strong>Store Apps:</strong> Target Cartwheel, Walmart Savings Catcher, and Kroger Digital Coupons</li>
        <li><strong>Third-party Apps:</strong> Ibotta, Checkout 51, and Fetch Rewards for receipt scanning</li>
      </ul>

      <h3>The Art of Coupon Stacking</h3>
      <p>Maximum savings come from legally combining multiple discounts on a single purchase:</p>
      <ol>
        <li>Start with a store sale price</li>
        <li>Apply a manufacturer coupon</li>
        <li>Add a store coupon</li>
        <li>Use a cashback app</li>
        <li>Pay with a cashback credit card</li>
      </ol>

      <h3>Strategic Stockpiling</h3>
      <p>When you find items at 70-90% off, buy enough to last until the next sale cycle (typically 12 weeks). Focus on non-perishable items with long shelf lives.</p>

      <blockquote>
        "The best couponers don't just save money—they strategically build household inventories that reduce long-term shopping costs."
      </blockquote>

      <h3>Advanced Techniques</h3>
      <p>Take your couponing to the next level with these pro strategies:</p>
      <ul>
        <li><strong>Raincheck Strategy:</strong> Get rainchecks for out-of-stock sale items, then use coupons when restocked</li>
        <li><strong>Overage Tactics:</strong> Use high-value coupons on small-sized products to create overage that reduces your total bill</li>
        <li><strong>Gift Card Promotions:</strong> Buy gift cards during bonus promotions, then use them during sales for double savings</li>
      </ul>

      <h3>Avoiding Common Pitfalls</h3>
      <p>Don't let couponing turn into wasteful spending. Only buy items you actually need and use, regardless of the discount percentage.</p>
    `
  },
  "3": {
    id: 3,
    title: "Creating a Monthly Budget That Actually Works",
    excerpt: "Stop struggling with budgets that fail. Our proven method helps you create a realistic budget that you'll actually stick to long-term.",
    image: blogBudget,
    readTime: "6 min read",
    date: "Mar 10, 2024",
    category: "Budgeting",
    author: "Emily Rodriguez",
    content: `
      <h2>Why Most Budgets Fail (And How to Fix It)</h2>
      <p>The harsh reality is that 80% of people who create budgets abandon them within the first month. The problem isn't lack of willpower—it's flawed methodology.</p>
      
      <h3>The 50/30/20 Rule Evolved</h3>
      <p>While the classic 50/30/20 rule is a great starting point, modern budgeters need more flexibility:</p>
      <ul>
        <li><strong>50% Needs:</strong> Housing, utilities, minimum debt payments, groceries</li>
        <li><strong>30% Wants:</strong> Entertainment, dining out, hobbies, non-essential shopping</li>
        <li><strong>20% Savings & Extra Debt Payment:</strong> Emergency fund, retirement, extra mortgage payments</li>
      </ul>

      <h3>The Zero-Based Budgeting Method</h3>
      <p>Give every dollar a job before you spend it. This method ensures intentional spending and eliminates money leaks:</p>
      <ol>
        <li>Calculate your monthly after-tax income</li>
        <li>List all fixed expenses</li>
        <li>Assign amounts to variable categories</li>
        <li>Allocate remaining money to savings goals</li>
        <li>Ensure income minus expenses equals zero</li>
      </ol>

      <h3>Building Flexibility Into Your Budget</h3>
      <p>Rigid budgets break. Build in these flexibility features:</p>
      <ul>
        <li><strong>Buffer Categories:</strong> Add 5-10% buffer to variable expenses</li>
        <li><strong>Fun Money:</strong> Guilt-free spending money for each adult</li>
        <li><strong>Miscellaneous Fund:</strong> For unexpected but necessary expenses</li>
      </ul>

      <blockquote>
        "A budget is not a restriction—it's a plan for your money that aligns with your values and goals."
      </blockquote>

      <h3>The Monthly Budget Review</h3>
      <p>Schedule a monthly "money date" with yourself (or partner) to review and adjust your budget. Look for patterns, celebrate wins, and adjust categories that aren't working.</p>

      <h3>Automation is Your Friend</h3>
      <p>Automate as much as possible to reduce decision fatigue:</p>
      <ul>
        <li>Automatic transfers to savings</li>
        <li>Automated bill payments</li>
        <li>Automatic investments</li>
        <li>Scheduled debt payments above minimums</li>
      </ul>

      <h3>Emergency Fund Priority</h3>
      <p>Before aggressive debt payoff or investing, build a $1,000 starter emergency fund. This prevents new debt when unexpected expenses arise.</p>
    `
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogPostsData[id as keyof typeof blogPostsData];

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
      {/* Header */}
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

      {/* Hero Image */}
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

      {/* Article Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
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

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-muted/30 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">About the Author</h3>
                <p className="text-sm text-muted-foreground">
                  {post.author} is a financial expert specializing in consumer savings strategies and smart shopping techniques.
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