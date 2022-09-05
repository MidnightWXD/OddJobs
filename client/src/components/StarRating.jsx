import React, { useState } from "react";
import {AiFillStar} from "react-icons/ai";
import '../styles/StarRating.css';

const StarRating = ({ rating }) => {
    const [ratings, setStars] = useState(rating);
    const [hover, setHover] = useState(0);

    const onStarClick = (nextValue) => {
        setStars(nextValue);
    }

    const onStarHover = (nextValue) => {
        setHover(nextValue);
    }

    const renderStars = (stars) => {
        return [...Array(stars)].map((star, i) => {
            const ratingValue = i + 1;
            return (
                <label>
                    <input 
                    type="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={() => onStarClick(ratingValue)} 
                    className="ratingInput"
                    style={ {display: 'none'} }
                    />
                    <AiFillStar
                        key={i}
                        className="star"
                        size={47}
                        color={ratingValue <= (hover || ratings)  ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={() => onStarHover(ratingValue)}
                        onMouseLeave={() => onStarHover(null)}
                    />
                </label>
            );
        });
    }

    return (
        <div className="rating-stars">
            {renderStars(rating)}
        </div>
    );
}

export default StarRating;