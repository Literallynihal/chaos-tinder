import React from 'react'
import './TinderCards.css'
import TinderCard from 'react-tinder-card';

function TinderCards() {
  // Local fake data - no Firebase needed!
  const people = [
    {
      name: "Raju, 24",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Priya, Professional Napper",
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      name: "Arjun, Can Only Cook Maggi",
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      name: "Sneha, Horoscope Says No",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
      name: "Vikram, 3 Cats in Trenchcoat",
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
    }
  ];

  return (
    <div>
      <div className='tinderCards__cardContainer'>
        {people.map(person => (
          <TinderCard
            className='swipe'
            key={person.name}
            preventSwipe={['up','down']}
          >
            <div
              style={{backgroundImage: `url(${person.url})`}}
              className='card'
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  )
}

export default TinderCards
