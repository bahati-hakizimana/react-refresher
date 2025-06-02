import React, { useState } from 'react'

const Card = ({ title }) => {
    const [ hasLiked, setHasLiked] = useState(false);
  return (
    <div className="card">
      <h1>{title}</h1>
     <button onClick={() => setHasLiked(!hasLiked)}>
        { hasLiked ? 'Liked' : 'Like' }
     </button>
    </div>
  )
}

export default Card;
