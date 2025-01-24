document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        document.body.style.background = getRandomGradient();
    });

    function getRandomGradient() {
        const colors = [
            `rgb(${random255()}, ${random255()}, ${random255()})`,
            `rgb(${random255()}, ${random255()}, ${random255()})`
        ];
        return `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`;
    }

    function random255() {
        return Math.floor(Math.random() * 256);
    }
});
