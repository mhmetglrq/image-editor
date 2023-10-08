const fileUnput= document.querySelector('.file-input');
chooseImgBtn=document.querySelector('.choose-img');
previewImg=document.querySelector('.preview-img img');

const loadImg=()=>{
    let file = fileUnput.files[0];  
    if (!file) return;
    previewImg.src =URL.createObjectURL(file);
    previewImg.addEventListener("load",()=>{
        document.querySelector('.container').classList.remove('disable');
    });
}
fileUnput.addEventListener("change",loadImg);

chooseImgBtn.addEventListener("click",()=>fileUnput.click());