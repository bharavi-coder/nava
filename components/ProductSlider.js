import Slider from 'react-slick'
import Link from 'next/link'
import Image from './Image' 

const ProductSlider = ({ items = [] }) => {

  if (!items || items.length === 0) {
    return <div>No items to display</div>
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: 'ondemand',
  }   

  return (
    <div className="product-slider-container">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="slide-item">
            {item.href ? (
              <Link href={item.href} className="slide-link">
                <div className="image-wrapper">
                  <Image
                    src={item.src}
                    alt={item.alt || 'Slide image'}
                    width={item.width || 855}
                    height={item.height || 444}
                    onError={(e) => {
                      // set a simple SVG fallback when image fails to load
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="855" height="444"%3E%3Crect fill="%23ddd" width="855" height="444"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EImage not found%3C/text%3E%3C/svg%3E'
                    }}
                  />
                  {item.caption && (
                    <div className="caption">{item.caption}</div>
                  )}
                </div>
              </Link>
            ) : (
              <div className="image-wrapper">
                <Image
                  src={item.src}
                  alt={item.alt || 'Slide image'}
                  width={item.width || 855}
                  height={item.height || 444}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="855" height="444"%3E%3Crect fill="%23ddd" width="855" height="444"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EImage not found%3C/text%3E%3C/svg%3E'
                  }}
                />
                {item.caption && (
                  <div className="caption">{item.caption}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </Slider>

      <style dangerouslySetInnerHTML={{__html: `
        .product-slider-container {
          width: 100%;
          margin-bottom: 40px;
        }

        .slide-item {
          outline: none;
        }

        .slide-link {
          display: block;
          text-decoration: none;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 320px;
          border-radius: 8px;
          overflow: hidden;
          background: #d3d3d3;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .caption {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 18px;
          font-weight: 600;
          z-index: 2;
        }

        /* Slick arrows */
        :global(.product-slider-container .slick-prev),
        :global(.product-slider-container .slick-next) {
          width: 40px;
          height: 40px;
          z-index: 10;
        }

        :global(.product-slider-container .slick-prev) {
          left: 20px;
        }

        :global(.product-slider-container .slick-next) {
          right: 20px;
        }

        :global(.product-slider-container .slick-prev:before),
        :global(.product-slider-container .slick-next:before) {
          font-size: 30px;
          color: #fff;
        }

        /* Slick dots */
        :global(.product-slider-container .slick-dots) {
          bottom: 20px;
        }

        :global(.product-slider-container .slick-dots li button:before) {
          font-size: 12px;
          color: white;
          opacity: 0.5;
        }

        :global(.product-slider-container .slick-dots li.slick-active button:before) {
          color: white;
          opacity: 1;
        }

        @media (max-width: 768px) {
          .image-wrapper {
            height: 250px;
          }

          .caption {
            font-size: 16px;
            padding: 8px 16px;
            bottom: 15px;
            left: 15px;
          }

          :global(.product-slider-container .slick-prev) {
            left: 10px;
          }

          :global(.product-slider-container .slick-next) {
            right: 10px;
          }
        }

        @media (max-width: 480px) {
          .image-wrapper {
            height: 200px;
          }

          .caption {
            font-size: 14px;
            padding: 6px 12px;
            bottom: 10px;
            left: 10px;
          }
        }
      `}} />
    </div>
  )
}

export default ProductSlider