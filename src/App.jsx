import { useEffect, useState } from "react";
import "./App.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import data from "./Component/data";
import { FaQuoteRight } from "react-icons/fa";

function App() {
  const [count, setCount] = useState(0);
  const [people, setPeople] = useState(data);

  const nextPerson = () => {
    setCount(count + 1);
  };
  const prevPerson = () => {
    setCount(count - 1);
  };
  useEffect(() => {
    const lastSlide = people.length - 1;
    if (count < 0) {
      setCount(lastSlide);
    }
    if (count > lastSlide) {
      setCount(0);
    }
  }, [count, people]);
  useEffect(() => {
    let slider = setInterval(() => {
      setCount(count + 1);
    }, 4000);
    return () => clearInterval(slider);
  }, [count]);
  return (
    <>
      <section>
        <div className="title">
          <span>/</span>
          <h1>Our Reviews</h1>
        </div>
        <div className="section-center">
          {people.map((person, index) => {
            const { id, job, title, image, duties } = person;
            let position = "nextSlide";
            if (index === count) {
              position = "activeSlide";
            }
            if (
              index === count - 1 ||
              (count === 0 && index === people.length - 1)
            ) {
              position = "prevSlide";
            }
            return (
              <article key={id} className={position}>
                <img src={image} alt={title} />
                <div className="content">
                  <h4>{title}</h4>
                  <h5>{job}</h5>
                  <p>{duties}</p>
                  <FaQuoteRight className="quote" />
                </div>
              </article>
            );
          })}
          <button>
            <FaChevronLeft className="icon" onClick={prevPerson} />
            <FaChevronRight className="icon" onClick={nextPerson} />
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
