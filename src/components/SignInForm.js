import React, { useState } from "react";
import axios from "axios";

const SignInForm = ({ onLoginSuccess }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://90.156.170.222:8080/auth/sign-in", {
        login: login,
        password: password
      });

      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        setResponseMessage("Успешный вход! Токен сохранён.");
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setResponseMessage("Токен не найден в ответе.");
      }

    } catch (error) {
      console.error("Ошибка при авторизации:", error);
      if (error.response) {
        setResponseMessage("Ошибка: не верный логин или пароль");
      } else {
        setResponseMessage("Сетевая ошибка");
      }
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Авторизация</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="signin-input"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signin-input"
        />
        <button type="submit" className="signin-button">
          Войти
        </button>
        {responseMessage && (
          <p className="signin-message">
            {responseMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignInForm;
