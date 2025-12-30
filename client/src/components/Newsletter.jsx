import React from 'react';

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gray-50 rounded-xl shadow-sm">
      <h1 className="text-3xl md:text-5xl font-semibold mb-4 text-gray-800">
        Never Miss a Blog
      </h1>
      <p className="text-gray-600 mb-8 max-w-xl">
        Subscribe to get the latest blogs, new tech updates, and exclusive news directly to your inbox.
      </p>

      <form
        className="flex w-full max-w-lg bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm"
      >
        <input
          type="email"
          placeholder="Enter your email address"
          required
          className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 md:px-10 bg-primary text-white font-medium hover:bg-primary/90 transition-all cursor-pointer"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
