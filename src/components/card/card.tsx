import { IObjectResponse, ISelectedItems } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelected } from '../../store/slices/selectedSlice';
import { useEffect, useState } from 'react';
import { useGetObjectQuery } from '../../api/api';
import './card.scss';

interface IMyProps {
  data: IObjectResponse;
}

export default function Card(props: IMyProps) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItems: ISelectedItems = useSelector(
    (state: RootState) => state.selected.selected
  );
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data } = useGetObjectQuery(props.data.id.toString(), {
    skip: !shouldFetch,
  });

  useEffect(() => {
    if (data) dispatch(setSelected(changeSelectedItems()));
  }, [data]);

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target instanceof HTMLElement) {
      if (!e.target.classList.contains('card-checkbox'))
        goToItem(props.data.id);
    }
  };

  const goToItem = (id: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('details', `${id}`);
    setSearchParams(newSearchParams);
  };

  const changeSelectedItems = () => {
    const selectedItemsCopy = { ...selectedItems };
    selectedItemsCopy[props.data.id.toString()] = {
      name: data?.name || '',
      type: data?.type || '',
      abv: data?.abv.toString() || '',
      ibu: data?.ibu.toString() || '',
      country: data?.country || '',
      description: data?.description || '',
    };
    return selectedItemsCopy;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (!data) {
        setShouldFetch(true);
      } else {
        dispatch(setSelected(changeSelectedItems()));
      }
    } else {
      const selectedItemsCopy = { ...selectedItems };
      delete selectedItemsCopy[props.data.id];
      dispatch(setSelected(selectedItemsCopy));
    }
  };

  return (
    <div className="card" onClick={(e) => onClick(e)}>
      <h3>{props.data.name}</h3>
      <div>{props.data.description.slice(0, 350)}...</div>
      <input
        type="checkbox"
        className="card__checkbox"
        checked={props.data.id in selectedItems}
        onChange={(e) => handleChange(e)}
      ></input>
    </div>
  );
}
