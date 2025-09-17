import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, FileText, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const SubmissionGuidelines = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6 py-12">
        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline">
              ← Back to Home
            </Button>
          </Link>
          <Link to="/blog">
            <Button variant="outline">
              Browse Blog Posts
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Contribute to Our Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share your money-saving insights and help our community discover new ways to save. 
            We welcome expert advice, personal stories, and practical tips.
          </p>
        </div>

        {/* Guidelines Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Content Guidelines</CardTitle>
              <CardDescription>What we're looking for in submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Original, actionable money-saving tips
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Personal finance strategies and insights
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Product reviews and comparisons
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Budget-friendly lifestyle content
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Author Requirements</CardTitle>
              <CardDescription>Who can contribute</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Financial experts and advisors
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Successful savers with proven strategies
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Industry professionals with insider tips
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Anyone with valuable money-saving experiences
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Clock className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Process & Timeline</CardTitle>
              <CardDescription>What happens after submission</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Initial review within 5-7 business days
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Editorial feedback and collaboration
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Publication with author attribution
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Promotion across our platforms
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Article Requirements */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Article Requirements</CardTitle>
            <CardDescription>Please ensure your submission meets these criteria</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Format & Length</h3>
              <ul className="space-y-2 text-sm">
                <li>• 800-2000 words for full articles</li>
                <li>• Clear headings and subheadings</li>
                <li>• Bullet points for easy scanning</li>
                <li>• Include relevant examples or case studies</li>
                <li>• High-quality images (optional but preferred)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Content Quality</h3>
              <ul className="space-y-2 text-sm">
                <li>• Original content (no plagiarism)</li>
                <li>• Fact-checked information with sources</li>
                <li>• Practical, actionable advice</li>
                <li>• Engaging and conversational tone</li>
                <li>• SEO-friendly but natural writing</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Share Your Insights?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Help thousands of people save money by sharing your knowledge and experience. 
            Your contribution could be the tip that changes someone's financial future.
          </p>
          <Link to="/submit">
            <Button size="lg" className="text-lg px-8 py-4">
              Submit Your Article
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmissionGuidelines;