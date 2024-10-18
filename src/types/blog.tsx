export type Author = {
  name: string;
  designation: string;
  image: string; // Ensure this line exists
};

export type Blog = {
  id: number;
  title: string;
  paragraph: string; // Assuming you have this field for the blog content
  image: string; // Blog image
  author: Author; // Author type includes image
  tags: string[];
  publishDate: string; // Adjust according to your needs
};
