import React, { useEffect, useState } from "react";
import axios from "axios";
import FurnitureCardInfo from "./FurnitureCardInfo";
import Modal from "./Modal";

const allFurnitureCardsUrl = 'http://90.156.170.222:8080/search/all';

const SearchResult = () => {
  const [furCards, setFurCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const fetchFurnitureCards = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(allFurnitureCardsUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        const cards = data.map((element) => ({
          id: element.id,
          name: element.name,
          description: element.description,
          maker: element.maker,
          model: element.model,
          pic: element.pictures,
        }));

        setFurCards(cards);
        setLoading(false);
      } catch (error) {
        setError("Ошибка при выполнении запроса: " + (error.response?.data?.message || error.message));
        setLoading(false);
      }
    };

    fetchFurnitureCards();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {furCards.map((element) => (
        <div key={element.id}>
          <FurnitureCardInfo
            id={element.id}
            name={element.name}
            description={element.description}
            maker={element.maker}
            model={element.model}
            pictures={element.pic}
            onImageClick={handleImageClick}
          />
          <br />
          <br />
        </div>
      ))}

      {/* Если есть выбранное изображение, показываем модальное окно */}
      {selectedImage && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SearchResult;
