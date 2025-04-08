import { useOutletContext, useSearchParams } from 'react-router-dom';
import './details.scss';
import { Loader } from '../loader/loader';
import { useGetObjectQuery } from '../../api/api';

export function DetailedPage() {
  const [id]: [id: string] = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, error, isLoading } = useGetObjectQuery(id);

  const changeUrl = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  return (
    <div className="details">
      <div className="close-button" onClick={changeUrl}>
        ✖
      </div>
      <div className="details__item">
        {isLoading && <Loader />}
        {error && <div>Something went wrong...</div>}
        {data && (
          <>
            <div>
              <h2>{data.name}</h2>
              <div>{data.description}</div>
            </div>
            <div className="details__chars">
              <div>
                {data.abv && (
                  <div>
                    <span className="details__name">ABV: </span>
                    {data.abv}%
                  </div>
                )}
                {data.ibu && (
                  <div>
                    <span className="details__name">IBU: </span>
                    {data.ibu}°
                  </div>
                )}
              </div>
              <div>
                {data.type && (
                  <div>
                    <span className="details__name">type: </span>
                    {data.type}
                  </div>
                )}
                {data.country && (
                  <div>
                    <span className="details__name">country: </span>
                    {data.country}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
