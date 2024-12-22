import { IObjectResponse } from '../../types';
import Card from '../card/card';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './cardList.scss';

export function CardList() {
  const objectsData: IObjectResponse[] = useSelector(
    (state: RootState) => state.objects.objects
  );
  const isLoading: boolean = useSelector(
    (state: RootState) => state.isLoading.isLoading
  );

  return (
    <>
      {!isLoading && objectsData && (
        <div className="cardlist">
          {objectsData.length === 0 && <h2 className="">Nothing found</h2>}
          <div className="cardlist__container">
            {objectsData.map((item: IObjectResponse) => (
              <Card key={item.id.toString()} data={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
