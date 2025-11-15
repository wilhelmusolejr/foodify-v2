import React from "react";

import SectionHeading from "@components/SectionHeading";
import Navigator from "@components/Navigator";
import Label from "@components/Label";
import BlogItemV2 from "@components/BlogItemV2";
import Pagination from "../components/Pagination";
import Footer from "@components/Footer";
import MailLetter from "@components/MailLetter";

export default function Blog() {
  return (
    <>
      {/* Navigator */}
      <Navigator />

      {/* heading */}
      <div className="w-10/12 max-w-7xl mx-auto mt-30">
        <SectionHeading heading="Blog" subheading="Browse All Recipes by Category or Filter" />

        {/* Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-center gap-2 mb-20">
          {/* form */}
          <div className="w-full md:w-fit flex flex-col gap-2">
            <Label name="Blog name" required={true} />
            <input
              type="text_name"
              placeholder="e.g. chicken, rice, broccoli"
              className={`border flex-1 md:w-fit border-black/50 rounded-lg px-4 py-3 lg:min-w-80`}
            />
          </div>
          {/* button */}
          <button className="bg-black w-full md:w-fit cursor-pointer text-white px-4 py-3 rounded-lg uppercase">
            <p>Search</p>
          </button>
        </div>

        {/* parent */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-20">
          {/* item */}
          <BlogItemV2 />
          <BlogItemV2 />
          <BlogItemV2 />
          <BlogItemV2 />
          <BlogItemV2 />
          <BlogItemV2 />
        </div>

        <Pagination />
      </div>

      {/* Section - mail letter */}
      <MailLetter />

      {/* Footer */}
      <Footer />
    </>
  );
}
