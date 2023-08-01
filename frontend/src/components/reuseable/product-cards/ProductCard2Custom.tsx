import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import currency from 'utils/currency';
import NextLink from '../links/NextLink';
import { IPriceDatum } from 'interfaces/IPrice';
import { IPackageSetDatum } from 'interfaces/IPackageSet';
import { BACKEND_IMG_URL } from 'config';

// ======================================================================
type ProductCard2Props = {
  price?: IPriceDatum;
  pack?: IPackageSetDatum;
};
// ======================================================================

const ProductCard2: FC<ProductCard2Props> = (props) => {
  const { price, pack } = props;
  let src = '';
  let title = '';
  let value = 0;

  if (pack) {
    src = BACKEND_IMG_URL + pack.attributes.image.data.attributes.formats.small.url;
    title = pack.attributes.name;
    value = pack.attributes.value;
  } else if (price) {
    src = BACKEND_IMG_URL + price.attributes.thumbnail.data.attributes.formats.small.url;
    title = price.attributes.name;
    value = price.attributes.value;
  }

  return (
    <div className="shopping-cart-item d-flex justify-content-between mb-4">
      <div className="d-flex flex-row d-flex align-items-center">
        <figure className="rounded w-17">
          <Link href="#" passHref legacyBehavior>
            <a>
              <Image width={90} height={100} src={src} alt="product" style={{ width: '100%', height: 'auto' }} />
            </a>
          </Link>
        </figure>

        <div className="w-100 ms-4">
          <h3 className="post-title h6 lh-xs mb-1">
            <NextLink title={title} href="#" className="link-dark" />
          </h3>

          {/* {color && <div className="small">Color: {color}</div>}
          {size && <div className="small">Size: {size}</div>} */}
        </div>
      </div>

      <div className="ms-2 d-flex align-items-center">
        <p className="price fs-sm">
          <span className="amount">${value}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard2;
