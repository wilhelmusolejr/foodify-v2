import React from "react";

// COMPONENT
import Navigator from "@components/Navigator";
import Paragraph from "@components/Paragraph";
import MailLetter from "@components/MailLetter";
import Footer from "@components/Footer";
import { Link } from "react-router-dom";

const blogPost = {
  header: "10 Quick and Easy Dinner Recipes for Busy Weeknights",
  date: "November 15, 2025",
  image_name: "blog1.jpg",
  description:
    "Discover simple, tasty dinner ideas that you can make in under 30 minutes—perfect for those busy evenings when time is short but flavor still matters.",
  content: [
    {
      type: "paragraph",
      text: "Weeknights can be hectic, but that doesn’t mean dinner has to be boring. With a little planning and the right recipes, you can enjoy delicious meals without spending hours in the kitchen.",
    },
    {
      type: "heading",
      text: "Why Quick Dinners Matter",
    },
    {
      type: "paragraph",
      text: "Quick dinners save time, reduce stress, and help you stay consistent with home cooking. They’re especially useful when balancing work, family, and personal time.",
    },
    {
      type: "list",
      items: ["Minimal ingredients", "Simple cooking steps", "Big flavor in less time"],
    },
    {
      type: "heading",
      text: "Final Thoughts",
    },
    {
      type: "paragraph",
      text: "With these quick dinner ideas, you’ll never feel stuck wondering what to cook after a long day. Keep a few go-to recipes ready, and dinner will always be stress-free.",
    },
  ],
};

export default function BlogItem() {
  const post = blogPost;

  return (
    <>
      <Navigator />

      <main className="bg-white my-10 md:my-14">
        {/* Hero */}
        <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={`/images/blog/${post.image_name}`}
            alt={post.header}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex items-center justify-center px-5">
            <div className="max-w-3xl text-center text-white">
              <p className="text-sm uppercase tracking-widest opacity-80 mb-3 bg-green-800 w-fit mx-auto px-2">
                Blog • {post.date}
              </p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-green-800">
                {post.header}
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="w-10/12 max-w-7xl mx-auto px-5 py-30">
          {/* Body */}
          <article className="mx-auto max-w-prose">
            <Paragraph className="mx-auto mb-5">{post.description}</Paragraph>

            <div className="flex flex-col gap-5 text-[#333]">
              {post.content.map((block, index) => {
                if (block.type === "paragraph") {
                  return (
                    <p key={index} className="leading-relaxed">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "heading") {
                  return (
                    <h2 key={index} className="font-semibold mt-5">
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul key={index}>
                      {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                return null;
              })}
            </div>
          </article>
        </section>

        {/* Footer CTA */}
        <section className="border-t border-black/10 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <h3 className="text-2xl font-semibold mb-3">Enjoyed this article?</h3>
            <p className="text-gray-600 mb-6">
              Discover more recipes, tips, and meal planning ideas on our blog.
            </p>

            <Link
              to="/blog"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Back to Blog
            </Link>
          </div>
        </section>
      </main>

      <br />
      <br />
      <br />

      {/* Section - mail letter */}
      <MailLetter />

      {/* Footer */}
      <Footer />
    </>
  );
}
