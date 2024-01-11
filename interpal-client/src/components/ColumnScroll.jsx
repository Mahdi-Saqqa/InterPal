// ColumnScroll.js
import React, { useEffect } from "react";

const ColumnItem = ({ imageUrl, title, info }) => (
  <figure className="column__item">
    <div className="column__item-imgwrap">
      <img src={imageUrl} alt="" title="" height="" width="" />
      <div className="column__item-caption">
        <span className="title">{title}</span>
        <span className="info">{info}</span>
      </div>
    </div>
  </figure>
);
const ColumnScroll = () => {
  const test = [1, 2, 3, 4, 5, 6, 7, 8];

  // Empty dependency array ensures the effect runs only once on mount
  useEffect(() => {
    const columnsContainer = document.querySelector(".columns");
    const reverseColumns = document.querySelectorAll(".column-reverse");

    columnsContainer.style.overflowY = "hidden";

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newTranslateY = scrollPosition / 2;


      reverseColumns.forEach(($column) => {
        $column.style.transform = `translateY(${newTranslateY}px)`;
        $column.style.webkitTransform = `translateY(${newTranslateY}px)`;
        $column.style.mozTransform = `translateY(${newTranslateY}px)`;
        $column.style.msTransform = `translateY(${newTranslateY}px)`;
        $column.style.oTransform = `translateY(${newTranslateY}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="columns" data-scroll-container="">
      <div className="column column-reverse">
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/17.3450839a.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/18.763d23f6.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/19.be25549f.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/20.d7a9356b.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/21.4c8813a5.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/22.ec97ea6e.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/23.49e8893a.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/24.057dafba.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
      </div>

      <div className="column">
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/9.ea63bab4.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/10.57de09c7.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/11.ba790930.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/12.c3a8d893.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/9.ea63bab4.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/10.57de09c7.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/11.ba790930.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/12.c3a8d893.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
      </div>

      <div className="column  column-reverse">
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/1.04213a58.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/2.3ff1fdb6.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/3.b606be87.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/4.24fd614c.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />

        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/1.04213a58.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/2.3ff1fdb6.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/3.b606be87.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/4.24fd614c.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
      </div>
      <div className="column">
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/9.ea63bab4.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/10.57de09c7.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/11.ba790930.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/12.c3a8d893.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/9.ea63bab4.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/10.57de09c7.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/11.ba790930.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
        <ColumnItem
          imageUrl="https://tympanus.net/Development/ColumnScroll/12.c3a8d893.jpg"
          title="Lorem Ipsum Dolor"
          info="Quisque vel felis lectus donec vitae dapibus magna"
        />
      </div>
    </div>
  );
};

export default ColumnScroll;
