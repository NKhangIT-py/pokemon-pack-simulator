const API =
"https://api.pokemontcg.io/v2/cards?pageSize=250";

let allCards = [];

let packCount = 50;

let collection = [];

async function loadCards(){

    const res = await fetch(API);

    const data = await res.json();

    allCards = data.data;

    console.log(allCards);
}

function updateUI(){

    document.getElementById(
        "packCount"
    ).innerText = packCount;

    document.getElementById(
        "collectionCount"
    ).innerText = collection.length;
}

function rarityClass(rarity){

    if(!rarity)
        return "common";

    rarity = rarity.toLowerCase();

    if(rarity.includes("secret"))
        return "secret";

    if(
        rarity.includes("ultra") ||
        rarity.includes("hyper") ||
        rarity.includes("special")
    )
        return "ultra";

    if(rarity.includes("rare"))
        return "rare";

    if(rarity.includes("uncommon"))
        return "uncommon";

    return "common";
}

function randomCard(){

    return allCards[
        Math.floor(
            Math.random()*allCards.length
        )
    ];
}

function createCard(cardData){

    const rarity = rarityClass(
        cardData.rarity
    );

    const card =
    document.createElement("div");

    card.className =
    `card ${rarity}`;

    card.innerHTML = `

        <img src="${cardData.images.large}">

        <div class="info">
            <h3>${cardData.name}</h3>
            <p>${cardData.rarity || "Common"}</p>
        </div>
    `;

    return {
        element: card,
        rarity
    };
}

async function openPack(){

    if(allCards.length===0)
        return;

    if(packCount<=0){

        alert("Hết pack!");

        return;
    }

    packCount--;

    updateUI();

    const cardsArea =
    document.getElementById(
        "cardsArea"
    );

    const pullText =
    document.getElementById(
        "pullText"
    );

    cardsArea.innerHTML = "";

    let bestPull = "common";

    for(let i=0;i<10;i++){

        const cardData = randomCard();

        const cardObj =
        createCard(cardData);

        cardsArea.appendChild(
            cardObj.element
        );

        collection.push(cardData);

        if(cardObj.rarity === "secret")
            bestPull = "secret";

        else if(
            cardObj.rarity === "ultra" &&
            bestPull !== "secret"
        )
            bestPull = "ultra";

        else if(
            cardObj.rarity === "rare" &&
            bestPull === "common"
        )
            bestPull = "rare";
    }

    updateUI();

    if(bestPull === "secret")
        pullText.innerText =
        "🔥 SECRET RARE 🔥";

    else if(bestPull === "ultra")
        pullText.innerText =
        "✨ ULTRA RARE ✨";

    else if(bestPull === "rare")
        pullText.innerText =
        "⭐ RARE PULL ⭐";

    else
        pullText.innerText =
        "Normal Pack";
}

loadCards();

updateUI();

document
.getElementById("openBtn")
.addEventListener(
    "click",
    openPack
);
