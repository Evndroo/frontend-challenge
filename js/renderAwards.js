var awards = [];
getAwardsFromAPI();



function getAwardsFromAPI() {
    fetch("https://br.ongame.net/api/challenge/items/", { method: "GET" }).then((response) => {
        response.text().then((result) => {
            awards = JSON.parse(result);
            awards.forEach((award) => {
                addAward(award);
                setTimeout(function(){
                    if(!award.redeemed){
                        document.querySelector(`#award-${award.id}-progress`).style.width = award.percentage+"%";
                    }
                },500)
            })

        });
    });
}

function addAward(award) {
    const ul = document.querySelector("ul.award-list");

    let li = document.createElement("li");
    li.id = "award-"+award.id;
    li.classList = ["award-item"];

    // Default: incomplete progress bar and disabled button
    let progressBar = `
        <div class="award-item_progress-bar" >
            <div id="award-${award.id}-progress" class="award-item_progress"></div>
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
                <div id="award-${award.id}-progress" class="award-item_progress complete-progress">
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
    const modal = document.querySelector(".modal");
    // showing modal
    document.querySelector(".modal-background").style.display = "flex";
    modal.style.animation = "open-modal 0.5s ease-in 0s 1 normal forwards";


    modal.children[1].src = award.image;
    modal.children[2].innerText = award.name;

    const buttonList = modal.children[modal.children.length-1];
    
    const positiveButton = buttonList.children[0];
    const negativeButton = buttonList.children[1];


    positiveButton.addEventListener("click", function(event){
        rescueAward(id);
    });

    negativeButton.addEventListener("click", closeModal)
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
    closeModal();
}

function closeModal(){
    document.querySelector(".modal-background").style.display = "none";

    const modal = document.querySelector(".modal");
    
    modal.style.animation = "close-modal 0.5s ease-in 0s 1 normal forwards";
}