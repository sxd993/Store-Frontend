import React from 'react';
import Hero from '../../components/Home/Hero';
import Categories from '../../components/Home/Categories';
import Features from '../../components/Home/Features';
import Testimonials from '../../components/Home/Testimonials';
import Newsletter from '../../components/Home/Newsletter';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Categories />
        <Features />
        <Testimonials />
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
