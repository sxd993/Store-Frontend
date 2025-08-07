// pages/Home/Home.jsx
import Hero from '../../components/Home/Hero';
import Categories from '../../components/Home/Categories';
import { PopularOffers } from './PopularOffers';


const popularIds = [51, 52, 53];

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <a className='flex justify-center text-center w-full text-7xl mt-5' href='/catalog'>ПЕРЕЙТИ В КАТАЛОГ</a>
        <Hero />
        <PopularOffers ids={popularIds} />
        <Categories />
      </div>
    </div>
  );
};

export default Home;