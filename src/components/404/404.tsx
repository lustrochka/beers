import './404.scss';
import empty from '../../assets/empty.png';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <div className="not-found">
        <div className="not-found__container">
          <img src={empty}></img>
          <svg className="not-found__circle" viewBox="0 0 200 100">
            <path id="circle" d="M 70,120 A 150,50 0 0,0 220,120" />
            <text x="10" className="not-found__title">
              <textPath xlinkHref="#circle">404</textPath>
            </text>
            <path id="arc" d="M 70,180 A 120,50 0 0,0 220,180" />
            <text x="10" className="not-found__subtitle">
              <textPath xlinkHref="#arc">not found</textPath>
            </text>
          </svg>
        </div>
        <p className="not-found__paragraph">There is no beer here...Try this</p>
        <Link to="/">
          <button className="not-found__button">Go home</button>
        </Link>
      </div>
    </>
  );
}
