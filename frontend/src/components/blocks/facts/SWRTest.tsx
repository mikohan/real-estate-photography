import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { IPriceDatum } from 'interfaces/IPrice';
import { PRICES_URL } from 'config';

const Test: FC = () => {
  const [data, setData] = useState<IPriceDatum[]>([]);
  const [picked, setPicked] = useState<IPriceDatum[]>([]);
  const [checkList, setCheckList] = useState<number[]>([]);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    let picked: IPriceDatum[] = [];
    const index = picked.findIndex((object) => object.id === Number(e.target.value));

    if (index === -1) {
      picked.push();
    }
  };
  const handleChange = (e: any) => {
    if (e.target.checked === true) {
      setCheckList([...checkList, Number(e.target.value)]);
    } else {
      const selectedAcc = checkList.filter((a) => {
        if (a === Number(e.target.value)) return false;
        return true;
      });
      setCheckList([...selectedAcc]);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(PRICES_URL);
      setData(result.data.data);
    };
    fetchData();
  }, [checkList]);

  return (
    <div>
      {data.map((item: IPriceDatum) => {
        return (
          <div key={item.id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`flex-${item.id}`}
              onChange={(e) => handleChange(e)}
              value={item.id}
              checked={checkList.lastIndexOf(Number(item.id)) >= 0 ? true : false}
            />
            <label className="form-check-label" htmlFor="flexCheck">
              {item.attributes.name}
            </label>
            <label className="form-check-label" htmlFor="flexCheck">
              {item.attributes.value}
            </label>
          </div>
        );
      })}
    </div>
  );
};
export { Test };
