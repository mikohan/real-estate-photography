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
  console.log(price);

  let btnColor = 'btn-soft-leaf';
  let btnText = 'Add';
  if (checked) {
    btnColor = 'btn-soft-fuchsia';
    btnText = 'Remove';
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
    alt = price.attributes.thumbnail.data.attributes.alternativeText
      ? price.attributes.thumbnail.data.attributes.alternativeText
      : 'Alt Text';
  } catch {
    alt = 'Alt Text';
  }
  // const src = BACKEND_IMG_URL + price.attributes.thumbnail.data.attributes.formats.large.url;
  console.log(price.attributes.thumbnail.data.attributes.formats);
  let src = '';
  try {
    if (price.attributes.thumbnail.data.attributes.formats.large) {
      src = BACKEND_IMG_URL + price.attributes.thumbnail.data.attributes.formats.large.url;
      const height = price.attributes.thumbnail.data.attributes.formats.large.height;
      const width = price.attributes.thumbnail.data.attributes.formats.large.width;
    } else if (price.attributes.thumbnail.data.attributes.formats.medium) {
      src = BACKEND_IMG_URL + price.attributes.thumbnail.data.attributes.formats.medium.url;
      const height = price.attributes.thumbnail.data.attributes.formats.medium.height;
      const width = price.attributes.thumbnail.data.attributes.formats.medium.width;
    } else if (price.attributes.thumbnail.data.attributes.formats.small) {
      src = BACKEND_IMG_URL + price.attributes.thumbnail.data.attributes.formats.small.url;
      const height = price.attributes.thumbnail.data.attributes.formats.small.height;
      const width = price.attributes.thumbnail.data.attributes.formats.small.width;
    }
  } catch {
    src = '/img/illustrations/i25.png';
  }
  const sale = true;
  const newProduct = true;

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
            <p
              style={{ fontSize: '70%', fontWeight: 300 }}
              dangerouslySetInnerHTML={{ __html: price.attributes.description }}
            ></p>
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

      <td style={{ textAlign: 'center' }}>
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
        <button className={`btn ${btnColor} btn-sm rounded-pill`} onClick={handleChecked}>
          {btnText}
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
