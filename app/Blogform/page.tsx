import BlogForm from '../../components/BlogForm';

export default function BlogPage() {
  return (
    <div className="p-8">
      <h1 className=" flex text-3xl font-bold mb-6 align-middle justify-center">Create Your Own Blog</h1>
      <BlogForm />
    </div>
  );
}