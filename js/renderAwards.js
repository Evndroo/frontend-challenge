var awards = [];
getAwardsFromAPI();

function getAwardsFromAPI() {
    fetch("https://br.ongame.net/api/challenge/items/", { method: "GET" }).then((response) => {
        response.text().then((result) => {
            awards = JSON.parse(result);
            awards.forEach((award) => {
                addAward(award);
            })
        });
    });
}

function addAward(award) {
    const ul = document.querySelector("ul.award-list");

    let li = document.createElement("li");
    li.classList = ["award-item"];

    // Default: incomplete progress bar and disabled button
    let progressBar = `
        <div class="award-item_progress-bar" >
            <div class="award-item_progress" style="width: ${award.percentage}%;"></div>
        </div>
    `;

    let button = `
        <button class="award-item-button" disabled > Resgatar </button>
    `;

    if (award.redeemed) {
        // No progress Bar and rescued award text
        progressBar = "";
        button = `
            <p>
                <img class="checked-icon" src="./assets/check.png" alt="checked icon">
                Item resgatado
            </p>
        `;
    }
    else if (award.percentage === 100) {
        // Complete progress bar and enable button
        progressBar = `
            <div class="award-item_progress-bar">
                <div class="award-item_progress complete-progress">
            </div>
        `;

        button = `
            <button class="award-item-button" onclick="openModal(${award.id})"> Resgatar </button>
        `;
    }

    li.innerHTML = `
        <img class="award-item_logo" src="${award.image}" alt="logo award">
        <div class="award-item_content">
            <div class="award-item_name">
                <p>${award.name}</p>
                ${button}
            </div>
            ${progressBar}
        </div>
    `;

    ul.append(li);

}

function openModal(id) {
    const award = awards.find((award) => award.id === id);
    const sure = confirm("Deseja mesmo resgatar esta premiação?");
    if (sure) {
        rescueAward(id)
    }
}

function rescueAward(id) {
    const reqBody = { "item_id": id };

    fetch('https://api.github.com/gists', {
        method: 'post',
        body: JSON.stringify(reqBody)
    }).then(function (response) {
        response.text().then(result=>{
            // Do somethig with the result of of the API here
        });
    })
}