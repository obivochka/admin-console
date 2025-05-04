import React from "react";
import axios from "axios";

const saveUrl = 'http://localhost:8080/admin/saveFurnitureCard';
const formDada = new FormData();

class FurnitureCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            maker: '',
            model: '',
            files: []
        };
    }

    handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            formDada.append('pictures[]', file, file.name);
        });
        this.setState({ files });
    };

    render() {
        return (
            <div className="new">
                <form>
                    <input
                        placeholder="Название"
                        onChange={(e) => this.setState({ name: e.target.value })}
                    /><br /><br />
                    <input
                        placeholder="Описание"
                        onChange={(e) => this.setState({ description: e.target.value })}
                    /><br /><br />
                    <input
                        placeholder="Производитель"
                        onChange={(e) => this.setState({ maker: e.target.value })}
                    /><br /><br />
                    <input
                        placeholder="Модель"
                        onChange={(e) => this.setState({ model: e.target.value })}
                    /><br /><br />

                    {/* Кастомная загрузка файлов */}
                    <div className="file-upload-container">
                        <input
                            type="file"
                            id="file-upload"
                            multiple
                            className="hidden-file-input"
                            onChange={this.handleFileChange}
                        />
                        <label htmlFor="file-upload" className="custom-file-label">
                            Загрузить фотографии
                        </label>

                        {/* Список выбранных файлов */}
                        {this.state.files.length > 0 && (
                            <div className="file-list">
                                {this.state.files.map((file, index) => (
                                    <div key={index}>{file.name}</div>
                                ))}
                            </div>
                        )}
                    </div>
                    <br /><br />

                    <button
                        type="button"
                        onClick={() => {
                            const request = {
                                name: this.state.name,
                                description: this.state.description,
                                maker: this.state.maker,
                                model: this.state.model,
                            };

                            const json = JSON.stringify(request);
                            const blob = new Blob([json], {
                                type: 'application/json',
                            });

                            formDada.append('request', blob);

                            axios.post(saveUrl, formDada).then((rs) => {
                                console.log(rs);
                            });
                        }}
                    >
                        Добавить
                    </button>
                </form>
            </div>
        );
    }
}

export default FurnitureCard;
