import react, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import AutoCard from './AutoCard.js'

const baseURL = `https://deckofcardsapi.com/api/deck`

const AutoDraw = () => {
    const [deckCount, setDeckCount] = useState(0)
    const [needDeck, setNeedDeck] = useState(false)
    const [drawText, setDrawText] = useState('Start Draw')
    const [isHidden, setIsHidden] = useState(false)
    const [isPaused, setIsPaused] = useState(true)
    const [standard, setStandard] = useState(0);
    const deckID = useRef()
    const oldDeckID = useRef()
    const timerID = useRef()

    // Toggle to get new deck
    const getNewDeck = () => {
        setIsPaused(true)
        setDrawText('Start Draw')
        setIsHidden(false)

        oldDeckID.current = deckID.current
        needDeck === false ? setNeedDeck(true) : setNeedDeck(false)
    }

    // Toggle pause and adjust button text
    const handlePause = () => {
        if (isPaused) {
            setIsPaused(false) 
            setDrawText('Stop Draw')
        } else {
            setIsPaused(true)
            setDrawText('Start Draw')
        }
    } 

    // Update deck count and handle alert message
    const handleCount = () => {
        if (!isPaused && deckCount < 52) {
            setDeckCount(c => c + 1);
        } else if (deckCount == 52) {
            setDeckCount(c => c + 1)
            setIsPaused(true)
            setIsHidden(true)
            alert('Error: no cards remaining!')
        }
    }

    // Initiate timer for count to reference
    useEffect(() => {
        timerID.current = setInterval(() => {
            setStandard(n => n + 1);
        }, 1000); 
    
        return function cleanUpClearTimer() {
          clearInterval(timerID.current);
        };
    }, [timerID]);

    // Update count with each change of the reference timer
    useEffect(handleCount, [standard])

    // Get new deck on page load or button toggle
    useEffect(() => {
        const NewID = async () => {
            const newDeck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
            deckID.current = newDeck.data.deck_id
            oldDeckID.current == undefined ? setDeckCount(0) : setDeckCount(1)
        }
        NewID()
    }, [needDeck])


    return (
        <div>
            <AutoCard deckID={ deckID.current } deckCount={ deckCount } />
            {!isHidden ? <button onClick={ handlePause }>{ drawText }</button> : null}
            <button onClick={ getNewDeck }>New Deck</button>
        </div>        
    )
}
export default AutoDraw

