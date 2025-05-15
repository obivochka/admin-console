import React, { Component } from "react";
import axios from "axios";

const saveUrl = 'http://90.156.170.222:8080/admin/saveFurnitureCard';

class FurnitureCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      maker: '',
      model: '',
      files: [],
      errorMessage: ''
    };
  }

  handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    this.setState({ files });
  };

  handleSave = () => {
    const { name, description, maker, model, files } = this.state;

    if (!name || !description || !maker || !model || files.length === 0) {
      this.setState({ errorMessage: 'Пожалуйста, заполните все поля и добавьте файлы.' });
      return;
    }

    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (!token) {
      this.setState({ errorMessage: 'Токен не найден. Авторизуйтесь заново.' });
      return;
    }

    const formData = new FormData();
    const json = JSON.stringify({ name, description, maker, model });
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('request', blob);

    files.forEach(file => {
      formData.append('pictures[]', file, file.name);
    });

    axios.post(saveUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log('Успешно добавлено:', response.data);
      this.setState({
        name: '',
        description: '',
        maker: '',
        model: '',
        files: [],
        errorMessage: ''
      });
    })
    .catch((error) => {
      console.error('Ошибка при отправке данных:', error.response || error.message);
      this.setState({ errorMessage: 'Произошла ошибка при отправке данных. Попробуйте еще раз.' });
    });
  };

  render() {
    const { name, description, maker, model, files, errorMessage } = this.state;

    return (
      <div className="new">
        <form>
          <input
            type="text"
            placeholder="Название"
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
          /><br /><br />
          <input
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => this.setState({ description: e.target.value })}
          /><br /><br />
          <input
            type="text"
            placeholder="Производитель"
            value={maker}
            onChange={(e) => this.setState({ maker: e.target.value })}
          /><br /><br />
          <input
            type="text"
            placeholder="Модель"
            value={model}
            onChange={(e) => this.setState({ model: e.target.value })}
          /><br /><br />

          <div className="file-upload-container">
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={this.handleFileChange}
            />
            <label htmlFor="file-upload" className="custom-file-label">
              Загрузить фотографии
            </label>

            {files.length > 0 && (
              <div className="file-list">
                {files.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            )}
          </div><br /><br />

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button
            type="button"
            onClick={this.handleSave}
          >
            Добавить
          </button>
        </form>
      </div>
    );
  }
}

export default FurnitureCard;
