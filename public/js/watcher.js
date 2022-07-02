let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade/btcusdt@trade/bnbusdt@trade/adausdt@trade');
let storeMessage = new Object();

async function getNotes(){
    let res = await fetch('http://telegram-note.local/api/all');
    if (res.ok){
        let data = await res.json();
        showList(data);
        storeMessage = data;

    }else {
        alert("Ошибка HTTP: " + res.status);
    }
}

async function saveNote(note){

    let res = await fetch('http://telegram-note.local/api/save',{
        method: 'POST',
        body: note,
    });

    if (res.ok){
        return getNotes();
    }else {
        alert("Ошибка HTTP: " + res.status);
    }

}
async function deleteNote(id){
    let res = await fetch(`http://telegram-note.local/api/dell/${id}`,{
        method: 'DELETE'
    });
    if (res.ok){
        return getNotes();
    }else {
        alert("Ошибка HTTP: " + res.status);
    }
}
let response =  getNotes();

let eth = document.getElementById('eth');
let btc = document.getElementById('btc');
let bnb = document.getElementById('bnb');
let ada = document.getElementById('ada');
let addForm = document.forms.addAlert;
let lastPrice = null;

async function sendMessage(message) {
 let res = await fetch('http://telegram-note.local/api/trigger', {
     method: 'POST',
     body: message,
 });
 let data = await res;
 if (data.status === 200){
     return true;
 }

}

function showList(obj){
    let list = document.querySelector('.list');
    list.innerText = '';
    for (let key in obj){
        list.insertAdjacentHTML('beforeend', `
        <li class="li"><div class="item">Cripto: ${obj[key].name}, Prise: ${obj[key].prise}, Direction: ${obj[key].dir}, Description: ${obj[key].message}</div> <button onclick="deleteNote(${obj[key].id})" class="delete-btn" name="delete-btn" type="button" class="btn btn-info"><i class="fa fa-trash"></i> Delete </button></li>
        `);
    }

}

ws.onmessage = function (event) {
    let stockObject = JSON.parse(event.data);

    let prise  = parseFloat(stockObject.p).toFixed(2);
    if (stockObject.s === 'ETHUSDT'){
        eth.innerText = stockObject.s + ' ' + prise;
        eth.style.color =!lastPrice || lastPrice === prise ? 'black' : prise > lastPrice ? 'green' : 'red';
    }

    if (stockObject.s === 'BTCUSDT'){
        btc.innerText = stockObject.s + ' ' + prise;
        btc.style.color =!lastPrice || lastPrice === prise ? 'black' : prise > lastPrice ? 'green' : 'red';

    }

    if (stockObject.s === 'BNBUSDT'){
        bnb.innerText = stockObject.s + ' ' + prise;
        bnb.style.color =!lastPrice || lastPrice === prise ? 'black' : prise > lastPrice ? 'green' : 'red';

    }

    if (stockObject.s === 'ADAUSDT'){
        ada.innerText = stockObject.s + ' ' + prise;
        ada.style.color =!lastPrice || lastPrice === prise ? 'black' : prise > lastPrice ? 'green' : 'red';

    }

    lastPrice = prise;
}

function checkPrise(obj){
    let btcStr = btc.innerText;
    let ethStr = eth.innerText;
    let bnbStr = bnb.innerText;
    let adaStr = ada.innerText;
    let btcArray = btcStr.split(' ');
    let ethArray = ethStr.split(' ');
    let bnbArray = bnbStr.split(' ');
    let adaArray = adaStr.split(' ');

    let resArray = [
        btcArray,
        ethArray,
        bnbArray,
        adaArray,
    ];

    for (let key in obj){
        for (let item of resArray){
            if (obj[key].name === item[0]){
                if (obj[key].dir === 'below'){
                    if (+obj[key].prise >= +item[1]){
                        // alert( `${obj[key].name} level ${obj[key].prise} is intersect below`);
                        let res = sendMessage(`${obj[key].name} level ${obj[key].prise} is intersect below\n My notification ${obj[key].message}`);

                        deleteNote(obj[key].id);
                    }
                }else {
                    if (+obj[key].prise <= +item[1]){
                        let res = sendMessage(`${obj[key].name} level ${obj[key].prise} is intersect above\n My notification ${obj[key].message}`);
                        // alert( `${obj[key].name} level ${obj[key].prise} is intersect above`);
                        deleteNote(obj[key].id);
                    }
                }

            }
        }



    }
}
setInterval(function () {
    checkPrise(storeMessage)
}, 5000)



addForm.onsubmit = function (e) {
    let description = this.message.value;
    let formData = new FormData(this);
    saveNote(formData);
    this.reset();
e.preventDefault()
}








