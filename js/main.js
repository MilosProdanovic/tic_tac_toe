let celije = document.querySelectorAll('td')
let niz = [...celije]
let dugme = document.querySelector('button')
let kombinacija = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]
let xNiz = [];
let oNiz = [];
let obavestenje = document.querySelector('#obavestenje')

dodaj()

function iks(e) {
    if (this.textContent) {
        return false
    }
    this.textContent = "X"
    noviNiz(this)
    let tajmaut = setTimeout(oks, 1000)
    if(tajmaut){
        izbrisi()
    }
    xNiz.unshift(Number(e.target.dataset.pozicija))
    pobeda(xNiz,tajmaut)
}

function oks() {
    if(!niz.length){
        return false
    }
    let broj = Math.floor(Math.random() * niz.length)
    niz[broj].textContent = "O"
    oNiz.push(Number(niz[broj].dataset.pozicija))
    noviNiz(niz[broj])
    dodaj()
    poraz(oNiz)
}

function noviNiz(celija){
    niz = niz.filter(x => x != celija)
}

function poraz(clanNizaO){
    if(clanNizaO.length > 2){
        for (let i = 0; i < kombinacija.length; i++) {
            let o = kombinacija[i].map(clan => clanNizaO.includes(clan))
            if(o[0] && o[1] && o[2]){
               izbrisi()
                obavestenje.textContent = "IZGUBIO SI"
                dugme.classList = 'prikazi'
                break
            } 
        }
    }
}

function pobeda(clanNizaX,tajmaut){
    if(clanNizaX.length > 2){
    for (let i = 0; i < kombinacija.length; i++) {
       let x = kombinacija[i].map(clan => clanNizaX.includes(clan))
            if(x[0] && x[1] && x[2]){
                izbrisi()
                clearTimeout(tajmaut)
                obavestenje.textContent = "POBEDIO SI"
                dugme.classList = 'prikazi'
                break
            }
                else if(xNiz.length === 5){
                  nereseno()
            }
        }
    }
}

function dodaj(){
    celije.forEach((polje) => {
        polje.addEventListener('click', iks)
    })
}

function izbrisi(){
    celije.forEach((polje) => {
        polje.removeEventListener('click', iks)
    })
}

function nereseno(){
    obavestenje.textContent = "NERESENO"
    dugme.classList = 'prikazi'
}


