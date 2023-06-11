import react, { useState, useEffect } from 'react'
import axios from 'axios'

const baseURL = `https://deckofcardsapi.com/api/deck`

const AutoCard = ({ deckID, deckCount }) => {

    const [card, setCard] = useState()
    const [imgAlt, setImgAlt] = useState()

    useEffect(() => {
        const drawCard = async () => {
            if (deckID && deckCount <= 52) {
                const newCard = await axios.get(`${baseURL}/${deckID}/draw/?count=1`)
                setCard(newCard.data.cards[0])
                setImgAlt(newCard.data.cards[0].value + ' of ' + newCard.data.cards[0].suit)
            } 
        }
        drawCard();
    }, [deckCount])

    return (
        <div>
            {card 
             ? <img src={card.image} alt={imgAlt}></img> 
             : <></>}
        </div>
    )
}

export default AutoCard