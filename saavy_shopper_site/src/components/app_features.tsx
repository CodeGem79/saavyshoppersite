import { Card, CardContent } from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Search, Percent, Bell, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Price Comparison",
    description: "Instantly compare prices across thousands of retailers to ensure you never overpay again."
  },
  {
    icon: Percent,
    title: "Automatic Coupon Detection",
    description: "Our AI finds and applies the best coupons and promo codes automatically at checkout."
  },
  {
    icon: Bell,
    title: "Price Drop Alerts",
    description: "Get notified when items you want go on sale, so you can buy at the perfect time."
  },
  {
    icon: TrendingUp,
    title: "Savings Analytics",
    description: "Track your savings over time and discover your best money-saving opportunities."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and protected. We never share your personal information."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Shop and save on the go with our intuitive mobile app designed for modern life."
  }
];

const AppFeatures = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Our App?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to maximize your savings and simplify your shopping experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-card hover-lift card-gradient animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Saving?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join thousands of smart shoppers who are already saving money with our app
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Download for iOS
              </Button>
              <Button variant="cta" size="lg">
                Download for Android
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;