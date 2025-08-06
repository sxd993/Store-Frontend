// pages/Home/Home.jsx
import Hero from '../../components/Home/Hero';
import Categories from '../../components/Home/Categories';
import { PopularOffers } from './PopularOffers';


const popularIds = [51, 52, 53];

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <Hero />
        <PopularOffers ids={popularIds} />
        <Categories />
      </div>
    </div>
  );
};

export default Home;