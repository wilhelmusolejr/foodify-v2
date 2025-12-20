import React from "react";

import Logo from "@components/Logo";

export default function Footer() {
  const socialLinks = [
    {
      name: "portfolio",
      link: "https://wilhelmus.vercel.app",
    },
    {
      name: "facebook",
      link: "https://facebook.com/wilhelmus.ole",
    },
    {
      name: "GitHub",
      link: "https://github.com/wilhelmusolejr",
    },
    {
      name: "LinkedIn",
      link: "https://linkedin.com/wilhelmusolejr",
    },
  ];

  return (
    <footer className="bg-white w-10/12 mx-auto border border-black/10 rounded-lg mb-30">
      <div className="flex flex-col lg:flex-row lg:items-center pt-14 lg:pt-0  gap-14 justify-center min-h-[50vh] w-10/12 max-w-7xl mx-auto">
        {/* side 1 */}
        <div className="flex gap-2 flex-col md:w-10/12 max-w-[450px]">
          <Logo />
          <p className=" leading-relaxed text-[#333] font-light">
            “On the other hand, we denouce with righteous indignation and dsilike men who are so
            beguiled and demoralized by the charms of pleasure of the moment”
          </p>
        </div>

        {/* side 2 */}
        <div className="flex gap-10 flex-col md:flex-row justify-center mb-14 flex-1 md:items-start lg:mb-0">
          {/* nav 1 */}
          <div className="uppercase">
            <h2 className=" text-2xl font-medium mb-5">Browse</h2>
            <ul className="flex  gap-5 flex-col font-light">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Recipes</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Faq</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </div>
          {/* nav 2 */}
          <div className="uppercase">
            <h2 className=" text-2xl font-medium mb-5">Connect With Us</h2>
            <ul className="flex gap-5 flex-col font-light">
              {socialLinks.map((social, index) => (
                <li key={index + social.name}>
                  <a href={social.link} target="_blank" rel="noopener noreferrer">
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t text-center text-white border border-black/10 bg-green-900 rounded-b-lg">
        <p className="uppercase py-5">all right reserved.</p>
      </div>
    </footer>
  );
}
