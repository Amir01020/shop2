let doc = document

let forma = doc.querySelector('form')
let katalog = doc.querySelector('.katalog')
let elements = doc.querySelector('.elements')
let arr = []



let puls = (img, name, mani, skid, coment) => {
    let box = doc.createElement('div')
    box.classList.add('bloc')
    let imgBox = doc.createElement('div')
    let imgs = doc.createElement('img')
    imgs.src = img
    imgBox.append(imgs)
    imgBox.classList.add('img')
    box.append(imgBox)
    let text = doc.createElement('div')
    let h1 = doc.createElement('h1')
    h1.innerHTML = name
    text.append(h1)
    let skids = doc.createElement('div')
    text.append(skids)
    let skidH1 = doc.createElement('h2')
    skids.append(skidH1)
    skidH1.innerHTML = mani
    let skidH2 = doc.createElement('h2')
    skids.append(skidH2)
    skidH2.innerHTML = mani
    let skidP = doc.createElement('p')
    skids.append(skidP)
    skidP.innerHTML = skid
    skids.classList.add('skid')
    text.classList.add('text')
    box.append(text)
    let coments = doc.createElement('p')
    coments.innerHTML = coment
    text.append(coments)
    let blocBtn = doc.createElement('button')
    blocBtn.innerHTML = 'В карзину'
    blocBtn.id = 'btn1'
    text.append(blocBtn)
    elements.append(box)
    // console.log(box);
}

let clic = ()=>{
    let btn1 = doc.querySelectorAll('#btn1')
        let modal = doc.querySelector('.modal')
        let modalBox = doc.querySelector('.box')
        btn1.forEach((i) => {
            i.onclick = (event) => {
                console.log(event);
                console.log(i);
                modalBox.style.opacity = 1
                modal.classList.add('acti')
                let time = setInterval(() => {
                    modalBox.classList.add('acsus')
                }, 200)
                setTimeout(() => {
                    clearInterval(time)
                }, 250)
            }
        });
        let close = doc.querySelector('#close')
        close.onclick = () => {
            modalBox.style.opacity = '0'
            let time = setInterval(() => {
                modal.classList.remove('acti')
                modalBox.classList.remove('acsus')
            }, 500)
            setTimeout(() => {
                clearInterval(time)
            }, 550)

        }

}

fetch('http://localhost:4000/shops')
    .then(response => response.json())
    .then(json => {
        arr = json
        let coment
        arr.forEach((i, item) => {
            i.id = item
            puls(i.img, i.name, i.mani, i.skid, i.coment)


        });

        let cllas = doc.querySelectorAll('.cllas')
        cllas.forEach((i, item) => {
            i.id = item
            i.onclick = () => {

                elements.innerHTML = ''
                for (let pusc of arr) {
                    if (i.innerHTML == pusc.cllas) {
                        puls(pusc.img, pusc.name, pusc.mani, pusc.skid, pusc.coment)
                        clic()
                    } else if (i.innerHTML == "Всё") {
                        puls(pusc.img, pusc.name, pusc.mani, pusc.skid, pusc.coment)
                        clic()
                    }
                }
            }
        });
        let inp = doc.querySelector('.inp')
        inp.oninput = function () {
            elements.innerHTML = ''
            let val = this.value
            arr.forEach(elem => {
                if (val != '') {
                    if (elem.name.search(val) != -1) {
                        puls(elem.img, elem.name, elem.mani, elem.skid, elem.coment)
                    }
                } else {
                    puls(elem.img, elem.name, elem.mani, elem.skid, elem.coment)
                }

            });
            

        }
        clic()
        


    })


