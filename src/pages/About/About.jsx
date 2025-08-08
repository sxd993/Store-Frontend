import Features from '../../components/About/Features';
import Newsletter from '../../components/About/Newsletter';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <Features />
        <Newsletter />
      </div>
    </div>
  );
};

export default About;