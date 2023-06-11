import react, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Card from './Card.js'

const baseURL = `https://deckofcardsapi.com/api/deck`

const Deck = () => {
    const [deckCount, setDeckCount] = useState(0)
    const [needDeck, setNeedDeck] = useState(false)
    const deckID = useRef()
    const oldDeck = useRef()

    const countCard = () => {
        if (deckCount < 52) {
            setDeckCount(n => n + 1);
        } else {
            oldDeck.current = deckID.current
            alert('Error: no cards remaining!')
        } 
    }

    // Toggle to get new deck
    const getNewDeck = () => {
        needDeck === false ? setNeedDeck(true) : setNeedDeck(false)
    }

    // Make axios req to get new deck when needed
    useEffect(() => {
        const NewID = async () => {
            const newDeck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
            deckID.current = newDeck.data.deck_id
            oldDeck.current == undefined ? setDeckCount(0) : setDeckCount(1)
        }
        NewID()
    }, [needDeck])

    console.log(deckCount)

    return (
        <div>
            <Card deckID={ deckID.current } deckCount={ deckCount } />
            <button onClick={ countCard }>Flip Card</button>
            <button onClick={ getNewDeck }>New Deck</button>
        </div>

        
    )
}
export default Deck