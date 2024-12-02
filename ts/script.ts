abstract class Figure {
    protected _xCenter: number;
    protected _yCenter: number;

    constructor() {
        const container: HTMLDivElement = document.querySelector(".main");
        this._xCenter = container?.offsetWidth / 2 || 0;
        this._yCenter = container?.offsetHeight / 2 || 0;
    }

    public abstract DrawBlack(): void;
    public abstract HideDrawingBackGround(): void;

    public MoveRight(steps: number = 10, delay: number = 100): void {
        const container = document.querySelector(".main") as HTMLDivElement;
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
    }


    //============================
    public get xCenter(): number {
        return this._xCenter;
    }

    public get yCenter(): number {
        return this._yCenter;
    }

    public set xCenter(value: number) {
        this._xCenter = value;
    }

    public set yCenter(value: number) {
        this._yCenter = value;
    }
}

class Circle extends Figure {
    private _radius: number;

    constructor(radius: number) {
        super();
        this._radius = radius;
    }

    public override DrawBlack(): void {
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

    public override HideDrawingBackGround(): void {
        const svg = document.querySelector('svg') || this.createSVG();
        const circles = svg.querySelectorAll('circle');
        circles.forEach(circle => svg.removeChild(circle));
    }

    private createSVG(): SVGElement {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        document.querySelector(".main")?.appendChild(svg);
        return svg;
    }

    public get radius(): number {
        return this._radius;
    }
}

class Square extends Figure {
    private _sideLength: number;

    constructor(sideLength: number) {
        super();
        this._sideLength = sideLength;
    }

    public override DrawBlack(): void {
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

    public override HideDrawingBackGround(): void {
        const svg = document.querySelector('svg') || this.createSVG();
        const squares = svg.querySelectorAll('rect');
        squares.forEach(rect => svg.removeChild(rect));
    }

    private createSVG(): SVGElement {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        document.querySelector(".main")?.appendChild(svg);
        return svg;
    }

    public get sideLength(): number {
        return this._sideLength;
    }
}

class Rhomb extends Figure {
    private _horDiagLen: number;
    private _vertDiagLen: number;

    constructor(horDiagLen: number, vertDiagLen: number) {
        super();
        this._horDiagLen = horDiagLen;
        this._vertDiagLen = vertDiagLen;
    }

    public override DrawBlack(): void {
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

    public override HideDrawingBackGround(): void {
        const svg = document.querySelector('svg') || this.createSVG();
        const polygons = svg.querySelectorAll('polygon');
        polygons.forEach(polygon => svg.removeChild(polygon));
    }

    private createSVG(): SVGElement {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        document.querySelector(".main")?.appendChild(svg);
        return svg;
    }

    public get horDiagLen(): number {
        return this._horDiagLen;
    }
    public get vertDiagLen(): number {
        return this._vertDiagLen;
    }
}

// Обробка подій для кнопок малювання
const drawCircleBtn = document.querySelector(".header__circle-draw");
const drawSquareBtn = document.querySelector(".header__square-draw");
const drawRhombBtn = document.querySelector(".header__rhomb-draw");

drawCircleBtn.addEventListener("click", event => {
    const input = document.querySelector(".header__circle-input") as HTMLInputElement;
    const value: number = Number(input.value);

    const circle = new Circle(value);
    circle.HideDrawingBackGround();
    circle.DrawBlack();

    const checkbox = document.querySelector(".header__circle-check") as HTMLInputElement;
    if (checkbox.checked) {
        circle.MoveRight();
    }
});

drawSquareBtn.addEventListener("click", event => {
    const input = document.querySelector(".header__square-input") as HTMLInputElement;
    const value: number = Number(input.value);

    const square = new Square(value);
    square.HideDrawingBackGround();
    square.DrawBlack();

    const checkbox = document.querySelector(".header__square-check") as HTMLInputElement;
    if (checkbox.checked) {
        square.MoveRight();
    }
});

drawRhombBtn.addEventListener("click", event => {
    const inputHor = document.querySelector(".header__rhomb-input") as HTMLInputElement;
    const arrOfDiag = inputHor.value.trim().split(",");
    const horDiagLen: number = Number(arrOfDiag[0]);
    const vertDiagLen: number = Number(arrOfDiag[1]);

    const rhomb = new Rhomb(horDiagLen, vertDiagLen);
    rhomb.HideDrawingBackGround();
    rhomb.DrawBlack();

    const checkbox = document.querySelector(".header__rhomb-check") as HTMLInputElement;
    if (checkbox.checked) {
        rhomb.MoveRight();
    }
});