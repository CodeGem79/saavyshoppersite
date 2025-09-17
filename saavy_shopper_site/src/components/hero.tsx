import { Button } from "@/components/ui/button";
import { Download, Star, Users, Shield } from "lucide-react";
import pic from "../assets/shopping_cart.jpg"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `url(${pic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up">
            Save More on
            <span className="block text-gradient bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Every Purchase
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Discover the smartest way to shop and save money with our powerful app. 
            Get instant deals, compare prices, and unlock exclusive savings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Download className="mr-2 h-5 w-5" />
              Download Free App
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <a href="/contribute">Contribute</a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 rounded-full p-3 mb-3">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">500K+</h3>
              <p className="text-white/80">Happy Users</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 rounded-full p-3 mb-3">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">4.9/5</h3>
              <p className="text-white/80">App Rating</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 rounded-full p-3 mb-3">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">$2.3M</h3>
              <p className="text-white/80">Total Saved</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
    </section>
  );
};

export default Hero;