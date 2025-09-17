import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";

import BlogPost from "./pages/BlogPost";
import AllPosts from "./pages/AllPosts";
// import NotFound from "./pages/NotFound";
import SubmissionGuidelines from "./pages/SubmissionGuidelines";
import SubmitArticle from "./pages/SubmitArticle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<AllPosts />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contribute" element={<SubmissionGuidelines />} />
          <Route path="/submit" element={<SubmitArticle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;