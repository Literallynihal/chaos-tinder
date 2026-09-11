import React, { useMemo, useRef, useState, useCallback } from 'react';
import './TinderCards.css';
import TinderCard from 'react-tinder-card';
import SwipeButtons from './SwipeButtons';

const PEOPLE = [
  {
    name: 'Raju, 24',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
  },
  {
    name: 'Priya, Professional Napper',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop',
  },
  {
    name: 'Arjun, Can Only Cook Maggi',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop',
  },
  {
    name: 'Sneha, Horoscope Says No',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
  },
  {
    name: 'Vikram, 3 Cats in Trenchcoat',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop',
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
