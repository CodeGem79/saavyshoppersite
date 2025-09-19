import React, { useState, useEffect } from 'react';

import { db, collection, getDocs, addDoc, serverTimestamp, query, where, updateDoc, doc, deleteDoc } from '../firebaseConfig.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
// import { useToast } from "../components/ui/use-toast";
import { Check, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ADMIN_PASSWORD = 'Password'; // <--- CHANGE THIS TO A SECURE PASSWORD

const AdminDashboard = () => {
//   const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage('Login successful!');
    } else {
      setMessage('Incorrect password');
    }
  };

  const fetchSubmissions = async () => {
    try {
      const q = query(collection(db, 'submissions'), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      const fetchedSubmissions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubmissions(fetchedSubmissions);
    } catch (e) {
      console.error('Error fetching submissions: ', e);
      toast({
        title: "Error",
        description: "Failed to load submissions. Check console for details.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const handleApprove = async (submission) => {
    try {
      // Add the submission to the main blog posts collection
      await addDoc(collection(db, 'blog_posts'), {
        title: submission.title,
        content: submission.content,
        author: submission.authorName,
        category: submission.category,
        image: submission.image || '', // Add an image field if needed
        status: 'published',
        createdAt: serverTimestamp(),
      });

      // Update the status of the original submission to 'approved'
      const submissionRef = doc(db, 'submissions', submission.id);
      await updateDoc(submissionRef, {
        status: 'approved',
      });
      
      toast({
        title: "Success!",
        description: "Article approved and published to the blog.",
      });

      // Refresh the submissions list
      fetchSubmissions();
    } catch (e) {
      console.error('Error approving submission: ', e);
      toast({
        title: "Error",
        description: "Failed to approve article. Please check security rules.",
        variant: "destructive"
      });
    }
  };

  const handleReject = async (submissionId) => {
    try {
      // Delete the submission from the database
      const submissionRef = doc(db, 'submissions', submissionId);
      await deleteDoc(submissionRef);

      toast({
        title: "Article Rejected",
        description: "Submission has been permanently deleted.",
      });

      // Refresh the submissions list
      fetchSubmissions();
    } catch (e) {
      console.error('Error rejecting submission: ', e);
      toast({
        title: "Error",
        description: "Failed to reject article. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!newPostTitle || !newPostContent || !newPostCategory) {
      setMessage('Title, category, and content are required!');
      return;
    }

    try {
      await addDoc(collection(db, 'blog_posts'), {
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
        author: 'Admin',
        status: 'published',
        createdAt: serverTimestamp(),
      });
      setMessage('New post added successfully!');
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostCategory('');
    } catch (e) {
      console.error('Error adding document: ', e);
      setMessage('Error adding post. Please try again.');
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-muted/20">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter the admin password to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password">Password</label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="********" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8">CMS Dashboard</h1>
        
        {/* New Post Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
            <CardDescription>Write and publish a new article to the blog.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPost} className="space-y-4">
              <div>
                <label htmlFor="postTitle">Title</label>
                <Input 
                  id="postTitle"
                  type="text" 
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="The Sneaky Psychology of Buy One Get One Free Deals"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="postCategory">Category</label>
                <Input 
                  id="postCategory"
                  type="text" 
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  placeholder="e.g., Marketing, Psychology"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="postContent">Content</label>
                <Textarea 
                  id="postContent"
                  rows={10}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Write your full article content here..."
                  className="mt-1"
                ></Textarea>
              </div>
              <Button type="submit" className="bg-green-500 text-white hover:bg-green-600">
                Publish Post
              </Button>
              {message && <p className="text-sm italic mt-2">{message}</p>}
            </form>
          </CardContent>
        </Card>

        {/* Pending Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Submissions ({submissions.length})</CardTitle>
            <CardDescription>Articles submitted by the community, awaiting your review.</CardDescription>
          </CardHeader>
          <CardContent>
            {submissions.length > 0 ? (
              <div className="space-y-4">
                {submissions.map(submission => (
                  <div key={submission.id} className="border p-4 rounded-lg">
                    <h3 className="font-bold text-lg">{submission.title}</h3>
                    <p className="text-muted-foreground text-sm">By: {submission.authorName} ({submission.authorEmail})</p>
                    <p className="mt-2">{submission.summary}</p>
                    <div className="flex space-x-2 mt-4">
                      <Button onClick={() => handleApprove(submission)} className="bg-green-500 text-white hover:bg-green-600">
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button onClick={() => handleReject(submission.id)} variant="destructive">
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No new submissions at this time.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;