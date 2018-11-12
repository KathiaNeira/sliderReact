import * as React from "react";
import styled, { css } from "styled-components";

const images = [
  'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/460823/pexels-photo-460823.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
];

interface Slider {
  order?: any;
  position?: any;
}


const SliderWrapper = styled.div`
  display: flex;
  div{
    width: 100%;
    text-align: center;
    margin: auto;
    img {
      width:491px;
      height: 294px
    }
  }
`;

const SliderItem = styled.div`
  flex: 1 0 100%;
  flex-basis: 100%;
  background: #c2c2c2;
`;

export const Slider = () => (
  <React.Fragment>
    <SliderWrapper id="slider" >
      {images.map((link, index) => (
        <SliderItem key={index} >
          <img src={link} alt=""/>
          <p>slider {index}</p>
        </SliderItem>
      ))}
    </SliderWrapper>
  </React.Fragment>
);
