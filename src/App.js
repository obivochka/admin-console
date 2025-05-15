import React from "react";
import Header from "./components/Header";
import FurnitureCard from "./components/FurnitureCard";
import Search from "./components/Search";
import SearchResult from "./components/SearchResult";
import SignInForm from "./components/SignInForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: !!localStorage.getItem("token") // Проверяем, есть ли токен
    };
  }

  handleLoginSuccess = () => {
    this.setState({ isAuthenticated: true });
  };

  render() {
    if (!this.state.isAuthenticated) {
      return (
        <div style={{ padding: "20px" }} className="auth">
          <h2 className="auth_h2">Вход</h2>
          <SignInForm onLoginSuccess={this.handleLoginSuccess} />
        </div>
      );
    }

    return (
      <div>
        <Header title="Добавление мебели в базу данных" />

        <main className="main-content" style={{ padding: "20px" }}>
          <div className="form-section" style={{ marginBottom: "20px" }}>
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
