/**
 * content-strategy.ts
 * Comprehensive long-form content strategy for your website
 * Bilingual content planning with SEO optimization
 */

import { Language } from '@/lib/seo/metadata';
import { BilingualText } from './alt-text';
import { generateMetadata, BASE_URL } from './metadata';
import { Metadata } from 'next';

/**
 * Interface for bilingual blog post content
 */
export interface BlogPost {
  // URL slug for the post
  slug: string;
  
  // Bilingual title
  title: BilingualText;
  
  // Bilingual description/excerpt
  description: BilingualText;
  
  // Keywords for SEO (both languages)
  keywords: string[];
  
  // Content angle/approach
  angle: string;
  
  // Internal links to include
  internalLinks: string[];
  
  // Optional fields
  author?: string;
  publishDate?: string;
  updateDate?: string;
  featuredImage?: string;
  categories?: string[];
  readingTime?: number;
}

/**
 * Blog post metadata interface
 */
export interface BlogPostMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  publishDate: string;
  updateDate?: string;
  author: string;
  url: string;
  readingTime?: number;
}

/**
 * Luna's long-form content plan
 * Structured bilingual blog posts with SEO optimization
 */
export const CONTENT_STRATEGY: BlogPost[] = [
  {
    slug: "benefits-of-bilingual-daycare",
    title: {
      en: "The Benefits of Bilingual Daycare for Young Children",
      nl: "De Voordelen van Tweetalige Kinderopvang voor Jonge Kinderen"
    },
    description: {
      en: "How learning two languages early on shapes social, emotional, and cognitive growth. With real stories from Teddy Kids.",
      nl: "Hoe het leren van twee talen op jonge leeftijd bijdraagt aan sociale, emotionele en cognitieve ontwikkeling. Met verhalen van Teddy Kids."
    },
    keywords: ["bilingual daycare", "early childhood language", "expat families", "Teddy Kids method"],
    angle: "Authority + emotional storytelling",
    internalLinks: ["/about", "/programs", "/team"],
    featuredImage: "/images/blog/bilingual-benefits.jpg",
    categories: ["Education", "Language Development", "Bilingual Learning"]
  },
  {
    slug: "preparing-your-child-for-first-day",
    title: {
      en: "Preparing Your Child for Their First Day at Daycare",
      nl: "Je Kind Voorbereiden op de Eerste Dag op de Kinderopvang"
    },
    description: {
      en: "Practical tips, emotional support, and what to expect when starting at Teddy Kids.",
      nl: "Praktische tips, emotionele steun en wat je kunt verwachten bij de start bij Teddy Kids."
    },
    keywords: ["first daycare day", "child preparation", "emotions", "routine", "parents"],
    angle: "Trust-building + empathy",
    internalLinks: ["/programs", "/faq", "/contact"],
    featuredImage: "/images/blog/first-day-preparation.jpg",
    categories: ["Parenting Tips", "Emotional Support", "New Families"]
  },
  {
    slug: "daycare-vs-preschool-difference",
    title: {
      en: "Daycare vs Preschool: What's the Difference?",
      nl: "Kinderopvang vs Peuterschool: Wat is het Verschil?"
    },
    description: {
      en: "Understanding which early learning option fits your child best, and how Teddy Kids blends both worlds.",
      nl: "Welke vorm van opvang past het beste bij jouw kind? En hoe Teddy Kids beide werelden combineert."
    },
    keywords: ["daycare vs preschool", "early education options", "Teddy Kids blend"],
    angle: "Clarification + decision support",
    internalLinks: ["/programs", "/about"],
    featuredImage: "/images/blog/daycare-vs-preschool.jpg",
    categories: ["Education", "Early Learning", "Childcare Options"]
  },
  {
    slug: "expat-guide-childcare-netherlands",
    title: {
      en: "Expat Parents' Guide to Childcare in the Netherlands",
      nl: "Kinderopvang Gids voor Expats in Nederland"
    },
    description: {
      en: "From subsidies to school transitions, this guide explains everything for international families living in NL.",
      nl: "Van toeslagen tot doorstroming naar school — deze gids legt alles uit voor internationale gezinnen in Nederland."
    },
    keywords: ["expat childcare", "subsidy", "bilingual daycare", "Dutch system"],
    angle: "Expat support + onboarding",
    internalLinks: ["/apply", "/faq", "/programs"],
    featuredImage: "/images/blog/expat-guide.jpg",
    categories: ["Expat Resources", "Dutch System", "International Families"]
  },
  {
    slug: "inside-a-teddy-kids-day",
    title: {
      en: "Inside a Teddy Kids Day: Schedule, Activities & Routines",
      nl: "Een Dag bij Teddy Kids: Dagindeling, Activiteiten & Ritmes"
    },
    description: {
      en: "A peek into our daily rhythm, from breakfast to pickup. See what your child experiences at Teddy Kids.",
      nl: "Een kijkje in ons dagelijks ritme, van ontbijt tot ophalen. Ontdek wat je kind beleeft bij Teddy Kids."
    },
    keywords: ["daycare routine", "Teddy Kids daily life", "structure", "safety"],
    angle: "Transparency + reassurance",
    internalLinks: ["/programs", "/locations"],
    featuredImage: "/images/blog/daily-routine.jpg",
    categories: ["Daily Life", "Activities", "Routines"]
  },
  {
    slug: "what-is-bso",
    title: {
      en: "What Is BSO? Understanding After-School Care in the Netherlands",
      nl: "Wat is BSO? Naschoolse Opvang Uitgelegd"
    },
    description: {
      en: "A parent-friendly explanation of BSO — who it's for, how it works, and why it matters.",
      nl: "Een oudervriendelijke uitleg over BSO — voor wie het is, hoe het werkt en waarom het belangrijk is."
    },
    keywords: ["BSO", "after-school care", "Teddy Kids BSO", "parent questions"],
    angle: "Educational + practical",
    internalLinks: ["/programs", "/apply"],
    featuredImage: "/images/blog/bso-explained.jpg",
    categories: ["After-School Care", "BSO", "School-Age Children"]
  }
];

/**
 * Default blog post metadata
 */
export const DEFAULT_BLOG_METADATA = {
  author: "Teddy Kids Team",
  publishDate: new Date().toISOString(),
  ogImage: "/images/og/blog-default.jpg"
};

/**
 * Get a blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return CONTENT_STRATEGY.find(post => post.slug === slug);
}

/**
 * Get blog posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return CONTENT_STRATEGY.filter(post => 
    post.categories?.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );
}

/**
 * Get blog posts by keyword
 */
export function getBlogPostsByKeyword(keyword: string): BlogPost[] {
  return CONTENT_STRATEGY.filter(post => 
    post.keywords.some(kw => 
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
}

/**
 * Get related blog posts
 */
export function getRelatedBlogPosts(slug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(slug);
  if (!currentPost) return [];

  // Score other posts by keyword and category overlap
  const scoredPosts = CONTENT_STRATEGY
    .filter(post => post.slug !== slug)
    .map(post => {
      let score = 0;
      
      // Score by keyword overlap
      currentPost.keywords.forEach(keyword => {
        if (post.keywords.includes(keyword)) score += 2;
      });
      
      // Score by category overlap
      currentPost.categories?.forEach(category => {
        if (post.categories?.includes(category)) score += 3;
      });
      
      // Score by internal link overlap
      currentPost.internalLinks.forEach(link => {
        if (post.internalLinks.includes(link)) score += 1;
      });
      
      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(item => item.post)
    .slice(0, limit);

  return scoredPosts;
}

/**
 * Generate blog post metadata for Next.js
 */
export function generateBlogPostMetadata(
  post: BlogPost,
  language: Language = 'en',
  path: string
): Metadata {
  const title = language === 'en' ? post.title.en : post.title.nl;
  const description = language === 'en' ? post.description.en : post.description.nl;
  
  return generateMetadata(
    'blog',
    language,
    path,
    {
      title,
      description,
      keywords: post.keywords,
      openGraph: {
        title,
        description,
        url: `${BASE_URL}/blog/${post.slug}`,
        images: [
          {
            url: post.featuredImage || DEFAULT_BLOG_METADATA.ogImage,
            width: 1200,
            height: 630,
            alt: title
          }
        ],
        type: 'article',
        publishedTime: post.publishDate || DEFAULT_BLOG_METADATA.publishDate,
        modifiedTime: post.updateDate,
        authors: [post.author || DEFAULT_BLOG_METADATA.author],
        tags: [...post.keywords, ...(post.categories || [])]
      }
    }
  );
}

/**
 * Generate schema.org BlogPosting JSON-LD
 */
export function generateBlogPostSchema(post: BlogPost, language: Language = 'en'): object {
  const title = language === 'en' ? post.title.en : post.title.nl;
  const description = language === 'en' ? post.description.en : post.description.nl;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: post.featuredImage || DEFAULT_BLOG_METADATA.ogImage,
    datePublished: post.publishDate || DEFAULT_BLOG_METADATA.publishDate,
    dateModified: post.updateDate || post.publishDate || DEFAULT_BLOG_METADATA.publishDate,
    author: {
      '@type': 'Person',
      name: post.author || DEFAULT_BLOG_METADATA.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Teddy Kids',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.svg`
      }
    },
    keywords: post.keywords.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`
    }
  };
}

/**
 * Generate estimated reading time for a blog post
 */
export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate a sitemap entry for a blog post
 */
export function generateBlogSitemapEntry(post: BlogPost): object {
  return {
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updateDate || post.publishDate || DEFAULT_BLOG_METADATA.publishDate,
    changeFrequency: 'monthly',
    priority: 0.7
  };
}

/**
 * Generate a complete blog sitemap
 */
export function generateBlogSitemap(): object[] {
  return CONTENT_STRATEGY.map(post => generateBlogSitemapEntry(post));
}

/**
 * Generate structured data for FAQ sections in blog posts
 */
export function generateBlogFAQSchema(faqs: { question: string; answer: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Example blog post content structure (for future implementation)
 */
export interface BlogPostContent {
  title: BilingualText;
  description: BilingualText;
  sections: {
    heading: BilingualText;
    content: BilingualText;
    image?: string;
    imageAlt?: BilingualText;
  }[];
  faqs?: {
    question: BilingualText;
    answer: BilingualText;
  }[];
  callToAction?: {
    text: BilingualText;
    link: string;
  };
}

/**
 * Example usage in a Next.js page:
 * 
 * // app/blog/[slug]/page.tsx
 * import { getBlogPostBySlug, generateBlogPostMetadata, generateBlogPostSchema } from '@/lib/seo/content-strategy';
 * import { ServerStructuredData } from '@/components/seo/StructuredData';
 * 
 * export async function generateMetadata({ params }: { params: { slug: string } }) {
 *   const post = getBlogPostBySlug(params.slug);
 *   if (!post) return {};
 *   return generateBlogPostMetadata(post, 'en', `/blog/${params.slug}`);
 * }
 * 
 * export default function BlogPost({ params }: { params: { slug: string } }) {
 *   const post = getBlogPostBySlug(params.slug);
 *   if (!post) return <div>Post not found</div>;
 *   
 *   return (
 *     <>
 *       <ServerStructuredData schema={generateBlogPostSchema(post, 'en')} />
 *       <h1>{post.title.en}</h1>
 *       <p>{post.description.en}</p>
 *       // Blog content goes here
 *     </>
 *   );
 * }
 */
