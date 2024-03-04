
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'


function App() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const cardsPerPage = 6;
  const indexOfLastCard = (currentPage + 1) * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards&&cards.slice(indexOfFirstCard, indexOfLastCard)
  let baseURL = 'https://jsonplaceholder.typicode.com/posts'

    useEffect(() => {
    axios.get(baseURL).then((response) => {
      setCards(response.data)
    });
  }, []);

  const removeCard = (id) => {
    const newCards = cards.filter((card) => card.id !== id)
    setCards(newCards);

    if (currentCards.length <= 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (indexOfLastCard < cards.length) {
      setCurrentPage(currentPage + 1)
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  };

  return (
    <div className="App">
      <h1 className='heading'>Cards</h1>
      <div className="card-container">
        {currentCards.map((card) => (
          <div key={card.id} className="card">
          <button className='cross-button' onClick={() => removeCard(card.id)}>X</button>
            <div>{`${card.id}`}</div>
            <p>{`${card.title}`} </p>
            {/* <p>{`${card.body}`} </p> */}
          </div>
        ))}
      </div>
      <div className="navigation">
        <button className='buttons' onClick={prevPage}>Prev</button>
        <button className='buttons'  onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;
