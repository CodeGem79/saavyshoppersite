import React, { useState, useEffect } from 'react';

import { db, collection, getDocs, addDoc, serverTimestamp, query, where, updateDoc, doc, deleteDoc } from '../firebaseConfig.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Check, X, ArrowLeft, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = 'Password';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // New state for all published posts
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostAuthorName, setNewPostAuthorName] = useState('');
  const [newPostAuthorBio, setNewPostAuthorBio] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [editingReadTime, setEditingReadTime] = useState('');

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

  const fetchAllPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'blog_posts'));
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllPosts(fetchedPosts);
    } catch (e) {
      console.error('Error fetching all posts: ', e);
      toast({
        title: "Error",
        description: "Failed to load all posts. Check console for details.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
      fetchAllPosts();
    }
  }, [isAuthenticated]);

  const handleApprove = async (submission) => {
    try {
      const readTime = `${Math.ceil(submission.content.split(' ').length / 200)} min read`;

      await addDoc(collection(db, 'blog_posts'), {
        title: submission.title,
        content: submission.content,
        author: submission.authorName,
        category: submission.category,
        excerpt: submission.summary,
        authorBio: submission.authorBio,
        image: submission.image || '',
        status: 'published',
        createdAt: serverTimestamp(),
        readTime: readTime,
      });

      const submissionRef = doc(db, 'submissions', submission.id);
      await updateDoc(submissionRef, {
        status: 'approved',
      });
      
      toast({
        title: "Success!",
        description: "Article approved and published to the blog.",
      });

      fetchSubmissions();
      fetchAllPosts();
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
      const submissionRef = doc(db, 'submissions', submissionId);
      await deleteDoc(submissionRef);

      toast({
        title: "Article Rejected",
        description: "Submission has been permanently deleted.",
      });

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

  const handleDeletePost = async (postId) => {
    try {
      const postRef = doc(db, 'blog_posts', postId);
      await deleteDoc(postRef);

      toast({
        title: "Post Deleted",
        description: "The published article has been permanently deleted.",
      });

      fetchAllPosts();
    } catch (e) {
      console.error('Error deleting post: ', e);
      toast({
        title: "Error",
        description: "Failed to delete article. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!newPostTitle || !newPostContent || !newPostCategory || !newPostAuthorName) {
      setMessage('Title, category, content, and author name are required!');
      return;
    }

    setLoading(true);

    try {
      const readTime = `${Math.ceil(newPostContent.split(' ').length / 200)} min read`;

      await addDoc(collection(db, 'blog_posts'), {
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
        author: newPostAuthorName,
        authorBio: newPostAuthorBio,
        image: newPostImage,
        status: 'published',
        createdAt: serverTimestamp(),
        excerpt: newPostContent.substring(0, 150) + '...',
        readTime: readTime,
      });
      
      setMessage('New post added successfully!');
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostCategory('');
      setNewPostAuthorName('');
      setNewPostAuthorBio('');
      setNewPostImage('');
      fetchAllPosts();
    } catch (e) {
      console.error('Error adding document: ', e);
      setMessage('Error adding post. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (submission) => {
    setEditingSubmission(submission);
    setEditingReadTime(submission.readTime || '');
  };
  
  const handlePublishEdit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    setLoading(true);

    try {
      const isNewSubmission = editingSubmission.status === 'pending';
      const docRef = isNewSubmission ? await addDoc(collection(db, 'blog_posts'), {
        title: editingSubmission.title,
        content: editingSubmission.content,
        category: editingSubmission.category,
        author: editingSubmission.authorName,
        authorBio: editingSubmission.authorBio,
        image: editingSubmission.image || '',
        status: 'published',
        createdAt: serverTimestamp(),
        excerpt: editingSubmission.summary,
        readTime: editingReadTime,
      }) : doc(db, 'blog_posts', editingSubmission.id);

      if (!isNewSubmission) {
        await updateDoc(docRef, {
            title: editingSubmission.title,
            content: editingSubmission.content,
            category: editingSubmission.category,
            author: editingSubmission.authorName,
            authorBio: editingSubmission.authorBio,
            image: editingSubmission.image || '',
            excerpt: editingSubmission.summary,
            readTime: editingReadTime,
        });
      }

      if (isNewSubmission) {
          const submissionRef = doc(db, 'submissions', editingSubmission.id);
          await updateDoc(submissionRef, { status: 'approved' });
      }

      setMessage('Post edited and published successfully!');
      setEditingSubmission(null);
      setEditingReadTime('');
      fetchSubmissions();
      fetchAllPosts();
    } catch (e) {
      console.error('Error publishing edited document: ', e);
      setMessage('Error publishing edited post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditInputChange = (field, value) => {
    setEditingSubmission(prev => ({ ...prev, [field]: value }));
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
  
  if (editingSubmission) {
    return (
      <div className="min-h-screen bg-muted/20">
        <div className="container mx-auto px-6 py-12">
          <Button variant="ghost" onClick={() => setEditingSubmission(null)} className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Exit Edit Mode
          </Button>
          <h1 className="text-4xl font-bold mb-8">Edit Submission</h1>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Editing: {editingSubmission.title}</CardTitle>
              <CardDescription>Make changes to the article before publishing.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePublishEdit} className="space-y-4">
                <div>
                  <label htmlFor="editTitle">Title</label>
                  <Input 
                    id="editTitle"
                    type="text" 
                    value={editingSubmission.title}
                    onChange={(e) => handleEditInputChange('title', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="editCategory">Category</label>
                  <Input 
                    id="editCategory"
                    type="text" 
                    value={editingSubmission.category}
                    onChange={(e) => handleEditInputChange('category', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="editAuthorName">Author Name</label>
                  <Input
                      id="editAuthorName"
                      type="text"
                      value={editingSubmission.authorName}
                      onChange={(e) => handleEditInputChange('authorName', e.target.value)}
                      className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="editAuthorBio">Author Bio</label>
                  <Textarea
                      id="editAuthorBio"
                      rows={3}
                      value={editingSubmission.authorBio}
                      onChange={(e) => handleEditInputChange('authorBio', e.target.value)}
                      className="mt-1"
                  ></Textarea>
                </div>
                <div>
                  <label htmlFor="editReadTime">Read Time (e.g., "5 min read")</label>
                  <Input 
                    id="editReadTime"
                    type="text" 
                    value={editingReadTime}
                    onChange={(e) => setEditingReadTime(e.target.value)}
                    placeholder="e.g., 5 min read"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="editContent">Content</label>
                  <Textarea 
                    id="editContent"
                    rows={10}
                    value={editingSubmission.content}
                    onChange={(e) => handleEditInputChange('content', e.target.value)}
                    className="min-h-[400px] mt-1"
                  ></Textarea>
                </div>
                <Button type="submit" className="bg-green-500 text-white hover:bg-green-600" disabled={loading}>
                  {loading ? 'Publishing...' : 'Publish Edited Post'}
                </Button>
                {message && <p className="text-sm italic mt-2">{message}</p>}
              </form>
            </CardContent>
          </Card>
        </div>
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
                <label htmlFor="postAuthorName">Author Name</label>
                <Input
                    id="postAuthorName"
                    type="text"
                    value={newPostAuthorName}
                    onChange={(e) => setNewPostAuthorName(e.target.value)}
                    placeholder="e.g., Jane Doe"
                    className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="postAuthorBio">Author Bio (Optional)</label>
                <Textarea
                    id="postAuthorBio"
                    rows={3}
                    value={newPostAuthorBio}
                    onChange={(e) => setNewPostAuthorBio(e.target.value)}
                    placeholder="A brief bio about the author"
                    className="mt-1"
                ></Textarea>
              </div>
              <div>
                <label htmlFor="postImage">Featured Image URL (Optional)</label>
                <Input
                    id="postImage"
                    type="text"
                    value={newPostImage}
                    onChange={(e) => setNewPostImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
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
              <Button type="submit" className="bg-green-500 text-white hover:bg-green-600" disabled={loading}>
                {loading ? 'Publishing...' : 'Publish Post'}
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
                      <Button onClick={() => handleEdit(submission)} variant="secondary">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
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
        
        {/* All Published Posts */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>All Published Posts ({allPosts.length})</CardTitle>
            <CardDescription>View, edit, or delete all live articles on the blog.</CardDescription>
          </CardHeader>
          <CardContent>
            {allPosts.length > 0 ? (
              <div className="space-y-4">
                {allPosts.map(post => (
                  <div key={post.id} className="border p-4 rounded-lg">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-muted-foreground text-sm">By: {post.author}</p>
                    <div className="flex space-x-2 mt-4">
                      <Button onClick={() => handleEdit(post)} variant="secondary">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button onClick={() => handleDeletePost(post.id)} variant="destructive">
                        <X className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No published posts found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;