import React from "react";
import { motion, AnimatePresence } from "framer-motion";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            showFilter: false,
            selectedCountry: "",
            selectedMechanism: "",
            countries: [
                { code: "russia", name: "Россия" },
                { code: "belarus", name: "Беларусь" },
                { code: "poland", name: "Польша" },
                { code: "germany", name: "Германия" },
                { code: "usa", name: "США" }
            ],
            mechanisms: [],
            items: [],
            filteredItems: []
        };
    }

    componentDidMount() {
        this.fetchMechanisms();
        this.fetchItems();
    }


    fetchMechanisms = async () => {
        try {
            const response = await fetch('/api/mechanisms');
            const data = await response.json();
            this.setState({ mechanisms: data });
        } catch (error) {
            console.error('Ошибка при загрузке механизмов:', error);
        }
    };


    fetchItems = async () => {
        try {
            const response = await fetch('/api/furniture');
            const data = await response.json();
            this.setState({ items: data, filteredItems: data });
        } catch (error) {
            console.error('Ошибка при загрузке мебели:', error);
        }
    };


    toggleFilter = () => {
        this.setState((prev) => ({ showFilter: !prev.showFilter }));
    };


    handleInputChange = (e) => {
        this.setState({ query: e.target.value });
    };


    handleCountryChange = (e) => {
        this.setState({ selectedCountry: e.target.value });
    };


    handleMechanismChange = (e) => {
        this.setState({ selectedMechanism: e.target.value });
    };


    applyFilters = () => {
        const { items, query, selectedCountry, selectedMechanism } = this.state;

        const filtered = items.filter((item) => {
            const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
            const matchesCountry = selectedCountry ? item.country === selectedCountry : true;
            const matchesMechanism = selectedMechanism ? item.mechanism === selectedMechanism : true;
            return matchesQuery && matchesCountry && matchesMechanism;
        });

        this.setState({ filteredItems: filtered });
    };

    render() {
        const {
            query,
            showFilter,
            selectedCountry,
            selectedMechanism,
            countries,
            mechanisms,
            filteredItems
        } = this.state;

        return (
            <div className="search_form">
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={query}
                    onChange={this.handleInputChange}
                    className="search_input"
                />
                <div className="buttons_row">
                    <button className="filter_button" onClick={this.toggleFilter}>
                        Фильтр
                    </button>
                    <button className="apply_button" onClick={this.applyFilters}>
                        Найти
                    </button>
                </div>

                <AnimatePresence>
                    {showFilter && (
                        <motion.div
                            className="filter_panel"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="filter_group">
                                <label>Страна:</label>
                                <select
                                    value={selectedCountry}
                                    onChange={this.handleCountryChange}
                                    className="select"
                                >
                                    <option value="">Все страны</option>
                                    {countries.map((c) => (
                                        <option key={c.code} value={c.code}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter_group">
                                <label>Механизм:</label>
                                <select
                                    value={selectedMechanism}
                                    onChange={this.handleMechanismChange}
                                    className="select"
                                >
                                    <option value="">Все механизмы</option>
                                    {mechanisms.map((m) => (
                                        <option key={m.code} value={m.code}>
                                            {m.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="results">
                    {filteredItems.length === 0 ? (
                        <p className="empty">Ничего не найдено</p>
                    ) : (
                        <ul>
                            {filteredItems.map((item, i) => (
                                <li key={i} className="result_item">
                                    {item.name} — {item.country}, {item.mechanism}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    }
}

export default Search;
