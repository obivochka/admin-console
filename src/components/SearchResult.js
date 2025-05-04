import React, { useEffect, useState } from "react";
import axios from "axios";
import FurnitureCardInfo from "./FurnitureCardInfo";

const allFurnitureCardsUrl = 'http://localhost:8080/search/all';

const SearchResult = () => {
    // Состояние для хранения данных карточек мебели
    const [furCards, setFurCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Используем useEffect для выполнения запроса при монтировании компонента
    useEffect(() => {
        const fetchFurnitureCards = async () => {
            try {
                const response = await axios.get(allFurnitureCardsUrl);
                const data = response.data;

                // Массив карточек мебели
                const cards = data.map((element) => ({
                    id : element.id,
                    name: element.name,
                    description: element.description,
                    maker: element.maker,
                    model: element.model,
                    pic: [element.pictures]
                }));

                setFurCards(cards);  // Обновляем состояние карточками
                setLoading(false);    // Отключаем загрузку
            } catch (error) {
                setError('Ошибка при выполнении запроса: ' + error.message);
                setLoading(false);
            }
        };

        fetchFurnitureCards();
    }, []); // Пустой массив зависимостей, чтобы запрос выполнялся только при монтировании

    // Если данные загружаются, показываем сообщение
    if (loading) {
        return <div>Загрузка...</div>;
    }

    // Если есть ошибка, показываем сообщение об ошибке
    if (error) {
        return <div>{error}</div>;
    }

    // Отображаем карточки, когда данные загружены
    return (
        <div>
            {furCards.map((element, index) => (
                <div key={index}>
                    <FurnitureCardInfo
                    id={element.id}
                        name={element.name}
                        description={element.description}
                        maker={element.maker}
                        model={element.model}
                        pictures={element.pic}
                    />
                    <br />
                    <br />
                </div>
            ))}
        </div>
    );
};

export default SearchResult;