import React from "react";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/motionVariants";

// COMPONENTS
import Navigator from "@components/Navigator";
import Footer from "@components/Footer";
import MailLetter from "@components/MailLetter";

export default function Faq() {
  const faqData = [
    {
      category: "General",
      questions: [
        {
          q: "What is Foodify?",
          a: "Foodify is a meal planning and recipe discovery platform that helps you organize meals, save recipes, and plan your week effortlessly.",
        },
        {
          q: "Is Foodify free to use?",
          a: "Yes! Foodify offers free access to core features. Some advanced features may be introduced in the future.",
        },
      ],
    },
    {
      category: "Meal Planner",
      questions: [
        {
          q: "How do I add a recipe to my meal planner?",
          a: "Open any recipe, click 'Add to Planner', select a date and meal time, then confirm.",
        },
        {
          q: "Can I edit or delete meals later?",
          a: "Absolutely. You can modify or remove meals from your planner at any time.",
        },
      ],
    },
    {
      category: "Account",
      questions: [
        {
          q: "Do I need an account to use Foodify?",
          a: "You can browse recipes without an account, but saving meals and bookmarks requires signing in.",
        },
        {
          q: "How do I reset my password?",
          a: "Use the 'Forgot password' option on the login screen and follow the instructions sent to your email.",
        },
      ],
    },
    {
      category: "Recipes & Data",
      questions: [
        {
          q: "Where do the recipes come from?",
          a: "Recipes are fetched from a trusted third-party recipe API and enriched with additional details.",
        },
        {
          q: "Why are some recipes unavailable?",
          a: "This may happen due to API limitations or temporary network issues.",
        },
      ],
    },
  ];

  return (
    <>
      {/* Navigator */}
      <Navigator />

      {/* header */}
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="my-10 md:my-14 about-header"
      >
        <div className="min-h-[50vh] text-white flex items-center justify-center ">
          <div className="text-center capitalize flex gap-2 flex-col">
            <motion.p
              variants={fadeUp}
              className="italic  uppercase text-base md:text-lg lg:text-xl "
            >
              Everything you need to know.
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
            >
              FAQ
            </motion.h2>
          </div>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white"
      >
        {/* ---------------- FAQ CONTENT ---------------- */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-32 max-w-3xl mx-auto"
        >
          <div className="w-10/12 max-w-5xl mx-auto space-y-16">
            {faqData.map((group, idx) => (
              <motion.div key={idx} variants={fadeUp}>
                {/* Category title */}
                <h2 className="text-2xl font-semibold mb-6">{group.category}</h2>

                {/* Questions */}
                <div className="space-y-4">
                  {group.questions.map((item, index) => (
                    <FaqItem key={index} question={item.q} answer={item.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ---------------- CTA SECTION ---------------- */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-24 bg-gray-50 border-t border-black/10"
        >
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-semibold mb-3">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              If you couldn’t find the answer you’re looking for, feel free to reach out.
            </p>

            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition"
            >
              Contact Support
            </a>
          </div>
        </motion.section>
      </motion.div>

      <br />
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

/* ---------------- FAQ ITEM ---------------- */

function FaqItem({ question, answer }) {
  return (
    <details className="group border border-black/10 rounded-xl p-5 transition">
      <summary className="cursor-pointer font-medium text-gray-900 flex justify-between items-center">
        {question}
        <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
      </summary>

      <p className="mt-4 text-gray-600 leading-relaxed">{answer}</p>
    </details>
  );
}
