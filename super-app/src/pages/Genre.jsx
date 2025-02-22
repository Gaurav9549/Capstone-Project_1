import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure correct import
import style from "../styles/Genre.module.css";
import errorImg from "../images/vector.png";

const cards = [
  {
    id: 1,
    title: "Action",
    image: "/card_img/action.png",
    bgColor: "#FF5209",
  },
  {
    id: 2,
    title: "Drama",
    image: "/card_img/drama.png",
    bgColor: "#D7A4FF",
  },
  {
    id: 3,
    title: "Romance",
    image: "/card_img/romance.png",
    bgColor: "#11B800",
  },
  {
    id: 4,
    title: "Thriller",
    image: "/card_img/thriller.png",
    bgColor: "#84C2FF",
  },
  {
    id: 5,
    title: "Western",
    image: "/card_img/western.png",
    bgColor: "#902500",
  },
  {
    id: 6,
    title: "Horror",
    image: "/card_img/horror.png",
    bgColor: "#7358FF",
  },
  {
    id: 7,
    title: "Fantasy",
    image: "/card_img/fantasy.png",
    bgColor: "#FF4ADE",
  },
  {
    id: 8,
    title: "Music",
    image: "/card_img/music.png",
    bgColor: "#E61E32",
  },
  {
    id: 9,
    title: "Fiction",
    image: "/card_img/fiction.png",
    bgColor: "#6CD061",
  },
];

const Genre = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(false);

  const handleSelect = (card) => {
    if (selected.some((item) => item.id === card.id)) {
      setSelected(selected.filter((item) => item.id !== card.id));
    } else {
      setSelected([...selected, card]);
    }
  };

  const handleNextPage = () => {
    if (selected.length < 3) {
      setError(true);
      return; // Stops execution if the condition is met
    }

    setError(false);
    localStorage.setItem("selectedMovies", JSON.stringify(selected));
    console.log("Navigate to the next page");
    navigate("/widget"); // Ensure this route exists in your Router
  };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <h1 className={style.title}>Super App</h1>
        <h2 className={style.subtitle}>
          Choose your <br />
          entertainment
          <br /> category
        </h2>
        <div className={style.selected}>
          {selected.map((item) => (
            <span className={style.chips} key={item.id}>
              {item.title} &nbsp; &nbsp;&nbsp;
              <span className={style.remove} onClick={() => handleSelect(item)}>
                X
              </span>
            </span>
          ))}
        </div>
        {error && (
          <p style={{ color: "red" }} className={style.error}>
            <span>
              <img
                style={{ width: "20px", height: "20px" }}
                src={errorImg}
                alt="Error"
              />
            </span>{" "}
            Minimum 3 categories required
          </p>
        )}
      </div>

      <div className={style.right}>
        {cards.map((card) => (
          <div
            className={style.card}
            key={card.id}
            style={{
              backgroundColor: card.bgColor,
              border: selected.some((item) => item.id === card.id)
                ? "3px solid #72DB73"
                : "none",
            }}
            onClick={() => handleSelect(card)}
          >
            <h3>{card.title}</h3>
            <img className={style.cardImg} src={card.image} alt={card.title} />
          </div>
        ))}
      </div>
      <button onClick={handleNextPage} className={style.submitBtn}>
        Next Page
      </button>
    </div>
  );
};

export default Genre;
