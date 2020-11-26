function getAwardsFromAPI(){
    let obj = [];
    fetch("https://br.ongame.net/api/challenge/items/", { method: "GET" }).then((response)=>{
        response.text().then((result)=>{
            obj = JSON.parse(result);
            console.log(obj);
        });
    });
}


getAwardsFromAPI();