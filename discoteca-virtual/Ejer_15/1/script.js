const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");


dropZone.addEventListener("dragover", e => e.preventDefault());

dropZone.addEventListener("drop", e =>{

    e.preventDefault();

    procesarArchivos(e.dataTransfer.files);

});

fileInput.addEventListener("change", e => {

    procesarArchivos(e.target.files);

});


//Vista previa

function procesarArchivos(files) {
[...files].forEach(file =>{

    if(!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = e =>{
        const img = document.createElement("img");
        img.src = e.target.result;
        img.width = 120;
        document.body.appendChild(img);

        img.dataset.nombre = file.name;
    };
    reader.readAsDataURL(file);

});
}


document.getElementById("processBtn").addEventListener("click", ()=>{

    const imgs = document.querySelectorAll("img");

    imgs.forEach(img =>{procesarImagen(img)});

})


function procesarImagen(img){
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxWidth = parseInt(document.getElementById("maxWidth").value);
    const watermark = document.getElementById("watermark").value;
    const format = document.getElementById("format").value;

    let scale = Math.min(1, maxWidth / img.naturalWidth);
    canvas.width = img.naturalWidth * scale;
    canvas.height = img.naturalHeight * scale;


    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.font = "20px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.textAlign = "right";
    ctx.fillText(watermark, canvas.width - 10, canvas.height - 10);

        generarDescarga(canvas, img.dataset.nombre, format);
}


function generarDescarga(canvas, nombreOriginal, format){

canvas.toBlob(blob =>{
    const a = document.createElement("a");
    const ext = format === "image/png" ? "png" : "jpg";

    a.href = URL.createObjectURL(blob);
    a.download = "editada-" + nombreOriginal.replace(/\.[^/.]+$/, "") + "_procesado." + ext;

    a.click();
    URL.revokeObjectURL(a.href);
}, format);


}
