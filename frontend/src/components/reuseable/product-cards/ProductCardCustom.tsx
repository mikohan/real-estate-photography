import { FC } from 'react';
import currency from 'utils/currency';
import NextLink from '../links/NextLink';
import ratingGenerate from 'utils/ratings';
import { IPriceDatum } from 'interfaces/IPrice';
import { BACKEND_IMG_URL } from 'config';
import Image from 'next/image';

// =========================================
type ProductCardProps = {
  price: IPriceDatum;
  className?: string;
};
// =========================================

const ProductCard: FC<ProductCardProps> = (props) => {
  const { className, price } = props;

  const badge = (title: string, color: string) => {
    return (
      <span
        style={{ top: '1rem', left: '1rem' }}
        className={`avatar ${color} text-white w-10 h-10 position-absolute text-uppercase fs-13`}
      >
        <span>{title}</span>
      </span>
    );
  };

  let alt: string = '';
  try {
    alt = price.attributes.thumbnail.data.attributes.alternativeText
      ? price.attributes.thumbnail.data.attributes.alternativeText
      : 'Alt Text';
  } catch {
    alt = 'Alt Text';
  }
  const src = BACKEND_IMG_URL + price.attributes.thumbnail.data.attributes.formats.large.url;
  const sale = true;
  const newProduct = true;
  const salePrice = 5;
  const regularPrice = price.attributes.value;

  const height = price.attributes.thumbnail.data.attributes.formats.large.height;
  const width = price.attributes.thumbnail.data.attributes.formats.large.width;
  return (
    <div className={`project item ${className}`}>
      <figure className="rounded mb-6 position-relative overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <h2>{price.attributes.name}</h2>
              <NextLink title="Add to Cart" href="#" className="btn btn-primary" />
            </div>
            <div className="col-4"></div>
            <div className="col-4">
              <Image src={src} height={height} width={width} alt={alt} />
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default ProductCard;
