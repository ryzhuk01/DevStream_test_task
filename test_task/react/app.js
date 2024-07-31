const DATA_URL = "http://188.166.203.164/static/test.json";

const { useState, useEffect, useRef } = React;

function App() {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [data, setData] = useState({});
    const canvasRefs = useRef([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(DATA_URL);
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const acceptTerms = () => {
        setTermsAccepted(true);
    };

    const saveImage = (canvas) => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL();
        link.click();
    };

    useEffect(() => {
        if (termsAccepted) {
            data.images.forEach((image, index) => {
                const canvas = canvasRefs.current[index];
                if (canvas) {
                    const context = canvas.getContext("2d");
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = `http://188.166.203.164${image.image_url}`;
                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        context.drawImage(img, 0, 0);
                    };
                }
            });
        }
    }, [termsAccepted, data.images]);

    return (
        <div>
            <div className="terms" style={{ display: termsAccepted ? "none" : "block" }}>
                <h2>Terms of Use</h2>
                <div id="termsContent">
                    {data.terms_of_use?.paragraphs?.map((term, index) => (
                        <section key={index}>
                            <h3>{term.title}</h3>
                            <p>{term.content}</p>
                        </section>
                    ))}
                </div>
                <button onClick={acceptTerms}>Accept</button>
            </div>

            <div className="gallery" style={{ display: termsAccepted ? "block" : "none" }}>
                <h2>Image Gallery</h2>
                <div id="galleryContent">
                    {data.images?.map((image, index) => (
                        <div className="canvas-container" key={index}>
                            <canvas ref={(el) => (canvasRefs.current[index] = el)} />
                            <button className="save-btn" onClick={() => saveImage(canvasRefs.current[index])}>
                                Save Image
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));