import Hero from '../../components/Home/Hero';
import Categories from '../../components/Home/Categories';
import { PopularOffers } from '../../components/Home/PopularOffers';

const popularIds = [51, 52, 53, 54]; // Здесь укажите id популярных товаров

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
