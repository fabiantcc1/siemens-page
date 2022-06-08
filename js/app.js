const containerModel = document.querySelectorAll('.img');
const imageLightBox = document.querySelector('.model-show');
const lightboxContainer = document.querySelector('.lightbox-container');
const lcDesc = document.querySelector('.description-card__lightbox');
const pdfBtnFicha = document.querySelector('.pdf-button-ficha');
const pdfBtnCatalogo = document.querySelector('.pdf-button-catalogo');

const closeArrow = document.querySelector('.exit-arrow');

containerModel.forEach(container =>{
    container.addEventListener('click', ()=>{
        // Obtenemos el elementos hijos img del div contenedor
        const nodes = container.childNodes;
        const nodeFigure = nodes[1].firstElementChild;
        const _src = nodeFigure.getAttribute('src');
        // Quitamos del src la ruta y su extensión
        const src = _src.substring(6, _src.length - 5);
        const desc = nodeFigure.getAttribute('alt');

        // Añadimos el modelo y la descripción al lightbox
        addModel(src, desc);
        
        // Verificamos que tipo de pdf existe para el modelo (ficha técnica o catálogo)
        const inputCatalogo = container.querySelector('.catalogo') === null ? false: true;
        const inputFichaTecnica = container.querySelector('.ficha') === null ? false: true;
        
        addPdf(src, inputFichaTecnica, inputCatalogo);
    })
});

const addModel = (src, desc) => {
    lightboxContainer.classList.toggle('move');
    imageLightBox.poster = "./img/" + src + ".webp";
    imageLightBox.src = "./assets/models/" + src + ".gltf";
    lcDesc.innerHTML = desc;
}

const addPdf = (src, fichaTecnica, catalogo) => {
    if (fichaTecnica && !catalogo) {
        pdfBtnCatalogo.classList.add('btn-remove');
        pdfBtnFicha.classList.remove('btn-remove');

        pdfBtnFicha.href = "./assets/pdf/" + src + ".pdf";
        pdfBtnFicha.download = src + ".pdf";
    }
    else if (!fichaTecnica && catalogo) {
        pdfBtnFicha.classList.add('btn-remove');
        pdfBtnCatalogo.classList.remove('btn-remove');

        pdfBtnCatalogo.href = "./assets/pdf/" + src + "_catalogo.pdf";
        pdfBtnCatalogo.download = src + "_catalogo.pdf";
    }
    else {
        pdfBtnCatalogo.classList.remove('btn-remove');
        pdfBtnFicha.classList.remove('btn-remove');

        pdfBtnFicha.href = "./assets/pdf/" + src + ".pdf";
        pdfBtnFicha.download = src + ".pdf";
        pdfBtnCatalogo.href = "./assets/pdf/" + src + "_catalogo.pdf";
        pdfBtnCatalogo.download = src + "_catalogo.pdf";
    }
}

closeArrow.addEventListener('click', () => {
    lightboxContainer.classList.toggle('move');
});