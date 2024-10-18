import { GetServerSideProps } from "next";
import Image from "next/image";

// Define the prop types
type BlogDetailsProps = {
  blog: {
    title: string;
    author: string;
    authorImage: string;
    date: string;
    content: string;
    category: string;
    views: number;
    comments: number;
    imageUrl: string;
  };
};

// Blog Details Component
const BlogDetailsPage = ({ blog }: BlogDetailsProps) => {
  return (
    <section className="pb-[120px] pt-[150px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div>
              <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                {blog.title}
              </h2>
              <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                <div className="flex flex-wrap items-center">
                  <div className="mb-5 mr-10 flex items-center">
                    <div className="mr-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={blog.authorImage}
                          alt="author"
                          fill
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <span className="mb-1 text-base font-medium text-body-color">
                        By <span>{blog.author}</span>
                      </span>
                    </div>
                  </div>
                  <div className="mb-5 flex items-center">
                    <p className="mr-5 flex items-center text-base font-medium text-body-color">
                      <span className="mr-3">
                        <svg width="15" height="15" viewBox="0 0 15 15" className="fill-current">
                          {/* SVG icon code */}
                        </svg>
                      </span>
                      {new Date(blog.date).toLocaleDateString()}
                    </p>
                    <p className="mr-5 flex items-center text-base font-medium text-body-color">
                      <span className="mr-3">
                        {/* SVG views icon */}
                      </span>
                      {blog.views}
                    </p>
                    <p className="flex items-center text-base font-medium text-body-color">
                      <span className="mr-3">
                        {/* SVG comments icon */}
                      </span>
                      {blog.comments}
                    </p>
                  </div>
                </div>
                <div className="mb-5">
                  <a
                    href="#0"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                  >
                    {blog.category}
                  </a>
                </div>
              </div>
              <div>
                <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  {blog.content}
                </p>
                <div className="mb-10 w-full overflow-hidden rounded">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image src={blog.imageUrl} alt="Blog Image" fill className="object-cover object-center" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Type for params
type Params = {
  id: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  // Ensure params and id are defined
  if (!params || typeof params.id !== 'string') {
    return {
      notFound: true, // Return a 404 page if id is not provided
    };
  }

  const { id } = params as Params; // Type assertion to ensure params has an id property

  try {
    const response = await fetch(`https://your-api-endpoint.com/blog-details/${id}`);

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`Failed to fetch blog details: ${response.statusText}`);
    }

    const blog = await response.json();

    return {
      props: {
        blog,
      },
    };
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return {
      notFound: true, // Return a 404 page if an error occurs
    };
  }
};

export default BlogDetailsPage;
