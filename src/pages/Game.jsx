import "./Game.scss"
import { weather } from "../scripts/weather";
import places from "../jsons/places"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Paragraph } from "../components/Paragraph";

let navigate;


export function Game() {
    
    const handleSubmit = (e) => {
        e.preventDefault(); // Stop page refresh  
    };
    
    navigate = useNavigate();

    useEffect(() => {
        purge();
        setValues();

    }, []);

    return (
        <form className="game" onSubmit={handleSubmit}>
            <GameInput />
            <GamePanel />
        </form>
    );
}

function GameInput() {

    const [inputWidth, setInputWidth] = useState("100px");

    function _width() {

        // This is the worst part of the code BTW
        let $field = document.getElementById("field");
        let $fakeField = document.getElementById("fakeField");

        setTimeout(() => {
            if ($field.value.length === 0) {
                $fakeField.innerHTML = "0";
            } else {
                $fakeField.innerHTML = $field.value;
            }
        }, 0);
        setTimeout(() => {
            setInputWidth($fakeField.clientWidth);
        }, 0);
    }

    useEffect(() => {

        _width();

        // StackOverflow :3
        let $field = document.getElementById("field");
        let $fakeField = document.getElementById("fakeField");
        let $fieldSelect = document.getElementById("fieldSelect");

        if (window.innerWidth > 500) {
            $field.focus();
        }

        if ($field.value.length === 0) {
            $fakeField.innerHTML = "0";
            setTimeout(() => {
                _width();
            }, 0);
        }

        function keydownFuntion() {
            setTimeout(() => {
                if ($field.value.length >= 4) {
                    $field.value = $field.value.slice(0, -1);
                }
                console.log($field.value)
            }, 0);
            setTimeout(() => {
                _width();
            }, 0);
        }

        window.addEventListener("keydown", keydownFuntion);

        function clickFunction() {
            $field.focus();
        }

        $fieldSelect.addEventListener("click", clickFunction);

        function resizeFunction() {
            setTimeout(() => {
                _width();
            }, 100);
        }

        window.addEventListener('resize', resizeFunction);

        const interval = setInterval(() => {
            _width();
        }, 500)

        return () => {
            window.removeEventListener("keydown", keydownFuntion);
            $fieldSelect.removeEventListener("click", clickFunction);
            window.removeEventListener("resize", resizeFunction);
            clearInterval(interval);
        }

    }, []);

    return (
        <div className="gameInput">
            <div className="gameInput__main" id="fieldSelect">
                <input id="field" className="gameInput__field" type="number" placeholder="0" maxLength="3" size="3" style={{ width: inputWidth }}></input>
                <div className="gameInput__text">&#8202;°C</div>
                <div id="fakeField" className="gameInput__fakeField"></div>
            </div>
            <GameResult />
        </div>
    );
}

function GamePanel() {

    useEffect(() => {

        const $next = document.getElementById("next")

        $next.addEventListener("click", clickButtonFunction);

        function clickButtonFunction() {
            result();
        }

        return () => {
            $next.removeEventListener("keclickydown", clickButtonFunction);
        }
    }, []);

    return (
        <div className="gamePanel" id="gamePanel">
            <div className="gamePanel__container">
                <div className="gamePanel__score">
                    <GameInfo name="Skóre:" id="score" altId="scoreGain" />
                </div>
                <div className="gamePanel__main">
                    <img src={`./assets/illu-bird.svg`} alt="Mrak Alex" className="gamePanel__illustration" loading="lazy" fetchPriority="high" />
                    <div className="gamePanel__mainWrapper gamePanel__mainWrapper-1">
                        <GameInfo name="Místo:" id="place" classNameValue="gamePanel__cityName" />
                        <GameInfo name="Místní čas:" id="time" />
                    </div>
                    <div className="gamePanel__mainWrapper gamePanel__mainWrapper-2">
                        <GameInfo name="Postup:" id="progress" />
                    </div>
                </div>
                <button id="next" className="gamePanel__next" type="submit">
                    <img className="gamePanel__arrow" src="./assets/next.svg" loading="lazy" fetchPriority="high" />
                </button>
            </div>
        </div>
    );
}

function GameInfo({ value = "Načítání", name, id, altId, classNameValue = "" }) {
    return (
        <div className="gameInfo">
            <div className="gameInfo__name">
                {name}
            </div>
            <div className="gameInfo__wrapper">
                <div className={`gameInfo__value ${classNameValue}`} id={id}>
                    {value}
                </div>
                {Boolean(altId) ?
                    <div className="gameInfo__altValue" id={altId}></div>
                    :
                    <></>
                }
            </div>
        </div>
    );
}

function GameResult() {
    return (
        <div className="gameResult" id="gameResult"></div>
    );
}

let randomPlaceSave;
let userScore;
let userProgress;
let placeHistory = [];
const maxProgress = 10;

async function setValues() {

    const _place = randomPlace();
    randomPlaceSave = _place;
    placeHistory.push(_place);
    const _weatherFetch = await weather(_place.latitude, _place.longitude);

    let $score = document.getElementById("score");
    let $place = document.getElementById("place");
    let $time = document.getElementById("time");
    let $progress = document.getElementById("progress");

    $time.innerHTML = `${_weatherFetch.time.getHours()}:${(_weatherFetch.time.getMinutes() < 10 ? '0' : '') + _weatherFetch.time.getMinutes()}`;
    $place.innerHTML = `${_place.name} (${_place.state})`


    // If the score is empty (New game)
    if (userScore === undefined || userScore === null) {
        userScore = 0;
        $score.innerHTML = userScore;
    }

    // If undefined -> set 1, else add 1
    if (userProgress === undefined) {
        userProgress = 1;
        $progress.innerHTML = `${userProgress}/${maxProgress}`;
    } else {
        ++userProgress;
        $progress.innerHTML = `${userProgress}/${maxProgress}`;
    }
}

async function result() {

    const _place = randomPlaceSave;
    const _weatherFetch = await weather(_place.latitude, _place.longitude);

    console.log("result");

    const _difference = Math.abs(getFieldData() - _weatherFetch.temp);
    let $score = document.getElementById("score");
    let $scoreGain = document.getElementById("scoreGain");
    let $gameResult = document.getElementById("gameResult");
    let $field = document.getElementById("field");
    let $gamePanel = document.getElementById("gamePanel");

    function resultInfo() {
        $scoreGain.innerHTML = `<div class="gameInfo__altValue gameInfo__altValueAnimation">+${getPoints()}</div>`;
        $gameResult.innerHTML = `
            <div class="gameResult__box">
                <span class="gameResult__place">${_place.name}</span>
                <div class="gameResult__section">
                    <span class="gameResult__result">${_weatherFetch.temp}</span>
                    <span class="gameResult__unit">&#8202;°C</span>
                </div>
            </div>`
    }

    function getPoints() {
        // const _points = Math.round((100 - Math.sqrt(_difference * Math.sqrt(_difference * 25000))));
        const _points = Math.round(100 - _difference * 6);

        if (_points > 0) {
            return _points;
        } else {
            return 0;
        }
    }

    if (maxProgress <= userProgress) {

        resultInfo();
        $gamePanel.style.opacity = "0"
        $gamePanel.style.pointerEvents = "none"

        setTimeout(() => {
            navigate(`/result?score=${userScore}`);
            purge();
            return // Stop result()
        }, 3000);
    }

    const _userScoreGain = getPoints();

    // Add gain
    userScore += getPoints();
    $score.innerHTML = userScore;

    // Bad solution but it's somehow workin' with the animation tho

    resultInfo();

    // console.log(_place);
    // console.log("Guessed:   " + getFieldData());
    // console.log("Real temp:   " + _weatherFetch.temp);
    // console.log("Difference:   " + _difference);
    // console.log("Points:   " + getPoints());

    cleanFieldData();
    focusFieldData();
    setValues();

    // Auto focus if it is desktop
    if (window.innerWidth > 500) {
        $field.focus();
    }
}

// Get random City
function randomPlace() {
    while (true) {
        const _keys = Object.keys(places);
        const _prop = _keys[Math.floor(Math.random() * _keys.length)];
        let _location = eval(`{name: places.${_prop}}`);

        // Chack city
        function _checkHistory(_name) {
            return _name.name === _location.name;
        }

        if (!Boolean(placeHistory.find(_checkHistory))) {
            // If the selected city is good then return it
            return _location
        }
    }
}

// Get data from the input field
function getFieldData() {
    return Number(document.getElementById("field").value);
}

function cleanFieldData() {
    let $field = document.getElementById("field");
    let $fakeField = document.getElementById("fakeField");
    $field.value = "";
    $fakeField.html = $field.value;

}

function focusFieldData() {
    document.getElementById("field").value = "";
}

// Clean up old variables
function purge() {
    randomPlaceSave = null;
    userScore = null;
    userProgress = null;
    placeHistory = [];
}