import React, { useMemo, useRef, useState, useCallback } from 'react';
import './TinderCards.css';
import TinderCard from 'react-tinder-card';
import SwipeButtons from './SwipeButtons';

const PEOPLE = [
  {
    name: 'Rangannan, Gave up land for Bengaluru Airport',
    url: 'https://i.pinimg.com/736x/73/ba/c3/73bac381e69534f756a63b0e7bd04c69.jpg',
  },
  {
    name: 'Putturumees, Think hes some big M',
    url: 'https://i.pinimg.com/736x/7a/af/a4/7aafa48454a02b5c6ed22e7246b06dbe.jpg',
  },
  {
    name: 'Muthu Pandi, Chellom lover ',
    url: 'https://i.pinimg.com/736x/23/76/6d/23766db814253a893053b45e7d494a75.jpg',
  },
  {
    name: 'Umesh & Shaji, Buy 1 get 1',
    url: 'https://i.pinimg.com/736x/f6/d8/d0/f6d8d0986ed8bed5151a680ce23a7e55.jpg',
  },
  {
    name: 'Nagavalli, Loves shopping aabharanam',
    url: 'https://i.pinimg.com/736x/e4/7d/59/e47d59a3e923659215ab9e0ca350d5aa.jpg',
  },
  {
    name: 'Vijay,future CM of TN',
    url: 'https://i.pinimg.com/736x/46/2b/1b/462b1b8ec9978cdd6f6a3b48224068cb.jpg',
  },
  {
    name: 'Malar,used to be a professor in kerala',
    url: 'https://i.pinimg.com/736x/0c/a9/2d/0ca92dc073a30e5f74a9a917576eed71.jpg',
  },
];

function TinderCards() {
  const [currentIndex, setCurrentIndex] = useState(PEOPLE.length - 1);
  const [lastDirection, setLastDirection] = useState('');
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () => Array(PEOPLE.length).fill(0).map(() => React.createRef()),
    []
  );

  const updateIndex = useCallback((val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  }, []);

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, name) => {
    setLastDirection(direction);
    console.log(`You swiped ${direction} on ${name}`);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} left the screen`);
    updateIndex(idx - 1);
  };

  const swipe = async (dir) => {
    if (canSwipe && childRefs[currentIndex].current) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {PEOPLE.map((person, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={person.name}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name, index)}
            preventSwipe={['up', 'down']}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}

        {!canSwipe && (
          <div className="tinderCards__empty">
            <p>No more profiles nearby</p>
            <span>Check back later for more chaos matches</span>
          </div>
        )}
      </div>

      {lastDirection && canSwipe && (
        <p className="tinderCards__feedback">
          {lastDirection === 'right' ? '❤️ Liked!' : '👎 Noped!'}
        </p>
      )}

      <SwipeButtons onSwipe={swipe} canSwipe={canSwipe} />
    </div>
  );
}

export default TinderCards;
