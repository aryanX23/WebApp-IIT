import React from 'react';
import { Link } from 'react-router-dom';
function Blog() {
  const generateCards = () => {
    const cardData = [
      { header: 'Header 1', title: 'Dark card title 1', text: 'Some quick example text for card 1.' },
      { header: 'Header 2', title: 'Dark card title 2', text: 'Some quick example text for card 2.' },
      { header: 'Header 3', title: 'Dark card title 3', text: 'Some quick example text for card 3.' },
      { header: 'Header 4', title: 'Dark card title 4', text: 'Some quick example text for card 4.' },
      { header: 'Header 5', title: 'Dark card title 5', text: 'Some quick example text for card 5.' },
      { header: 'Header 6', title: 'Dark card title 6', text: 'Some quick example text for card 6.' },
    ];

    return cardData.map((card, index) => (
      <div key={index} className="col-md-4">
        <div className="card border-dark mb-3 " style={{ maxWidth: '18rem' }}>
          <div className="card-header">{card.header}</div>
          <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.text}</p>
            <Link  className="btn btn-outline-dark">Explore More!!</Link>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h1>News for You!!!!!!!!!!</h1>
      <hr />
      <div className="row">
        {generateCards()}
      </div>
      {/* <div className="row">
        {generateCards()}
      </div> */}
    </div>
  );
}

export default Blog;
