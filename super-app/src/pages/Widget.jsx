import React, { useRef } from "react";
import { useNavigate } from "react-router";
import style from "../styles/Widget.module.css";
import userImg from "/card_img/boydp.png";
import { useState, useEffect } from "react";
import { getNews, getWeather } from "../services";
import pressure_icon from "/card_img/pressure_icon.png";
import humid_icon from "/card_img/Humid_icon2.png";
import wind_icon from "/card_img/wind_icon.png";
import Line from "/card_img/Line.png";

const Widget = () => {
  const [weather, setWeather] = useState(null);
  const [notes, setNotes] = useState("");
  const navigate= useNavigate()
  const divRef = useRef(null);
  const [news, setNews] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const movies = JSON.parse(localStorage.getItem("selectedMovies"));
  const handleNotes = (e) => {
    setNotes(e.target.value);
  };

  useEffect(() => {
    getWeather()
      .then((res) => {
        setWeather(res.current); // Set only the current weather data
      })
      .catch((err) => console.error("Weather API Fetch Error:", err));
  }, []);

  useEffect(() => {
    getNews()
      .then((res) => {
        if (res && res.articles && res.articles.length > 0) {
          setNews(res.articles[0]);
        } else {
          console.error("No articles found or API error", res);
          setNews(null); // Handle case where no articles are returned
        }
      })
      .catch((err) => console.error("API Fetch Error:", err));
  }, []);
  return (
    <div
      className={style.widget}
      style={{
        maxHeight: "100vh",
        overflowY: "hidden",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "2rem",
        }}
      >
        <div
          style={{
            gridRow: "1",
            display: "grid",
            gridTemplateRows: "60% 40%",
            gridTemplateColumn: "1fr",
            gap: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#5746EA",
              borderRadius: "24px",
              padding: "0.8rem",
              display: "flex",
              gap: "1rem",
              height: "auto",
              maxHeight: "Xpx",
            }}
          >
            <img src={userImg} alt="userImg" width={120} height={230} />
            <div style={{ paddingTop: "7px" }}>
              <h2 style={{ marginBottom: "2.5px" }}>{user?.name}</h2>
              <p style={{ marginBottom: "2.5px" }}>{user?.email}</p>
              <p>{user?.userName}</p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.6rem",
                  marginTop: "1rem",
                }}
              >
                {movies?.map((movie) => (
                  <div
                    key={movie.id}
                    style={{
                      backgroundColor: "#9F94FF",
                      color: "#FFFFFF",
                      fontSize: "16px",
                      padding: "0.5rem",
                      width: "6rem",
                      borderRadius: "10px",
                      marginTop: "1px",
                    }}
                  >
                    {movie.title}{" "}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "",
              borderRadius: "24px",
              padding: "0",
              marginTop: "-1.5vh",
              marginBottom: "2.7vh",
            }}
          >
            <div className="stopwatch"
              style={{
                height: "27%",
                backgroundColor: "rgba(255, 74, 222, 1)",
                width: "100%",
                borderRadius: "7px",
                fontSize: "24px",
                padding: "9px 9px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {new Date().toLocaleDateString("en-CA")} &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp;
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
            <div
              style={{
                height: "73%",
                backgroundColor: "rgba(16, 23, 68, 1)",
                borderRadius: "11px",
                padding: "1rem",
                color: "white",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {weather ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    columnGap:'1rem'
                  }}
                >
                  <div className="col1">
                    <img
                      style={{ width: "3.3rem", height: "3rem" }}
                      src={weather.condition.icon}
                      alt="weather-icon"
                    />
                    <p>{weather.condition.text}</p>
                  </div>

                  <div className="col2">
                    <p style={{ fontSize: "2.2rem" }}>
                      {weather.temp_c}°C <br />{" "}
                    </p>{" "}
                    <br />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.7rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <img style={{}} src={pressure_icon} />
                      </div>
                      <div>
                        <p>
                          {" "}
                          {weather.pressure_mb} mb <br />
                          Pressure{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col3">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <img src={wind_icon} />
                      </div>
                      &nbsp; &nbsp; &nbsp; 
                      <div></div>
                      <p>
                        {" "}
                        {weather.wind_kph} km/h <br />
                        Wind{" "}
                      </p>
                    </div>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.7rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        &nbsp; &nbsp;{" "}
                        <img
                          style={{ width: "14px", height: "21px" }}
                          src={humid_icon}
                        />{" "}
                        &nbsp;
                      </div>
                      <div style={{}}>
                        <p>
                          {" "}
                          {weather.humidity}% <br />
                          Humidity{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading weather...</p>
              )}
            </div>
          </div>
        </div>
        <div
          className={style.focus}
          ref={divRef}
          style={{
            backgroundColor: "#F1C75B",
            gridRow: "1",
            height: "60vh",
            borderRadius: "2rem",
            padding: "2rem",
            color: "black",
            fontWeight: "500",
          }}
          onClick={() => divRef.current.focus()}
          contentEditable={true}
          onInput={handleNotes}
        >
          {notes}
        </div>
        <div
          style={{
            backgroundColor: "pink",
            gridColumn: "1 / -1",
            borderRadius: "24px",
          }}
        ></div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        {news === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div
              style={{
                height: "50vh",
                width: "50vw",
                position: "relative",
                objectFit: "cover",
              }}
            >
              <img
                src={news.urlToImage}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
              <div
                style={{
                  width: "40vw",

                  height: "20vh",
                  position: "absolute",
                  bottom: "0",
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(10px)",
                  padding: "1rem",

                  // opacity: "30%"
                }}
              >
                <p
                  style={{
                    whiteSpace: "wrap",
                    textAlign: "left",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  }}
                >
                  {news.description}
                </p>
              </div>
            </div>
            <div
              style={{
                height: "50vh",
                padding: "2rem",
                overflowY: "scroll",
              }}
            >
              <p style={{ textAlign: "justify" }}>
                {news.content}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                similique accusamus corporis iste aspernatur cupiditate, sequi
                necessitatibus? Officiis numquam minima necessitatibus iusto
                suscipit, facere, nesciunt libero itaque, quo exercitationem
                dolorum. Ullam vitae ipsa fugiat commodi eligendi exercitationem
                dolore, qui eveniet beatae iste minus quae deleniti modi
                repellendus velit alias at distinctio nihil ea! Quis, vero
                beatae rerum quam itaque praesentium! Dolor sunt necessitatibus
                laborum nisi unde sit impedit, error quidem consequuntur ipsum
                commodi, inventore iure quis id, tenetur libero! Facilis
                corporis facere veritatis impedit libero iste blanditiis
                dignissimos omnis tenetur? Nihil, maxime ipsa optio magnam
                repudiandae eos tempore natus nulla fuga, sunt, adipisci neque
                quod. Temporibus dignissimos, praesentium autem, error quam
                officiis recusandae accusantium beatae delectus esse qui iste
                ad? Cumque magnam debitis numquam dolore commodi sunt in
                assumenda? Ab laudantium quam beatae, illum, molestiae veniam
                explicabo consequuntur aperiam dolor architecto voluptatum
                quaerat. Mollitia dolorum eum, sapiente cum expedita dolor! Quis
                dolores repellat sunt ipsa alias quidem labore est fugiat
                maiores possimus repellendus error, neque dolorum natus
                perspiciatis assumenda sequi, voluptatibus dolorem incidunt
                quos! Repellendus mollitia doloremque voluptatem reiciendis
                quis! Beatae dolorum, eius pariatur sunt distinctio nisi alias
                accusantium veritatis vero doloribus voluptate? Commodi quia
                voluptate consequuntur fugit sunt iste adipisci quaerat quas
                excepturi veniam qui, necessitatibus cumque numquam maiores?
                Veritatis commodi officiis similique obcaecati odio adipisci
                modi, dolorum possimus, ullam animi vel voluptatem accusantium!
                Consectetur laudantium aut, debitis, ab excepturi molestiae
                animi laborum unde enim, blanditiis quis quam accusantium.
                Aliquid laudantium molestias similique voluptate tempora. Vel,
                quasi pariatur blanditiis asperiores incidunt similique quisquam
                eum suscipit voluptatem quam inventore consectetur amet sit,
                sint consequatur ad provident necessitatibus repudiandae non
                assumenda. Dignissimos omnis velit aut doloremque et perferendis
                placeat sint quas repudiandae facilis voluptatum, deserunt
                voluptate inventore error ea itaque corporis cum asperiores
                temporibus sapiente harum nam id magni modi? Architecto!
              </p>
             
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Widget;
