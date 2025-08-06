import { CatalogList } from './CatalogList';
import { FilterSideBar } from '../../components/Catalog/Filter';

const Catalog = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-8xl mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Боковая Панель Фильтров */}
            <FilterSideBar/>

          {/* Каталог */}
          <div className="flex-1">
            <CatalogList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog; 