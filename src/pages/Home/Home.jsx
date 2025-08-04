import React from 'react';
import Hero from '../../components/Home/Hero';
import Categories from '../../components/Home/Categories';
import FeaturedProducts from '../../components/Home/FeaturedProducts';
import Accessories from '../../components/Home/Accessories';
import Brands from '../../components/Home/Brands';
import Features from '../../components/Home/Features';
import Testimonials from '../../components/Home/Testimonials';
import Newsletter from '../../components/Home/Newsletter';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Accessories />
      <Brands />
      <Features />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
