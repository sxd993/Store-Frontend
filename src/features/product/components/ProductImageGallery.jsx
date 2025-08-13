import { useMemo } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export const ProductImageGallery = ({ images = [], productName = "Товар" }) => {
  // Преобразуем массив URL в формат для react-image-gallery
  const galleryImages = useMemo(() => {
    if (!images || images.length === 0) {
      return [{
        original: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwSDQwMFYyNTBIMjAwVjE1MFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZDoiNCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIyNjAiIGN5PSIxOTAiIHI9IjE1IiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPg==',
        thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAyMEg3MFY0MEgzMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZDoiMiIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSI0NSIgY3k9IjMwIiByPSIzIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPg==',
        description: 'Изображение недоступно'
      }];
    }

    return images.map((imageUrl, index) => ({
      original: imageUrl,
      thumbnail: imageUrl,
      description: '',
      originalAlt: `${productName} - фото ${index + 1}`,
      thumbnailAlt: `Миниатюра ${index + 1}`
    }));
  }, [images, productName]);

  const galleryProps = {
    items: galleryImages,
    showPlayButton: false,
    showFullscreenButton: true,
    showNav: true,
    showThumbnails: images.length > 1,
    thumbnailPosition: 'bottom',
    useBrowserFullscreen: true,
    slideOnThumbnailOver: false,
    showBullets: false,
    showIndex: false,
    autoPlay: false,
    disableSwipe: false,
    disableThumbnailSwipe: false,
    lazyLoad: true,
    slideDuration: 300,
    slideInterval: 3000,
    startIndex: 0,
    swipingTransitionDuration: 250,
    onErrorImageURL: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkY2B4Ii8+CjxwYXRoIGQ9Ik0yNTAgMTgwSDM1MFYyMjBIMjUwVjE4MFoiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZDoiNCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMDAiIGN5PSIyMDAiIHI9IjEwIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPg=='
  };

  return (
    <div className="product-image-gallery">
      <style>{`
        .image-gallery {
          width: 100%;
          max-width: 600px;
        }
        
        .image-gallery-slide img {
          max-height: 500px !important;
          object-fit: contain !important;
          width: 100% !important;
          height: auto !important;
        }
        
        .image-gallery-thumbnail img {
          height: 60px !important;
          width: 60px !important;
          object-fit: cover !important;
          border-radius: 4px;
        }
        
        .image-gallery-thumbnail.active img {
          border: 2px solid #374151;
        }
        
        .image-gallery-thumbnails {
          padding: 16px 0 0 0;
        }
        
        .image-gallery-thumbnail {
          margin: 0 4px;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        
        .image-gallery-thumbnail:hover {
          background: #f3f4f6;
        }
        
        .image-gallery-left-nav,
        .image-gallery-right-nav {
          background: none !important;
          color: #6b7280 !important;
          border: none !important;
          width: 32px !important;
          height: 32px !important;
          font-size: 16px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: color 0.2s ease !important;
          box-shadow: none !important;
          filter: none !important;
          text-shadow: none !important;
          -webkit-box-shadow: none !important;
          -moz-box-shadow: none !important;
          transform: none !important;
          -webkit-transform: none !important;
          -moz-transform: none !important;
          scale: none !important;
          animation: none !important;
          -webkit-animation: none !important;
          -moz-animation: none !important;
          transition: color 0.2s ease !important;
          will-change: auto !important;
          backface-visibility: visible !important;
          perspective: none !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          -webkit-transform: translateY(-50%) !important;
          -moz-transform: translateY(-50%) !important;
        }
        
        .image-gallery-left-nav:hover,
        .image-gallery-right-nav:hover {
          color: #374151 !important;
        }
        
        .image-gallery-fullscreen-button {
          display: none !important;
        }
        
        @media (max-width: 768px) {
          .image-gallery-slide img {
            max-height: 300px !important;
          }
          
          .image-gallery-thumbnail img {
            height: 50px !important;
            width: 50px !important;
          }
          
          .image-gallery-left-nav,
          .image-gallery-right-nav {
            width: 35px !important;
            height: 35px !important;
            font-size: 16px !important;
          }
        }
      `}</style>
      
      <ImageGallery {...galleryProps} />
    </div>
  );
};