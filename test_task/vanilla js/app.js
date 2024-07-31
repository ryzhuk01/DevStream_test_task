const DATA_URL = "http://188.166.203.164/static/test.json";

document.addEventListener("DOMContentLoaded", async () => {
    const termsContainer = document.querySelector(".terms");
    const galleryContainer = document.querySelector(".gallery");
    const termsContent = document.getElementById("termsContent");
    const galleryContent = document.getElementById("galleryContent");
    const acceptTermsBtn = document.getElementById("acceptTermsBtn");

    const data = await fetchJsonData(DATA_URL);
    await acceptTermsOfUse(data.terms_of_use);
    data.images.forEach((image) => renderImageToCanvas(image.image_url));

    async function fetchJsonData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            return response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function acceptTermsOfUse(termsOfUse) {
        termsContent.innerHTML = termsOfUse.paragraphs
            .map((p) => `<section><h3>${p.title}</h3><p>${p.content}</p></section>`)
            .join("");
        termsContainer.style.display = "block";

        return new Promise((resolve) => {
            acceptTermsBtn.addEventListener("click", () => {
                termsContainer.style.display = "none";
                galleryContainer.style.display = "block";
                resolve();
            });
        });
    }

    async function renderImageToCanvas(imageUrl) {
        const canvasContainer = document.createElement("div");
        canvasContainer.classList.add("canvas-container");
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `http://188.166.203.164${imageUrl}`;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
        };

        canvasContainer.appendChild(canvas);

        const saveButton = document.createElement("button");
        saveButton.classList.add("save-btn");
        saveButton.textContent = "Save Image";
        saveButton.addEventListener("click", () => saveImage(canvas));
        canvasContainer.appendChild(saveButton);

        galleryContent.appendChild(canvasContainer);
    }

    function saveImage(canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "image.png";
        link.click();
    }
});