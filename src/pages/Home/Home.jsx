import Hero from '../../components/Home/Hero';
import Categories from '../../components/Home/Categories';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <Hero />
        <Categories />
      </div>
    </div>
  );
};

export default Home;
