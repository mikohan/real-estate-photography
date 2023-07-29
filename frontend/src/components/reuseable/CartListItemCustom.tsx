import Link from 'next/link';
import Image from 'next/image';
import { FC, Fragment, SetStateAction, useState } from 'react';
import currency from 'utils/currency';
import NextLink from './links/NextLink';
import { IPrice, IPriceDatum } from 'interfaces/IPrice';
import { BACKEND_IMG_URL } from 'config';
import { IGrandTotal } from '../../../pages/shop/listing';

// =============================================================
type CartListItemProps = {
  price: IPriceDatum;
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
  const total = +quantity * (salePrice || regularPrice);
  const handleQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  // Data work

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

  const height = price.attributes.thumbnail.data.attributes.formats.large.height;
  const width = price.attributes.thumbnail.data.attributes.formats.large.width;

  return (
    <tr>
      <td className="option text-start d-flex flex-row align-items-center ps-0">
        <figure className="rounded w-17">
          <Link href="#" passHref legacyBehavior>
            <a>
              <Image width={90} height={100} src={src} alt="product" style={{ width: '100%', height: 'auto' }} />
            </a>
          </Link>
        </figure>

        <div className="w-100 ms-4">
          <h3 className="post-title h6 lh-xs mb-1">
            <NextLink title={price.attributes.name} href="#" className="link-dark" />
          </h3>
        </div>
      </td>

      <td>
        <p className="price">
          {salePrice ? (
            <Fragment>
              <del>
                <span className="amount">{currency(regularPrice)}</span>
              </del>{' '}
              <ins>
                <span className="amount">{currency(salePrice)}</span>
              </ins>
            </Fragment>
          ) : (
            <span className="amount">{currency(regularPrice)}</span>
          )}
        </p>
      </td>

      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexCheck"
            onChange={handleChecked}
            checked={checked}
          />
        </div>
      </td>
      <td>
        <button className="btn btn-primary rounded-pill" onClick={handleChecked}>
          Add
        </button>
      </td>

      {/* <td>
        <div className="form-select-wrapper">
          <select className="form-select form-select-sm mx-auto" defaultValue={1} onChange={handleQuantity}>
            {[1, 2, 3, 4, 5].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </td> */}

      {/* <td>
        <p className="price">
          <span className="amount">{currency(total)}</span>
        </p>
      </td> */}
    </tr>
  );
};

export default CartListItem;
