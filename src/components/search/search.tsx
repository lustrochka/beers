import { useSearchParams } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import { useGetObjectsQuery } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setObjects } from '../../store/slices/objectsSlice';
import { setIsLoading } from '../../store/slices/isLoadingSlice';
import { setTotal } from '../../store/slices/totalSlice';
import { useEffect, useState } from 'react';
import './search.scss';

export function Search() {
  const [searchString, setSearchString, saveSearchString] = useSearchQuery();
  const [finalSearch, setFinalSearch] = useState(searchString);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get('page')) || 1;
  const dispatch = useDispatch();

  const { data, isLoading } = useGetObjectsQuery({
    pageNumber,
    searchString: finalSearch,
  });

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      dispatch(setObjects(data?.data));
      dispatch(setTotal(data?.total));
    }
  }, [data]);

  return (
    <div className="search-block">
      <div>Find astronomical object</div>
      <div className="search">
        <input
          type="search"
          value={searchString}
          className="search-input"
          onChange={(event) => setSearchString(event.target.value.trim())}
        ></input>
        <div
          className="loupe"
          onClick={() => {
            saveSearchString();
            setSearchParams({ page: '1' });
            setFinalSearch(searchString);
          }}
        ></div>
      </div>
    </div>
  );
}
