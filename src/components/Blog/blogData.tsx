"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the Image component from Next.js

// Define the Blog interface
interface Blog {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  author: {
    name: string;
    designation: string;
  };
  publishDate: string;
}

const BlogList = () => {
  // Set the blogs state to be an array of Blog objects
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('pages/api/blog.tsx');
        const data: Blog[] = await response.json(); 
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.paragraph}</p>
          {/* Replace <img> with <Image /> */}
          <Image 
            src={blog.image} 
            alt={blog.title} 
            width={500} // Example width
            height={300} // Example height
            layout="responsive" // This will adjust image size responsively
            priority 
          />
          <div>
            <strong>{blog.author.name}</strong> - {blog.author.designation}
          </div>
          <div>{blog.publishDate}</div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
