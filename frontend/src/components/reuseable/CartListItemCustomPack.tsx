import Link from 'next/link';
import Image from 'next/image';
import { FC, Fragment, SetStateAction, useState } from 'react';
import currency from 'utils/currency';
import NextLink from './links/NextLink';
import { IPrice, IPriceDatum } from 'interfaces/IPrice';
import { BACKEND_IMG_URL } from 'config';
import { IGrandTotal } from 'interfaces/IListing';
import { IPackageSetDatum } from 'interfaces/IPackageSet';

// =============================================================
type CartListItemProps = {
  price: IPackageSetDatum;
  setGrandTotal: React.Dispatch<SetStateAction<IGrandTotal[]>>;
  grandTotal: IGrandTotal[];
};
// =============================================================

const CartListItem: FC<CartListItemProps> = (props) => {
  const { grandTotal, setGrandTotal } = props;
  const { price } = props;
  const [quantity, setQuantity] = useState(1);
  const [salePrice, setSalePrice] = useState(0);
  const [regularPrice, setRegularPrice] = useState(price.attributes.value);
  const [checked, setChecked] = useState(false);

  let btnColor = 'btn-soft-leaf';
  let btnText = 'Add';
  if (checked) {
    btnColor = 'btn-soft-fuchsia';
    btnText = 'Added';
  }

  const handleChecked = () => {
    setChecked((checked) => !checked);

    let arr = [];
    if (!grandTotal.find((item) => item.id === price.id)) {
      arr = [...grandTotal, { id: price.id, price: price.attributes.value }];
      setGrandTotal(arr);
    } else {
      arr = grandTotal.filter((item) => item.id !== price.id);
      setGrandTotal(arr);
    }
  };

  // Data work

  let alt: string = '';
  try {
    alt = price.attributes.image.data.attributes.alternativeText
      ? price.attributes.image.data.attributes.alternativeText
      : 'Alt Text';
  } catch {
    alt = 'Alt Text';
  }
  // const src = BACKEND_IMG_URL + price.attributes.image.data.attributes.formats.large.url;
  let src = '';
  try {
    if (price.attributes.image.data.attributes.formats.large) {
      src = BACKEND_IMG_URL + price.attributes.image.data.attributes.formats.large.url;
      const height = price.attributes.image.data.attributes.formats.large.height;
      const width = price.attributes.image.data.attributes.formats.large.width;
    } else if (price.attributes.image.data.attributes.formats.medium) {
      src = BACKEND_IMG_URL + price.attributes.image.data.attributes.formats.medium.url;
      const height = price.attributes.image.data.attributes.formats.medium.height;
      const width = price.attributes.image.data.attributes.formats.medium.width;
    } else if (price.attributes.image.data.attributes.formats.small) {
      src = BACKEND_IMG_URL + price.attributes.image.data.attributes.formats.small.url;
      const height = price.attributes.image.data.attributes.formats.small.height;
      const width = price.attributes.image.data.attributes.formats.small.width;
    }
  } catch {
    src = '/img/illustrations/i25.png';
  }
  const sale = true;
  const newProduct = true;

  return (
    <tr>
      <td>
        <figure className="rounded w-17 d-none d-sm-none d-md-none d-lg-block">
          <Image width={90} height={100} src={src} alt="product" style={{ width: '100%', height: 'auto' }} />
        </figure>
      </td>
      <td className="option text-start d-flex flex-row align-items-center ps-0">
        <div className="w-100 ms-4">
          <h6 className="post-title h6 lh-xs mb-1" style={{ fontSize: '80%' }}>
            {price.attributes.name}
          </h6>
          <p className="d-sm-none d-none d-md-none d-lg-block" style={{ fontSize: '70%', fontWeight: 300 }}>
            <ul>
              {price.attributes.prices.data.map((item) => (
                <li key={item.id}>{item.attributes.name}</li>
              ))}
            </ul>
          </p>
        </div>
      </td>
      <td>
        <p className="price" style={{ fontSize: '80%' }}>
          <span className="amount">${regularPrice}</span>
        </p>
      </td>
      <td>
        <button className={`btn ${btnColor} btn-sm rounded-pill`} onClick={handleChecked}>
          {btnText}
        </button>
      </td>
    </tr>
  );
};

export default CartListItem;
