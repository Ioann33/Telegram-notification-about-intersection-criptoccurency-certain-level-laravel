let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade/btcusdt@trade/bnbusdt@trade');
// let storeMessage = new Object();
function getNotes(){

}
let storeMessage = {
    1: {
        name: 'ETHUSDT',
        prise: '1200',
        dir: 'above',
        message: `ETHUSDT rich 1200 time is come to bay`,
    },
    2: {
        name: 'BTCUSDT',
        prise: '20300',
        dir: 'above',
        message: `BTCUSDT rich 21500time is come to bay`,
    },
    3: {
        name: 'ETHUSDT',
        prise: '1200',
        dir: 'above',
        message: `ETHUSDT rich 1200 time is come to bay`,
    },

    4: {
        name: 'BNBUSDT',
        prise: '300',
        dir: 'below',
        message: `BNBUSDT rich 300 time is come to bay`,
    },
    5: {
        name: 'BNBUSDT',
        prise: '250',
        dir: 'above',
        message: `BNBUSDT rich 300 time is come to bay`,
    },

}

let eth = document.getElementById('eth');
let btc = document.getElementById('btc');
let bnb = document.getElementById('bnb');
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
        <li class="item">Cripto: ${obj[key].name}, Prise: ${obj[key].prise}, Direction: ${obj[key].dir}, Description: ${obj[key].message}</li>
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

    lastPrice = prise;
}
showList(storeMessage);
function checkPrise(obj){
    let btcStr = btc.innerText;
    let ethStr = eth.innerText;
    let bnbStr = bnb.innerText;
    let btcArray = btcStr.split(' ');
    let ethArray = ethStr.split(' ');
    let bnbArray = bnbStr.split(' ');

    let resArray = [
        btcArray,
        ethArray,
        bnbArray,
    ];

    for (let key in obj){
        for (let item of resArray){
            if (obj[key].name === item[0]){
                if (obj[key].dir === 'below'){
                    if (obj[key].prise >= item[1]){
                        // alert( `${obj[key].name} level ${obj[key].prise} is intersect below`);
                        let res = sendMessage(`${obj[key].name} level ${obj[key].prise} is intersect below\n My notification ${obj[key].message}`);
                        return delete obj[key];
                    }
                }else {
                    if (obj[key].prise <= item[1]){
                        let res = sendMessage(`${obj[key].name} level ${obj[key].prise} is intersect above\n My notification ${obj[key].message}`);
                        // alert( `${obj[key].name} level ${obj[key].prise} is intersect above`);
                        return delete obj[key];
                    }
                }

            }
        }


        showList(storeMessage);
    }
}
setInterval(function () {
    checkPrise(storeMessage)
}, 5000)



addForm.onsubmit = function (e) {
    let cripto = this.name.value;
    let prise = this.prise.value;
    let dir = this.dir.value;
    let description = this.message.value;
    let quantity = Object.keys(storeMessage).length;
    quantity++;
    storeMessage[quantity] = {
        name: cripto,
        prise: prise,
        dir: dir,
        message: description,
    };
    console.log(storeMessage);
    this.reset();
    showList(storeMessage)
e.preventDefault()
}








