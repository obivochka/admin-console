import React from "react";

class FurnitureCardInfo extends React.Component {
    render() {
        return (
            <div>

                <p>Название : {this.props.name}</p>
                <p>Описание : {this.props.description}</p>
                <p>Фабрика : {this.props.maker}</p>
                <p>Модель : {this.props.model}</p>

                <di>
                    {this.props.pictures[0].map(element => (
                            <img src={element} alt={'Картинка'}/>
                        )
                    )
                    }
                </di>


                {/*{this.props.pictures.forEach(element => {*/}
                {/*    <div>*/}
                {/*        <h2>Картинка</h2>*/}
                {/*        <img src={element} alt={'Картинка'}/>*/}
                {/*    </div>*/}
                {/*})}*/}
            </div>

        )
    }

}

export default FurnitureCardInfo