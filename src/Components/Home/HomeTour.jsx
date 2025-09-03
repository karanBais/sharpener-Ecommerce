import React from 'react';

const HomeTour = () => {
  const tourData = [
    { date: 'JUL 16', city: 'DETROIT, MI', venue: 'DTE ENERGY MUSIC THEATRE' },
    { date: 'JUL 19', city: 'TORONTO, ON', venue: 'BUDWEISER STAGE' },
    { date: 'JUL 22', city: 'BRISTOW, VA', venue: 'JIGGY LUBE LIVE' },
    { date: 'JUL 29', city: 'PHOENIX, AZ', venue: 'AK-CHIN PAVILION' },
    { date: 'AUG 2', city: 'LAS VEGAS, NV', venue: 'T-MOBILE ARENA' },
    { date: 'AUG 7', city: 'CONCORD, CA', venue: 'CONCORD PAVILION' },
  ];

  return (
    <div className="d-flex flex-column w-50 mx-auto mt-5">
      <h1 className="text-center mb-4">TOURS</h1>
      <table className="table">
        <tbody>
          {tourData.map((tour, index) => (
            <tr key={index}>
              <td>{tour.date}</td>
              <td>{tour.city}</td>
              <td>{tour.venue}</td>
              <td>
                <button className="btn btn-primary text-white">Buy TICKETS</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeTour;
