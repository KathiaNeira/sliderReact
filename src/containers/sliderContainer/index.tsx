import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as Swipeable from "react-swipeable";
import { Dots, Buttons } from './styled'

interface Props {
    children?:any;
    dots: boolean;
    prevAndNext: boolean;
    infinite: boolean
}

export class ContainerSlider extends React.Component<Props, {}> {
    reference?: any;
    newDeltaX = null;
    position: any;
    widthSlider= 0;
    totalSlide: any;
    constructor(props) {
        super(props);
        this.reference = React.createRef();
    }

    swiping = (e, deltaX, deltaY, absX, absY, velocity) => {
        let slider = document.getElementById('slider');
        slider.style.transition = 'none';
        if (this.newDeltaX !== null) {
            console.log('ya se movió', this.newDeltaX + deltaX);
            slider.style.transform = `translateX(-${this.newDeltaX+deltaX}px)`;
        } else {
            console.log('es el primer movimiento', e);
            if (this.swipingLeft(e, absX, deltaX)) {
                let value = -deltaX
                slider.style.transform = `translateX(${value}px)`;
            } else if (this.swipingRight(e, absX, deltaX)) {
                slider.style.transform = `translateX(${deltaX}px)`;
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
        let slider = document.getElementById('slider');
        this.VerifyNextOrPrev();
        this.isSelectedDot();
        let width = (slider.offsetWidth)*this.widthSlider;
        let medida = width - deltaX;
        this.newDeltaX = deltaX+medida;

        if (this.props.infinite) {
            this.slideInfinite();
        } else {
            slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            slider.style.transition = 'all ease .5s';
        }
    }
    
    slideInfinite = () => {
        console.log('sdsdsd', this.widthSlider);
        let slider = document.getElementById('slider');
        if (this.widthSlider === this.totalSlide-1) {
            //ifinito para delante
            this.addInfiniteEffect(0);
            slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            slider.style.transition = 'all ease .5s';
        } else if (this.widthSlider === -1) {
            //infinito para atrás
            this.newDeltaX = this.newDeltaX*(-1);
            slider.style.transform = `translateX(${this.newDeltaX}px)`;
        } else {
            //normal
            slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            slider.style.transition = 'all ease .5s';
        }
        //agregando slide antes del inicio
        this.infinitePrev();
        //agregando slide después del final
        this.infiniteNext();
    }
    
    infinitePrev = () => {
        let slider = document.getElementById('slider');
        if (this.widthSlider === this.totalSlide ) {
            setTimeout(() => {
                slider.removeAttribute('style');
                this.widthSlider = 0;
                this.newDeltaX= null;
                let element:any = slider.childNodes[4];
                slider.removeChild(element);
            }, 500);
        }
    }
    
    infiniteNext = () => {
        let slider = document.getElementById('slider');
        if (this.widthSlider === -1) {
            setTimeout(() => {
                slider.removeAttribute('style');
                this.widthSlider = this.totalSlide -1;
                this.newDeltaX = (slider.offsetWidth)*this.widthSlider;
                slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            })
        }
    }

    addInfiniteEffect = (numberItem) => {
        let slider = document.getElementById('slider');
        let element:any = slider.childNodes[numberItem];
        //falta ducplicar el elemento;
        let elementDuplicate:any = document.createElement('div');
        slider.appendChild(elementDuplicate);
    }

    isSelectedDot = () => {
        let dooot:any = ReactDOM.findDOMNode(this.refs.dots).childNodes[this.widthSlider];
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
        let slider = document.getElementById('slider');
        this.newDeltaX = (slider.offsetWidth)*this.widthSlider;
        slider.style.transform = `translateX(-${this.newDeltaX}px)`;        
    }

    prevSlide = () => {
        console.log('ir al anterior', this.widthSlider);
        
        let slider = document.getElementById('slider');
        if (this.props.infinite) {
            this.widthSlider-=1;
            this.slideInfinite();
            this.newDeltaX = (slider.offsetWidth)*this.widthSlider;
            slider.style.transform = `translateX(-${this.newDeltaX}px)`;
        } else {
            this.widthSlider-=1;
            //validando para que no se siga deslizando
            if (this.widthSlider !== -1) {
                this.newDeltaX = (slider.offsetWidth)*this.widthSlider;
                slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            } else {
                this.widthSlider= 0;
            }
        }
    }

    nextSlide = () => {
        console.log('ir al siguiente', this.widthSlider);
        let slider = document.getElementById('slider');

        if (this.props.infinite) {
            this.widthSlider+=1;
            this.slideInfinite();
            this.newDeltaX = (slider.offsetWidth)*this.widthSlider;
            slider.style.transform = `translateX(-${this.newDeltaX}px)`;
        } else {
            this.widthSlider+=1;
            //validando para que no se siga deslizando
            if (this.totalSlide !== this.widthSlider) {
                this.newDeltaX = (slider.offsetWidth)*this.widthSlider;
                slider.style.transform = `translateX(-${this.newDeltaX}px)`;
            } else {
                this.widthSlider= this.totalSlide-1;
            }
        }
    }

    componentDidMount() {
        this.totalSlide = document.getElementById('slider').childNodes.length;
        window.addEventListener("resize", this.resetSlide);
    }
    
    resetSlide = () => {
        let slider = document.getElementById('slider');
        let width = (slider.offsetWidth)*this.widthSlider;
        slider.style.transform = `translateX(-${width}px)`;
    }

    render(): JSX.Element {
        return (
            <Swipeable
                onSwiping={this.swiping}
                onSwipingLeft={this.swipingLeft}
                onSwipingRight = {this.swipingRight}
                onSwiped={this.swiped}
            >
                {this.props.children}

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
