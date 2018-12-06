import React from 'react';
import { NavLink } from 'react-router-dom';


const defaultCelebrity = {
  fullName: 'No Name',
  imageUrl: 'image not found',
  hourlyPrice: 0,
  availabilities: [],
};

const colSize = num => {
  if (num % 12 === 0) return 'col s6 m4 l3';
  else if (num % 11 === 0) return 'col s6 m4 l3';
  else if (num % 10 === 0) return 'col s6 m4 l3';
  else if (num % 9 === 0) return 'col s6 m4 l4';
  else if (num % 8 === 0) return 'col s6 m3 l3';
  else if (num % 7 === 0) return 'col s6 m3 l3';
  else if (num % 6 === 0) return 'col s6 m6 l4';
  else if (num % 5 === 0) return 'col s6 m6 l4';
  else if (num % 4 === 0) return 'col s6 m6 l3';
  else if (num % 3 === 0) return 'col s12 m6 l4';
  else if (num % 2 === 0) return 'col s12 m12 l6';
  else if (num % 1 === 0) return 'col s12 m12 l12';
  else return 'col s6 m4 l3';

}

const SingleCelebrity = ({ celebrity, length, isAdmin }) => {

  const celeb = celebrity || defaultCelebrity;
  let celebId = String(celeb.id);

  return (

        <div className={colSize(length)}>
          <div className="card small">
            <div className="card-image">
              {isAdmin ? <NavLink to={`/edit/${celebrity.id}`}><img src={celeb.imageUrl}></img></NavLink> : <NavLink to={`/celebrities/${celebrity.id}`}><img src={celeb.imageUrl}></img></NavLink>}
            </div>
            <p style={{align: 'left', display: 'inline-block'}}>{`${celeb.availabilities.length} slots left`}</p>
            <p style={{textAlign: 'right', display: 'inline-block', color: '#4b71fc' }}>{`$${celeb.hourlyPrice}/hour`}</p>
            <hr></hr>
            {isAdmin ? <NavLink to={`/edit/${celebrity.id}`}><h5 style={{color: 'black'}}>{celeb.fullName}</h5></NavLink> : <NavLink to={`/celebrities/${celebrity.id}`}><h5 style={{color: 'black'}}>{celeb.fullName}</h5></NavLink>}
            <p>This is lorem ipsum in case we want to add a description later on. This is lorem ipsum in case we want to add a description later on.</p>
          </div>
        </div>
  );
};

export default SingleCelebrity;
