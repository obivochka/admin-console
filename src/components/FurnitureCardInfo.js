import React from "react";

class FurnitureCardInfo extends React.Component {
  render() {
    const { pictures } = this.props;

    const images = Array.isArray(pictures) ? pictures : [];

    console.log("Изображения:", images);

    return (
      <div className="furniture-card">
        <p>Название : {this.props.name}</p>
        <p>Описание : {this.props.description}</p>
        <p>Фабрика : {this.props.maker}</p>
        <p>Модель : {this.props.model}</p>

        <div className="furniture-images">
          {images.length > 0 ? (
            images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Картинка ${index}`}
                className="furniture-image"
                onClick={() => this.props.onImageClick(url)}
              />
            ))
          ) : (
            <p>Изображения не доступны</p>
          )}
        </div>
      </div>
    );
  }
}

export default FurnitureCardInfo;
