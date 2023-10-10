const fileUnput= document.querySelector('.file-input');
chooseImgBtn=document.querySelector('.choose-img');
saveImgBtn=document.querySelector('.save-img');
resetFilterBtn=document.querySelector('.reset-filter');
previewImg=document.querySelector('.preview-img img');
filterName=document.querySelector('.filter-info .name');
filterValue=document.querySelector('.filter-info .value');
filterSlider=document.querySelector('.slider input');
filterOptions=document.querySelectorAll('.filter button');
rotateOptions=document.querySelectorAll('.rotate button');


let brightness =100, saturation=100, inversion=0, grayscale=0;

let rotate=0, flipHorizontal=1, flipVertical=1;

const applyFilter=()=>{
    previewImg.style.transform= `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
    previewImg.style.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}


const loadImg=()=>{
    let file = fileUnput.files[0];  
    if (!file) return;
    previewImg.src =URL.createObjectURL(file);
    previewImg.addEventListener("load",()=>{
        document.querySelector('.container').classList.remove('disable');
        
    });
}



filterOptions.forEach(option => {
    option.addEventListener("click",()=>{
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');
        filterName.innerText=option.innerText;

        if (option.id==="brightness") {
            filterSlider.value=brightness;
            filterValue.innerText=brightness+"%";
        }
        else if (option.id ==="saturation") {
            filterSlider.value=saturation;
            filterValue.innerText=saturation+"%";
        }
        else if (option.id ==="inversion") {
            filterSlider.value=inversion;
            filterValue.innerText=inversion+"%";
        }
        else if (option.id==="grayscale") {
            filterSlider.value=grayscale;
            filterValue.innerText=grayscale+"%";
        }

    });
});




const updateFilter=()=>{
    filterValue.innerText=filterSlider.value+"%";
    const selectedFilter = document.querySelector('.filter .active');
    if (selectedFilter.id==="brightness") {
        brightness=filterSlider.value;
        previewImg.style.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    }
    else if (selectedFilter.id ==="saturation") {
        saturation=filterSlider.value;
        previewImg.style.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    }
    else if (selectedFilter.id ==="inversion") {
        inversion=filterSlider.value;
        previewImg.style.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    }
    else if (selectedFilter.id==="grayscale") {
        grayscale=filterSlider.value;
        previewImg.style.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    }
    applyFilter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click",()=>{
        if (option.id==="left") {
            rotate -=90;
        }
        else if (option.id==="right") {
            rotate +=90;
        }
        else if (option.id==="horizontal") {
            flipHorizontal= flipHorizontal ===1 ? -1 : 1;

        }
        else if (option.id==="vertical") {
            flipVertical= flipVertical ===1 ? -1 : 1;
        }

        applyFilter();
    });
});

const saveImg=()=>{
    const canvas=document.createElement('canvas');
    const ctx=canvas.getContext('2d');
    canvas.width=previewImg.naturalWidth;
    canvas.height=previewImg.naturalHeight;
    ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(flipHorizontal,flipVertical);
    if (rotate!==0) {
        ctx.rotate(rotate*Math.PI/180);
    }
    ctx.drawImage(previewImg,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
    const link =document.createElement('a');
    link.download="image.png";
    link.href=canvas.toDataURL();
    link.click();
}

function toggleRotation() {
    previewImg.classList.toggle('rotating');
}


fileUnput.addEventListener("change",loadImg);
filterSlider.addEventListener("input",updateFilter);
resetFilterBtn.addEventListener("click",()=>{

 brightness =100; saturation=100; inversion=0; grayscale=0;
 rotate=0; flipHorizontal=1; flipVertical=1;
 filterOptions[0].click();
 applyFilter();
});

saveImgBtn.addEventListener("click",saveImg);

chooseImgBtn.addEventListener("click",()=>fileUnput.click());