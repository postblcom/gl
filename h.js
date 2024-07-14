let slideshowImages = [];
let currentSlideIndex = 0;

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateGradients() {
    const container = document.getElementById('container');
    container.innerHTML = ''; // Clear previous gradients
    for (let i = 0; i < 10; i++) {
        const color1 = generateRandomColor();
        const color2 = generateRandomColor();
        const gradientContainer = document.createElement('div');
        gradientContainer.className = 'gradient-container';
        const gradientBox = document.createElement('div');
        gradientBox.className = 'gradient-box';
        gradientBox.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
        gradientBox.addEventListener('click', () => saveGradient(color1, color2));
        gradientBox.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            saveGradientAsImage(gradientBox);
        });
        const colorCodes = document.createElement('div');
        colorCodes.className = 'color-codes';
        colorCodes.innerText = `${color1} → ${color2}`;
        const resizeControls = createResizeControls(gradientBox);
        gradientContainer.appendChild(gradientBox);
        gradientContainer.appendChild(colorCodes);
        gradientContainer.appendChild(resizeControls);
        container.appendChild(gradientContainer);
    }
}

function saveGradient(color1, color2) {
    let savedGradients = JSON.parse(localStorage.getItem('savedGradients')) || [];
    savedGradients.push({ color1, color2, selected: false });
    localStorage.setItem('savedGradients', JSON.stringify(savedGradients));
    displaySavedGradients();
}

function displaySavedGradients() {
    const savedContainer = document.getElementById('saved-container');
    savedContainer.innerHTML = ''; // Clear previous saved gradients
    let savedGradients = JSON.parse(localStorage.getItem('savedGradients')) || [];
    savedGradients.forEach((gradient, index) => {
        const gradientContainer = document.createElement('div');
        gradientContainer.className = 'gradient-container';
        const gradientBox = document.createElement('div');
        gradientBox.className = 'gradient-box';
        gradientBox.style.background = `linear-gradient(to right, ${gradient.color1}, ${gradient.color2})`;
        if (gradient.selected) {
            gradientBox.classList.add('selected');
        }
        gradientBox.addEventListener('click', () => toggleSelectGradient(index));
        gradientBox.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            saveGradientAsImage(gradientBox);
        });
        const colorCodes = document.createElement('div');
        colorCodes.className = 'color-codes';
        colorCodes.innerText = `${gradient.color1} → ${gradient.color2}`;
        const resizeControls = createResizeControls(gradientBox);
        gradientContainer.appendChild(gradientBox);
        gradientContainer.appendChild(colorCodes);
        gradientContainer.appendChild(resizeControls);
        savedContainer.appendChild(gradientContainer);
    });
}

function toggleSelectGradient(index) {
    let savedGradients = JSON.parse(localStorage.getItem('savedGradients')) || [];
    savedGradients[index].selected = !savedGradients[index].selected;
    localStorage.setItem('savedGradients', JSON.stringify(savedGradients));
    displaySavedGradients();
}

function deleteSelectedGradients() {
    let savedGradients = JSON.parse(localStorage.getItem('savedGradients')) || [];
    savedGradients = savedGradients.filter(gradient => !gradient.selected);
    localStorage.setItem('savedGradients', JSON.stringify(savedGradients));
    displaySavedGradients();
}

function deleteAllGradients() {
    localStorage.removeItem('savedGradients');
    displaySavedGradients();
}

async function saveSelectedGradientsAsZip() {
    let savedGradients = JSON.parse(localStorage.getItem('savedGradients')) || [];
    let selectedGradients = savedGradients.filter(gradient => gradient.selected);

    if (selectedGradients.length === 0) {
        alert('選択されたグラデーションがありません。');
        return;
    }

    const zip = new JSZip();
    const savedContainer = document.getElementById('saved-container');
    
    for (let i = 0; i < selectedGradients.length; i++) {
        const gradient = selectedGradients[i];
        const gradientContainer = document.createElement('div');
        gradientContainer.className =
        gradientContainer.className = 'gradient-container';
        const gradientBox = document.createElement('div');
        gradientBox.className = 'gradient-box';
        gradientBox.style.background = `linear-gradient(to right, ${gradient.color1}, ${gradient.color2})`;
        const colorCodes = document.createElement('div');
        colorCodes.className = 'color-codes';
        colorCodes.innerText = `${gradient.color1} → ${gradient.color2}`;
        gradientContainer.appendChild(gradientBox);
        gradientContainer.appendChild(colorCodes);
        savedContainer.appendChild(gradientContainer);

        await html2canvas(gradientBox).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgBase64 = imgData.split(',')[1];
            zip.file(`gradient${i + 1}.png`, imgBase64, { base64: true });
            savedContainer.removeChild(gradientContainer); // Remove the temporary element
        });
    }

    zip.generateAsync({ type: 'blob' }).then(content => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'gradients.zip';
        link.click();
    });
}

function createResizeControls(gradientBox) {
    const resizeControls = document.createElement('div');
    resizeControls.className = 'resize-controls';
    
    const increaseButton = document.createElement('button');
    increaseButton.className = 'resize-button';
    increaseButton.innerText = '+';
    increaseButton.onclick = () => {
        const currentWidth = parseInt(gradientBox.style.width) || 100;
        const currentHeight = parseInt(gradientBox.style.height) || 100;
        gradientBox.style.width = currentWidth + 20 + 'px';
        gradientBox.style.height = currentHeight + 20 + 'px';
    };

    const decreaseButton = document.createElement('button');
    decreaseButton.className = 'resize-button';
    decreaseButton.innerText = '-';
    decreaseButton.onclick = () => {
        const currentWidth = parseInt(gradientBox.style.width) || 100;
        const currentHeight = parseInt(gradientBox.style.height) || 100;
        if (currentWidth > 40 && currentHeight > 40) { // Prevent too small size
            gradientBox.style.width = currentWidth - 20 + 'px';
            gradientBox.style.height = currentHeight - 20 + 'px';
        }
    };

    resizeControls.appendChild(increaseButton);
    resizeControls.appendChild(decreaseButton);

    return resizeControls;
}

function saveGradientAsImage(gradientBox) {
    html2canvas(gradientBox).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'gradient.png';
        link.click();
    });
}

function startSlideshow() {
    let savedGradients = JSON.parse(localStorage.getItem('savedGradients')) || [];
    slideshowImages = savedGradients.filter(gradient => gradient.selected);

    if (slideshowImages.length === 0) {
        alert('選択されたグラデーションがありません。');
        return;
    }

    const slideshowContainer = document.getElementById('slideshow-container');
    const slideshow = document.getElementById('slideshow');
    slideshowContainer.style.display = 'block';
    slideshow.innerHTML = ''; // Clear previous slideshow content

    // Start the slideshow
    currentSlideIndex = 0;
    showSlide(currentSlideIndex);
}

function showSlide(index) {
    const slideshow = document.getElementById('slideshow');
    slideshow.innerHTML = ''; // Clear previous slide

    const gradient = slideshowImages[index];
    const gradientBox = document.createElement('div');
    gradientBox.className = 'slideshow-image';
    gradientBox.style.background = `linear-gradient(to right, ${gradient.color1}, ${gradient.color2})`;
    slideshow.appendChild(gradientBox);
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex > 0) ? currentSlideIndex - 1 : slideshowImages.length - 1;
    showSlide(currentSlideIndex);
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex < slideshowImages.length - 1) ? currentSlideIndex + 1 : 0;
    showSlide(currentSlideIndex);
}

// Generate gradients initially on page load
generateGradients();
displaySavedGradients();



function generateGradientFromInput() {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    if (isValidColor(color1) && isValidColor(color2)) {
        const container = document.getElementById('container');
        createGradientElement(color1, color2, container);
    } else {
        alert('有効なカラーコードを入力してください（例：#FF5733）。');
    }
}

function isValidColor(color) {
    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    return hexRegex.test(color);
}

function createGradientElement(color1, color2, container) {
    const gradientContainer = document.createElement('div');
    gradientContainer.className = 'gradient-container';
    const gradientBox = document.createElement('div');
    gradientBox.className = 'gradient-box';
    gradientBox.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
    gradientBox.addEventListener('click', () => saveGradient(color1, color2));
    gradientBox.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        saveGradientAsImage(gradientBox);
    });
    const colorCodes = document.createElement('div');
    colorCodes.className = 'color-codes';
    colorCodes.innerText = `${color1} → ${color2}`;
    const resizeControls = createResizeControls(gradientBox);
    gradientContainer.appendChild(gradientBox);
    gradientContainer.appendChild(colorCodes);
    gradientContainer.appendChild(resizeControls);
    container.appendChild(gradientContainer);
}

function applySelectedGradientAsBackground() {
    let savedGradients = JSON.parse(localStorage.getItem('savedGradients')) || [];
    let selectedGradients = savedGradients.filter(gradient => gradient.selected);

    if (selectedGradients.length === 0) {
        alert('選択されたグラデーションがありません。');
        return;
    } else if (selectedGradients.length > 1) {
        alert('1つのグラデーションを選択してください。');
        return;
    }

    const gradient = selectedGradients[0];
    document.body.style.background = `linear-gradient(to right, ${gradient.color1}, ${gradient.color2})`;
}


let popup;

function togglePopup() {
    if (popup && document.body.contains(popup)) {
        document.body.removeChild(popup);
        popup = null;
    } else {
        showSelectedGradientAsPopup();
    }
}

function showSelectedGradientAsPopup() {
    let savedGradients = JSON.parse(localStorage.getItem('savedGradients')) || [];
    let selectedGradients = savedGradients.filter(gradient => gradient.selected);

    if (selectedGradients.length === 0) {
        alert('選択されたグラデーションがありません。');
        return;
    } else if (selectedGradients.length > 1) {
        alert('1つのグラデーションを選択してください。');
        return;
    }

    const gradient = selectedGradients[0];
    popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.width = '300px';
    popup.style.height = '300px';
    popup.style.background = `linear-gradient(to right, ${gradient.color1}, ${gradient.color2})`;
    popup.style.border = '2px solid #000';
    popup.style.borderRadius = '10px';
    popup.style.zIndex = '1000';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    popup.addEventListener('click', () => document.body.removeChild(popup));
    
    document.body.appendChild(popup);
}



function saveSelectedGradientAsImage() {
    let savedGradients = JSON.parse(localStorage.getItem('savedGradients')) || [];
    let selectedGradients = savedGradients.filter(gradient => gradient.selected);

    if (selectedGradients.length === 0) {
        alert('選択されたグラデーションがありません。');
        return;
    } else if (selectedGradients.length > 1) {
        alert('1つのグラデーションを選択してください。');
        return;
    }

    const gradient = selectedGradients[0];
    const gradientBox = document.createElement('div');
    gradientBox.style.width = '300px';
    gradientBox.style.height = '300px';
    gradientBox.style.background = `linear-gradient(to right, ${gradient.color1}, ${gradient.color2})`;
    gradientBox.style.position = 'absolute';
    gradientBox.style.left = '-9999px'; // Hide the element off-screen

    document.body.appendChild(gradientBox);

    html2canvas(gradientBox).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'gradient.png';
        link.click();
        document.body.removeChild(gradientBox);
    });
}

function resetGradients() {
    const container = document.getElementById('container');
    container.innerHTML = '';
    gradientHistory = [];
    currentHistoryIndex = -1;
    displayHistory();
}

