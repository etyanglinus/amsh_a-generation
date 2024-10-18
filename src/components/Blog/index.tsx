// src/components/Blog/index.tsx

import { useEffect, useState } from 'react';
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";

// Define the Blog type (make sure it matches the API structure)
interface Author {
  name: string;
  designation: string;
  image: string; // Add image if needed
}

interface Blog {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  author: Author; // Update this line to use the Author type
  tags: string[];  // Add the tags property here
  publishDate: string;
}

const BlogComponent = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]); // State to store blogs

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');
        const data: Blog[] = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogComponent;
