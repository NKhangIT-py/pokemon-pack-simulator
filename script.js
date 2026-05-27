const cards = {

    common: [
        "assets/cards/common/1.jpg",
        "assets/cards/common/2.jpg",
        "assets/cards/common/3.jpg"
    ],

    uncommon: [
        "assets/cards/uncommon/1.jpg",
        "assets/cards/uncommon/2.jpg"
    ],

    rare: [
        "assets/cards/rare/1.jpg",
        "assets/cards/rare/2.jpg"
    ],

    ultra: [
        "assets/cards/ultra/1.jpg",
        "assets/cards/ultra/2.jpg"
    ],

    secret: [
        "assets/cards/secret/1.jpg"
    ]
};

let packCount = 50;

let collection =
JSON.parse(
    localStorage.getItem("collection")
) || [];

updateUI();

function updateUI(){

    document.getElementById(
        "packCount"
    ).innerText = packCount;

    document.getElementById(
        "collectionCount"
    ).innerText = collection.length;
}

function randomCard(arr){

    return arr[
        Math.floor(
            Math.random()*arr.length
        )
    ];
}

function getRarity(){

    const roll = Math.random()*100;

    if(roll < 65) return "common";

    if(roll < 85) return "uncommon";

    if(roll < 95) return "rare";

    if(roll < 99) return "ultra";

    return "secret";
}

function createCard(img,rarity){

    const card =
    document.createElement("div");

    card.className =
    `card ${rarity}`;

    card.style.backgroundImage =
    `url(${img})`;

    const label =
    document.createElement("div");

    label.className = "rarity";

    label.innerText =
    rarity.toUpperCase();

    card.appendChild(label);

    return card;
}

function openPack(){

    if(packCount <= 0){

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

        let rarity;

        if(i===9){

            const finalRoll =
            Math.random()*100;

            if(finalRoll < 60)
                rarity = "rare";

            else if(finalRoll < 95)
                rarity = "ultra";

            else
                rarity = "secret";

        }else{

            rarity = getRarity();
        }

        const img =
        randomCard(cards[rarity]);

        const card =
        createCard(img,rarity);

        cardsArea.appendChild(card);

        collection.push({
            rarity,
            img
        });

        if(rarity==="secret"){

            bestPull="secret";
        }

        else if(
            rarity==="ultra"
            &&
            bestPull!=="secret"
        ){

            bestPull="ultra";
        }

        else if(
            rarity==="rare"
            &&
            bestPull==="common"
        ){

            bestPull="rare";
        }
    }

    localStorage.setItem(
        "collection",
        JSON.stringify(collection)
    );

    updateUI();

    if(bestPull==="secret"){

        pullText.innerText =
        "🔥 SECRET RARE 🔥";
    }

    else if(bestPull==="ultra"){

        pullText.innerText =
        "✨ ULTRA RARE ✨";
    }

    else if(bestPull==="rare"){

        pullText.innerText =
        "⭐ RARE PULL ⭐";
    }

    else{

        pullText.innerText =
        "Normal Pack";
    }
}

document
.getElementById("openBtn")
.addEventListener(
    "click",
    openPack
);
