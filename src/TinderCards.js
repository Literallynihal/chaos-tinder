import React, { useMemo, useRef, useState, useCallback } from 'react';
import './TinderCards.css';
import TinderCard from 'react-tinder-card';
import SwipeButtons from './SwipeButtons';

const PEOPLE = [
  {
    name: 'Raju, 24',
    url: 'https://i.pinimg.com/474x/7a/af/a4/7aafa48454a02b5c6ed22e7246b06dbe.jpg',
  },
  {
    name: 'Priya, Professional Napper',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop',
  },
  {
    name: 'Arjun, Can Only Cook Maggi',
    url: 'https://i.pinimg.com/474x/6f/e8/a1/6fe8a1c40291faea1d24c768860945bf.jpg',
  },
  {
    name: 'Sneha, Horoscope Says No',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
  },
  {
    name: 'Vikram, 3 Cats in Trenchcoat',
    url: 'https://i.pinimg.com/474x/23/76/6d/23766db814253a893053b45e7d494a75.jpg',
  },
  {
    name: 'Vijay,future CM of TN',
    url: 'https://www.pinterest.com/pin/555913147777396045',
  },
  {
    name: 'Aravind,alter ego of ani',
    url: 'https://www.pinterest.com/pin/1119426051155230145',
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
