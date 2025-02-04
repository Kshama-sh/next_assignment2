import BlogFormComponent from '../../components/BlogForm';

export default function BlogPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <BlogFormComponent />
    </div>
  );
}