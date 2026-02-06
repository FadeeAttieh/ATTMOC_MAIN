import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import type { GetServerSideProps } from 'next';
import Navbar from '../components/Navbar';
import { featureFlags } from '../config/featureFlags';

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags.blog) {
    return { notFound: true };
  }
  return { props: {} };
};

// Blog posts data (in production, fetch from CMS or API)
const blogPosts = [
  {
    id: '1',
    title: 'Building Modern Web Apps with Next.js 15',
    slug: 'building-modern-web-apps-nextjs-15',
    excerpt: 'Explore the latest features in Next.js 15 and how they can transform your web development workflow.',
    author: 'ATTMOC Team',
    date: '2026-02-01',
    readTime: '5 min read',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Web Development'],
  },
  {
    id: '2',
    title: 'AI Integration in Modern Applications',
    slug: 'ai-integration-modern-applications',
   excerpt: 'Learn how to integrate AI capabilities into your applications using OpenAI and other modern AI services.',
    author: 'ATTMOC Team',
    date: '2026-01-28',
    readTime: '7 min read',
    category: 'AI & ML',
    tags: ['AI', 'OpenAI', 'ChatGPT', 'Integration'],
  },
  {
    id: '3',
    title: 'Dark Mode Implementation Best Practices',
    slug: 'dark-mode-best-practices',
    excerpt: 'A comprehensive guide to implementing dark mode in your applications with accessibility in mind.',
    author: 'ATTMOC Team',
    date: '2026-01-25',
    readTime: '4 min read',
    category: 'UI/UX',
    tags: ['Dark Mode', 'Accessibility', 'UI/UX'],
  },
  {
    id: '4',
    title: 'Performance Optimization for React Applications',
    slug: 'react-performance-optimization',
    excerpt: 'Proven techniques to improve React application performance and Core Web Vitals scores.',
    author: 'ATTMOC Team',
    date: '2026-01-20',
    readTime: '6 min read',
    category: 'Performance',
    tags: ['React', 'Performance', 'Optimization'],
  },
];

const categories = ['All', 'Web Development', 'AI & ML', 'UI/UX', 'Performance', 'Mobile'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter((post) => post.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <>
      <NextSeo
        title="Blog - ATTMOC | Web Development, AI & Digital Insights"
        description="Stay updated with the latest trends in web development, AI integration, mobile apps, and digital transformation. Expert insights from ATTMOC team."
        canonical="https://attmoc.com/blog"
        openGraph={{
          url: 'https://attmoc.com/blog',
          title: 'ATTMOC Blog - Tech Insights & Tutorials',
          description: 'Expert articles on web development, AI, and digital solutions',
          images: [
            {
              url: 'https://attmoc.com/blog-og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'ATTMOC Blog',
            },
          ],
          type: 'website',
        }}
      />

      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">ATTMOC Blog</h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Insights, tutorials, and best practices from our team of developers and designers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div>
                    {/* Image Placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                      <div className="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-20">
                        📝
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category Badge */}
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-3">
                        {post.category}
                      </span>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                        </div>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* No posts message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No posts found in this category. Check back soon!
              </p>
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-purple-100 mb-8">
              Get the latest articles and insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white border-0"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}