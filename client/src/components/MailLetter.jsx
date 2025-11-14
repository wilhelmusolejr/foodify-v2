import React from "react";

export default function MailLetter() {
  return (
    <div className="pb-20 pt-40 my-40 bg-black text-white relative box-out">
      <div className="box-in w-60 h-60 absolute left-1/2 -translate-x-1/2 -top-[25%] flex items-center justify-center">
        <img
          src="images/burger.png"
          alt="Burger"
          className="object-contain object-center w-full h-full"
        />
      </div>

      <div className="w-10/12 max-w-96 mx-auto">
        <h2 className="text-3xl font-medium mb-4">Deliciousness to your inbox</h2>
        <p>Enjoy weekly hand picked recipes and recommendations.</p>

        {/* form */}
        <div className="flex gap-3 flex-col mt-4">
          <input
            type="text"
            placeholder="e.g. chicken, rice, broccoli"
            className="w-full bg-white text-black rounded-lg px-4 py-3"
          />
          <button className="bg-white w-full text-black px-4 py-3 rounded-lg">Get Started</button>
        </div>
      </div>
    </div>
  );
}
