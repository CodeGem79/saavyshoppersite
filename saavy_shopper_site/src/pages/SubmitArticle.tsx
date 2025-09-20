import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft, Send, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Footer from "../components/footer";
import { db, collection, addDoc, serverTimestamp } from '../firebaseConfig';



const SubmitArticle = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    content: "",
    authorName: "",
    authorEmail: "",
    authorBio: "",
    authorWebsite: "",
    agreeTerms: false,
    allowEditing: false
  });

  // NEW: Add a useEffect hook to scroll to the top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'submissions'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      
      toast({
        title: "Article Submitted Successfully!",
        description: "We'll review your submission and get back to you within 5-7 business days.",
      });

      setFormData({
        title: "",
        category: "",
        summary: "",
        content: "",
        authorName: "",
        authorEmail: "",
        authorBio: "",
        authorWebsite: "",
        agreeTerms: false,
        allowEditing: false
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error",
        description: "There was an error submitting your article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/contribute" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Guidelines
          </Link>
          <h1 className="text-4xl font-bold mb-4">Submit Your Article</h1>
          <p className="text-muted-foreground">
            Share your money-saving expertise with our community. All fields marked with * are required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {/* Article Information */}
            <Card>
              <CardHeader>
                <CardTitle>Article Information</CardTitle>
                <CardDescription>Tell us about your article</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Article Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., 10 Simple Ways to Save $1000 This Year"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budgeting">Budgeting & Planning</SelectItem>
                      <SelectItem value="shopping">Smart Shopping</SelectItem>
                      <SelectItem value="investing">Investing & Savings</SelectItem>
                      <SelectItem value="lifestyle">Frugal Living</SelectItem>
                      <SelectItem value="deals">Deals & Coupons</SelectItem>
                      <SelectItem value="reviews">Product Reviews</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="summary">Article Summary *</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => handleInputChange("summary", e.target.value)}
                    placeholder="Brief summary of your article (2-3 sentences)"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content">Article Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    placeholder="Your full article content (800-2000 words). You can include markdown formatting."
                    rows={15}
                    required
                    className="min-h-[400px]"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Tip: Use markdown for formatting (e.g., **bold**, *italic*, ## headings)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Author Information */}
            <Card>
              <CardHeader>
                <CardTitle>Author Information</CardTitle>
                <CardDescription>Tell us about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="authorName">Full Name *</Label>
                    <Input
                      id="authorName"
                      value={formData.authorName}
                      onChange={(e) => handleInputChange("authorName", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="authorEmail">Email Address *</Label>
                    <Input
                      id="authorEmail"
                      type="email"
                      value={formData.authorEmail}
                      onChange={(e) => handleInputChange("authorEmail", e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="authorBio">Author Bio *</Label>
                  <Textarea
                    id="authorBio"
                    value={formData.authorBio}
                    onChange={(e) => handleInputChange("authorBio", e.target.value)}
                    placeholder="Brief professional bio (2-3 sentences about your expertise or background)"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="authorWebsite">Website/LinkedIn (Optional)</Label>
                  <Input
                    id="authorWebsite"
                    value={formData.authorWebsite}
                    onChange={(e) => handleInputChange("authorWebsite", e.target.value)}
                    placeholder="https://yourwebsite.com or LinkedIn profile"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Terms and Submission */}
            <Card>
              <CardHeader>
                <CardTitle>Terms & Submission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                    required
                  />
                  <Label htmlFor="agreeTerms" className="text-sm">
                    I confirm that this content is original and I have the right to publish it. I agree to the terms and conditions. *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowEditing"
                    checked={formData.allowEditing}
                    onCheckedChange={(checked) => handleInputChange("allowEditing", checked as boolean)}
                  />
                  <Label htmlFor="allowEditing" className="text-sm">
                    I allow editorial changes to improve readability and SEO optimization.
                  </Label>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting || !formData.agreeTerms}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Article
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitArticle;