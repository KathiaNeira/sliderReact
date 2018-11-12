import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as Swipeable from "react-swipeable";
import { Wrapper, Dots, Buttons } from './styled'
import { Slider } from "../../components/Slider";

interface Props {
    children?:any;
    dots: boolean;
    prevAndNext: boolean;
    infinite: boolean
}

export class ContainerSlider extends React.Component<Props, {}> {
    newDeltaX = null;
    position: any;
    widthSlider= 0;
    totalSlide: any;
    slider = null;

    constructor(props) {
        super(props);
    }

    swiping = (e, deltaX, absX) => {
        this.slider.style.transition = 'none';
        if (this.newDeltaX !== null) {
            console.log('ya se movió', this.newDeltaX + deltaX);
            this.slider.style.transform = `translateX(-${this.newDeltaX+deltaX}px)`;
        } else {
            console.log('es el primer movimiento', e);
            if (this.swipingLeft(e, absX, deltaX)) {
                let value = -deltaX
                this.slider.style.transform = `translateX(${value}px)`;
            } else if (this.swipingRight(e, absX, deltaX)) {
                this.slider.style.transform = `translateX(${deltaX}px)`;
            }
        }
    }
        
    swipingLeft = (e, absX, deltaX) => {
        //console.log("IZQUIERDA  ...", e, absX, deltaX);
        return this.position = "left"
    };

    swipingRight = (e, absX, deltaX) => {
        //console.log("DERECHAAA  ...", e, absX, deltaX);
        return this.position = 'right';
    };

    swiped = (e, deltaX, deltaY, isFlick, velocity) => {
        console.log('totalSlide', this.totalSlide);
        this.VerifyNextOrPrev();
        this.isSelectedDot();
        let width = (this.slider.offsetWidth)*this.widthSlider;
        let medida = width - deltaX;
        this.newDeltaX = deltaX+medida;

        if (this.props.infinite) {
            this.slideInfinite();
        } else {
            this.slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            this.slider.style.transition = 'all ease .5s';
        }
    }
    
    slideInfinite = () => {
        if (this.widthSlider === this.totalSlide-1) {
            //ifinito para delante
            this.addInfiniteEffect(0);
            this.slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            this.slider.style.transition = 'all ease .5s';
        } else if (this.widthSlider === -1) {
            //infinito para atrás
            this.newDeltaX = this.newDeltaX*(-1);
            this.slider.style.transform = `translateX(${this.newDeltaX}px)`;
        } else {
            //normal
            this.slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            this.slider.style.transition = 'all ease .5s';
        }
        //agregando slide antes del inicio
        this.infinitePrev();
        //agregando slide después del final
        this.infiniteNext();
    }
    
    infinitePrev = () => {
        if (this.widthSlider === this.totalSlide ) {
            setTimeout(() => {
                this.slider.removeAttribute('style');
                this.widthSlider = 0;
                this.newDeltaX= null;
                let element:any = this.slider.childNodes[4];
                this.slider.removeChild(element);
            }, 500);
        }
    }
    
    infiniteNext = () => {
        if (this.widthSlider === -1) {
            setTimeout(() => {
                this.slider.removeAttribute('style');
                this.widthSlider = this.totalSlide -1;
                this.newDeltaX = (this.slider.offsetWidth)*this.widthSlider;
                this.slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            })
        }
    }

    addInfiniteEffect = (numberItem) => {
        let element:any = this.slider.childNodes[numberItem];
        let otro =  document.createElement("section");
        otro.appendChild(element)

        
        let children = element.childNodes[0];
        console.log('children', children)
        let className = element.getAttribute('class');
        console.log('=============>', element.getAttribute('class'));
        let string = element.innerHTML;
        console.log('innerHTML', element.innerHTML);


        otro.className = className;


        let foo = this.slider.childNodes[this.totalSlide - 1];

        var parentDiv = element.parentNode;
        this.slider.appendChild(otro);


        //falta ducplicar el elemento;
        console.log('element', element)
        //this.slider.appendChild(element);
    }

    isSelectedDot = () => {
        if (this.props.dots) {
            let dooot:any = ReactDOM.findDOMNode(this.refs.dots).childNodes[this.widthSlider];
        }
        //dooot.style.background = 'red';
        //console.log('DOTS..', ReactDOM.findDOMNode(this.refs.dots).childNodes[this.widthSlider].style.brackground = 'red');
    }

    VerifyNextOrPrev = () => {
        if (this.position === 'left') {
            this.widthSlider+=1;
        } else {
            this.widthSlider-=1;
        }
    }

    onClick=(e)=> {
        this.widthSlider = parseInt(e.target.getAttribute('data-key'));
        this.newDeltaX = (this.slider.offsetWidth)*this.widthSlider;
        this.slider.style.transform = `translateX(-${this.newDeltaX}px)`;
        this.slider.style.transition = 'all ease .5s';       
    }

    prevSlide = () => {
        console.log('ir al anterior', this.widthSlider);
        
        if (this.props.infinite) {
            this.widthSlider-=1;
            this.slideInfinite();
            this.newDeltaX = (this.slider.offsetWidth)*this.widthSlider;
            this.slider.style.transform = `translateX(-${this.newDeltaX}px)`;
        } else {
            this.widthSlider-=1;
            //validando para que no se siga deslizando
            if (this.widthSlider !== -1) {
                this.newDeltaX = (this.slider.offsetWidth)*this.widthSlider;
                this.slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            } else {
                this.widthSlider= 0;
            }
        }
        this.slider.style.transition = 'all ease .5s';
    }

    nextSlide = () => {
        console.log('ir al siguiente', this.widthSlider);

        if (this.props.infinite) {
            this.widthSlider+=1;
            this.slideInfinite();
            this.newDeltaX = (this.slider.offsetWidth)*this.widthSlider;
            this.slider.style.transform = `translateX(-${this.newDeltaX}px)`;
        } else {
            this.widthSlider+=1;
            //validando para que no se siga deslizando
            if (this.totalSlide !== this.widthSlider) {
                this.newDeltaX = (this.slider.offsetWidth)*this.widthSlider;
            this.slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            } else {
                this.widthSlider= this.totalSlide-1;
            }
        }
        this.slider.style.transition = 'all ease .5s';
    }

    componentDidMount() {
        this.slider = ReactDOM.findDOMNode(this.refs.slider).childNodes[0];
        this.totalSlide = this.slider.childNodes.length;
        window.addEventListener("resize", this.resetSlide);
    }
    
    resetSlide = () => {
        let width = (this.slider.offsetWidth)*this.widthSlider;
        this.slider.style.transform = `translateX(-${width}px)`;
    }

    render(): JSX.Element {
        return (
            <Swipeable
                onSwiping={this.swiping}
                onSwipingLeft={this.swipingLeft}
                onSwipingRight = {this.swipingRight}
                onSwiped={this.swiped}
            >
                <Wrapper ref="slider" >
                    {this.props.children}
                </Wrapper>
                    

                {this.props.dots &&
                    <Dots ref="dots">
                        <span onClick={this.onClick} data-key="0"></span>
                        <span onClick={this.onClick} data-key="1"></span>
                        <span onClick={this.onClick} data-key="2"></span>
                        <span onClick={this.onClick} data-key="3"></span>
                    </Dots>
                }

                {this.props.prevAndNext &&
                    <Buttons>
                        <button onClick={this.prevSlide}>Prev</button>
                        <button onClick={this.nextSlide}>Next</button>
                    </Buttons>
                }
            </Swipeable>
        );
    }
}
