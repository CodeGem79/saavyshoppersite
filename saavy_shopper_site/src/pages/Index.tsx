import Hero from "../components/hero";
import BlogSection from "../components/blog_section";
import AppFeatures from "../components/app_features";
import Footer from "../components/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AppFeatures />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;