import React from "react";
import Header from "./components/Header";
import FurnitureCard from "./components/FurnitureCard";
import Search from "./components/Search";
import SearchResult from "./components/SearchResult";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header title="Добавление мебели в базу данных" />
        <main className="main-content">
        

<div className="form-section">
  <h3>Заполните форму</h3>
  <FurnitureCard />
</div>

<div className="search-section">
         <h3>Поиск</h3>
         <Search />
            </div>
          <div className="result-section">
            <h3>Результат поиска</h3>
            <SearchResult />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
