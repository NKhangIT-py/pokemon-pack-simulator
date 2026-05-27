const API =
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
