"use strict";
class Figure {
    _xCenter;
    _yCenter;
    constructor() {
        const container = document.querySelector(".main");
        this._xCenter = container?.offsetWidth / 2 || 0;
        this._yCenter = container?.offsetHeight / 2 || 0;
    }
    MoveRight(steps = 10, delay = 100) {
        const container = document.querySelector(".main");
        const containerWidth = container.offsetWidth;
        const interval = setInterval(() => {
            this.HideDrawingBackGround();
            this._xCenter += steps;
            // Якщо фігура виходить за праву межу
            if (this._xCenter > containerWidth) {
                this._xCenter = 0;
            }
            this.DrawBlack();
        }, delay);
        return interval; //ID интервала
    }
    //============================
    get xCenter() {
        return this._xCenter;
    }
    get yCenter() {
        return this._yCenter;
    }
    set xCenter(value) {
        this._xCenter = value;
    }
    set yCenter(value) {
        this._yCenter = value;
    }
}
class Circle extends Figure {
    _radius;
    constructor(radius) {
        super();
        this._radius = radius;
    }
    DrawBlack() {
        const svg = document.querySelector('svg') || this.createSVG();
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", this.xCenter.toString());
        circle.setAttribute("cy", this.yCenter.toString());
        circle.setAttribute("r", this.radius.toString());
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", "2");
        svg.appendChild(circle);
    }
    HideDrawingBackGround() {
        const svg = document.querySelector('svg') || this.createSVG();
        const circles = svg.querySelectorAll('circle');
        circles.forEach(circle => svg.removeChild(circle));
    }
    createSVG() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        document.querySelector(".main")?.appendChild(svg);
        return svg;
    }
    get radius() {
        return this._radius;
    }
}
class Square extends Figure {
    _sideLength;
    constructor(sideLength) {
        super();
        this._sideLength = sideLength;
    }
    DrawBlack() {
        const svg = document.querySelector('svg') || this.createSVG();
        const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        const halfSide = this.sideLength / 2;
        square.setAttribute("x", (this.xCenter - halfSide).toString());
        square.setAttribute("y", (this.yCenter - halfSide).toString());
        square.setAttribute("width", this.sideLength.toString());
        square.setAttribute("height", this.sideLength.toString());
        square.setAttribute("fill", "none");
        square.setAttribute("stroke", "black");
        square.setAttribute("stroke-width", "2");
        svg.appendChild(square);
    }
    HideDrawingBackGround() {
        const svg = document.querySelector('svg') || this.createSVG();
        const squares = svg.querySelectorAll('rect');
        squares.forEach(rect => svg.removeChild(rect));
    }
    createSVG() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        document.querySelector(".main")?.appendChild(svg);
        return svg;
    }
    get sideLength() {
        return this._sideLength;
    }
}
class Rhomb extends Figure {
    _horDiagLen;
    _vertDiagLen;
    constructor(horDiagLen, vertDiagLen) {
        super();
        this._horDiagLen = horDiagLen;
        this._vertDiagLen = vertDiagLen;
    }
    DrawBlack() {
        const svg = document.querySelector('svg') || this.createSVG();
        const rhomb = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const points = `${this.xCenter},${this.yCenter - this.vertDiagLen / 2} 
                        ${this.xCenter + this.horDiagLen / 2},${this.yCenter} 
                        ${this.xCenter},${this.yCenter + this.vertDiagLen / 2} 
                        ${this.xCenter - this.horDiagLen / 2},${this.yCenter}`;
        rhomb.setAttribute("points", points);
        rhomb.setAttribute("fill", "none");
        rhomb.setAttribute("stroke", "black");
        rhomb.setAttribute("stroke-width", "2");
        svg.appendChild(rhomb);
    }
    HideDrawingBackGround() {
        const svg = document.querySelector('svg') || this.createSVG();
        const polygons = svg.querySelectorAll('polygon');
        polygons.forEach(polygon => svg.removeChild(polygon));
    }
    createSVG() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        document.querySelector(".main")?.appendChild(svg);
        return svg;
    }
    get horDiagLen() {
        return this._horDiagLen;
    }
    get vertDiagLen() {
        return this._vertDiagLen;
    }
}
// Обробка подій для кнопок малювання
// Збереження ID поза класом
let activeInterval = null;
function stopActiveInterval() {
    if (activeInterval) {
        clearInterval(activeInterval);
    }
}
const drawCircleBtn = document.querySelector(".header__circle-draw");
const drawSquareBtn = document.querySelector(".header__square-draw");
const drawRhombBtn = document.querySelector(".header__rhomb-draw");
drawCircleBtn.addEventListener("click", event => {
    const input = document.querySelector(".header__circle-input");
    const value = Number(input.value);
    stopActiveInterval();
    const circle = new Circle(value);
    circle.HideDrawingBackGround();
    circle.DrawBlack();
    const checkbox = document.querySelector(".header__circle-check");
    if (checkbox.checked) {
        activeInterval = circle.MoveRight();
    }
});
drawSquareBtn.addEventListener("click", event => {
    const input = document.querySelector(".header__square-input");
    const value = Number(input.value);
    stopActiveInterval();
    const square = new Square(value);
    square.HideDrawingBackGround();
    square.DrawBlack();
    const checkbox = document.querySelector(".header__square-check");
    if (checkbox.checked) {
        activeInterval = square.MoveRight();
    }
});
drawRhombBtn.addEventListener("click", event => {
    const inputHor = document.querySelector(".header__rhomb-input");
    const arrOfDiag = inputHor.value.trim().split(",");
    const horDiagLen = Number(arrOfDiag[0]);
    const vertDiagLen = Number(arrOfDiag[1]);
    stopActiveInterval();
    const rhomb = new Rhomb(horDiagLen, vertDiagLen);
    rhomb.HideDrawingBackGround();
    rhomb.DrawBlack();
    const checkbox = document.querySelector(".header__rhomb-check");
    if (checkbox.checked) {
        activeInterval = rhomb.MoveRight();
    }
});
//# sourceMappingURL=script.js.map