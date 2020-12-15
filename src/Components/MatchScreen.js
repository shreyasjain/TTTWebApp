import React, { useEffect, useState } from 'react'
import "../Styles/MatchScreen.scss"
import { useHistory } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios';

function MatchScreen() {

    const history = useHistory()
    const fixtureId = localStorage.getItem("fixtureId")
    const [currentData, setCurrentData] = useState("")
    const [player1, setPlayer1] = useState("")
    const [player2, setPlayer2] = useState("")
    const [setId, updateSetId] = useState("")
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    const [setNumber, updateSetNumber] = useState(1)
    const [variation, setVariation] = useState(0)
    const [score11, setScore11] = useState(0)
    const [score12, setScore12] = useState(0)
    const [score21, setScore21] = useState(0)
    const [score22, setScore22] = useState(0)
    const [score31, setScore31] = useState(0)
    const [score32, setScore32] = useState(0)
    const [setWinner, updateSetWinner] = useState("")
    const [matchWinner, updateMatchWinner] = useState("")
    const [player1Id, setPlayer1Id] = useState("")
    const [player2Id, setPlayer2Id] = useState("")
    var p1id
    var p2id

    if (!localStorage.getItem("token")) {
        history.push("/")
    }

    


    useEffect(() => {

        

        Axios.get(`http://139.59.16.180:8269/fixture/details/${fixtureId}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                console.log(res.data)
                setCurrentData(res.data)

                if (res.data.player1 != "-1") {
                    Axios.get(`http://139.59.16.180:8269/player/details/${res.data.player1}`,
                        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
                        .then(res => {
                            setPlayer1(res.data.data.name)
                            setPlayer1Id(res.data.data.id)
                            console.log(res.data.data.id)
                            // player1Name = res.data.data.name
                            p1id=res.data.data.id

                        })
                        .catch(err => { console.log(err.message) })
                }
                else { setPlayer1("X") }

                if (res.data.player2 != "-1") {
                    Axios.get(`http://139.59.16.180:8269/player/details/${res.data.player2}`,
                        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
                        .then(res => {
                            setPlayer2(res.data.data.name)
                            setPlayer2Id(res.data.data.id)
                            console.log(res.data.data.id)
                            // player2Name = res.data.data.name
                            p2id=res.data.data.id
                        })
                        .catch(err => { console.log(err.message) })
                }
                else { setPlayer2("X") }


            })
            .catch(err => console.log(err.message))

            setVariation(variation + 1)

    }, [])

    useEffect(() => {
        Axios.get(`http://139.59.16.180:8269/scoreboard/all/${fixtureId}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                console.log(res.data)
                console.log(res.data[res.data.length - 1].id)
                updateSetId(res.data[res.data.length - 1].id)
                updateSetNumber(res.data[res.data.length - 1].setNo)
                if (res.data[res.data.length - 1].status == "live") {

                    setPlayer1Score(res.data[res.data.length - 1].player1Score)
                    setPlayer2Score(res.data[res.data.length - 1].player2Score)

                    document.getElementById("match_screen_set_card").style.display = "none"
                    const objects = document.getElementsByClassName("scores-updater")
                    for (var i = 0; i < objects.length; i++) {
                        objects[i].style.display = "block";
                    }

                }
                else {

                    let playerSN
                    // if (res.data[res.data.length - 1].winnerId == player1Id) {
                    //     playerSN = 1
                    // }
                    // else {
                    //     playerSN = 2
                    // }
                    // console.log(`${setNumber}${playerSN}`)
                    // document.getElementById(`trophy${setNumber}${playerSN}`).style.display = "block"

                    let x=0
                    res.data.map(data=>{
                        x+=1
                        console.log(res.data[x-1].winnerId)
                        
                        // console.log(player1Id)
                        // console.log(player2Id)
                        
                        if (res.data[x-1].winnerId == player1Id) {
                            playerSN = 1
                        }
                        else if (res.data[x-1].winnerId == player2Id) {
                            playerSN = 2
                        }
                        console.log(`${x}${playerSN}`)
                        document.getElementById(`trophy${x}${playerSN}`).style.display = "block"
    
                    })

                    Axios.get(`http://139.59.16.180:8269/player/details/${res.data[res.data.length - 1].winnerId}`,
                        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
                        .then(res => {
                            console.log(res.data.data.name + "won set")
                            updateSetWinner(res.data.data.name)
                        })
                        .catch(err => console.log(err))


                    Axios.get(`http://139.59.16.180:8269/fixture/details/${fixtureId}`,
                        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
                        .then(res => {

                            if (res.data.matchStatus == "completed") {

                                Axios.get(`http://139.59.16.180:8269/player/details/${res.data.winner}`,
                                    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
                                    .then(res => {
                                        console.log(res.data.data.name + "won match")
                                        updateMatchWinner(res.data.data.name)
                                    })
                                    .catch(err => console.log(err))

                            }
                        })

                        .catch(err => {
                            console.log(err.message)
                        })

                    document.getElementById("match_screen_set_card").style.display = "block"
                    const objects = document.getElementsByClassName("scores-updater")
                    for (var i = 0; i < objects.length; i++) {
                        objects[i].style.display = "none";
                    }
                    updateSetNumber(setNumber + 1)

                }


                if (res.data[0].player1Score > 0 || res.data[0].player2Score > 0) {
                    setScore11(res.data[0].player1Score)
                    setScore12(res.data[0].player2Score)
                }
                if (res.data[1].player1Score > 0 || res.data[1].player2Score > 0) {
                    setScore21(res.data[1].player1Score)
                    setScore22(res.data[1].player2Score)
                }
                if (res.data[2].player1Score > 0 || res.data[2].player2Score > 0) {
                    setScore31(res.data[2].player1Score)
                    setScore32(res.data[2].player2Score)
                }
            })
            .catch(err => {
                console.log(err.message)
                if (err.message == "Request failed with status code 404") {
                    console.log("welcome")
                }

            })

    }, [variation,player1Id])

    const giveByeCalled = (e, player) => {

        console.log(player)


        Axios.get(`http://139.59.16.180:8269/scoreboard/giveBye/${currentData.id}/${player}`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                console.log(res.data)
                Axios.get(`http://139.59.16.180:8269/player/details/${res.data.winner}`,
                    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
                    .then(res => {
                        console.log(res.data.data.name + "won match")
                        updateMatchWinner(res.data.data.name)
                    })
                    .catch(err => console.log(err))

            })
            .catch(err => console.log(err.message))

        document.getElementById("match_screen_set_card").style.display = "block"
        const objects = document.getElementsByClassName("scores-updater")
        for (var i = 0; i < objects.length; i++) {
            objects[i].style.display = "none";
        }

    }

    const startSet = (e) => {

        setPlayer1Score(0)
        setPlayer2Score(0)

        document.getElementById("match_screen_set_card").style.display = "none"
        const objects = document.getElementsByClassName("scores-updater")
        for (var i = 0; i < objects.length; i++) {
            objects[i].style.display = "block";
        }

        Axios.get(`http://139.59.16.180:8269/scoreboard/startset/${currentData.id}/${setNumber}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                console.log(res.data.id)
                updateSetId(res.data.id)

            })
            .catch(err => {
                console.log(err.message)
            })

    }

    const updateScore = (e, status, player) => {
        e.preventDefault()

        Axios.get(`http://139.59.16.180:8269/scoreboard/update/${status}/${currentData.id}/${setId}/${player}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                console.log(res)
                setPlayer1Score(res.data.player1Score)
                setPlayer2Score(res.data.player2Score)
                setVariation(variation + 1)

            })
            .catch(err => {
                console.log(err.message)
            })

    }

    return (
        <div className="match-screen">
            <div className="match-screen_heading">
                <button id="back-button" onClick={e => history.push("/matches")}><ArrowBackIcon /></button>
                <strong>Scorer</strong>
                <div></div>
            </div>
            <div className="container1">
                <div className="match-screen-container match-screen-box">
                    <div className="match_screen_team1">
                        <h5>{player1}</h5>
                        <img src={require('../Media/dummy_dp.png')} />
                        {matchWinner == "" && <a className="give-bye" onClick={e => { giveByeCalled(e, currentData.player1) }}>Give Bye</a>}
                        <div className="scores-updater">
                            <button className="score1-decrease score-decrease" onClick={e => { updateScore(e, "decrease", currentData.player1) }}>-</button>
                            <p>{player1Score}</p>
                            <button className="score1-increase score-increase" onClick={e => { updateScore(e, "increase", currentData.player1) }}>+</button>
                        </div>
                    </div>
                    <div className="match_screen_team2">
                        <h5>{player2}</h5>
                        <img src={require('../Media/dummy_dp.png')} />
                        {matchWinner == "" && <a className="give-bye" onClick={e => { giveByeCalled(e, currentData.player2) }}>Give Bye</a>}
                        <div className="scores-updater">
                            <button className="score2-decrease score-decrease" onClick={e => { updateScore(e, "decrease", currentData.player2) }}>-</button>
                            <p>{player2Score}</p>
                            <button className="score2-increase score-increase" onClick={e => { updateScore(e, "increase", currentData.player2) }}>+</button>
                        </div>
                    </div>
                </div>
                <div className="container2">
                    <div className="match-screen-versus match-screen-box">
                        <span>v/s</span>
                    </div>
                    <div className="match_screen_score_comparisons">
                        <div>
                            <span className="trophy-icon" id="trophy11"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trophy-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
                            </svg></span>
                            <div className="match_screen_score_comparison1">
                                <span>{score11}</span>
                                <span>Set-1</span>
                                <span>{score12}</span>
                            </div>
                            <span className="trophy-icon" id="trophy12"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trophy-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
                            </svg></span>
                        </div>
                        <div>
                            <span className="trophy-icon" id="trophy21"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trophy-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
                            </svg></span>
                            <div className="match_screen_score_comparison2">
                                <span>{score21}</span>
                                <span>Set-2</span>
                                <span>{score22}</span>
                            </div>
                            <span className="trophy-icon" id="trophy22"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trophy-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
                            </svg></span>
                        </div>
                        <div>
                            <span className="trophy-icon" id="trophy31"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trophy-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
                            </svg></span>
                            <div className="match_screen_score_comparison3">
                                <span>{score31}</span>
                                <span>Set-3</span>
                                <span>{score32}</span>
                            </div>
                            <span className="trophy-icon" id="trophy32"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trophy-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
                            </svg></span>
                        </div>
                    </div>
                    <div id="match_screen_set_card">
                        <p>{(setNumber > 1 && matchWinner == "") ? `${setWinner} won the set` : ""}</p>
                        <p>{(matchWinner != "") ? `${matchWinner} won the match` : ""}</p>
                        {(matchWinner == "") && <button onClick={e => startSet(e)}>{`Start Set ${setNumber}`}</button>}
                        {matchWinner != "" ? <p id="party-emoji">🎉</p> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchScreen
