/* eslint-disable @next/next/no-img-element */
import { Blog } from "@/types/blog";
import React from 'react';

interface SingleBlogProps {
  blog: Blog; 
}

const SingleBlog: React.FC<SingleBlogProps> = ({ blog }) => {
  return (
    <div className="single-blog">
      <img src={blog.image} alt={blog.title} className="w-full h-auto" />
      <h3 className="text-xl font-bold">{blog.title}</h3>
      <p className="mt-2">{blog.paragraph}</p>
      <p className="mt-4 text-sm text-gray-600">
        By: {blog.author.name} ({blog.author.designation})
      </p>
      <p className="mt-1 text-xs text-gray-500">Published on: {blog.publishDate}</p>
    </div>
  );
};

export default SingleBlog;
