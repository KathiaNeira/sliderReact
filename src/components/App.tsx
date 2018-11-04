import * as React from "react";
import { ContainerSlider } from "../containers/sliderContainer";
import { Slider } from "./Slider";
import styled from "styled-components";

const Wrapper = styled.section`
  font-family: sans-serif;
  margin: auto;
`;

export const App = () => (
  <Wrapper>
    <ContainerSlider dots={true} prevAndNext={true} infinite={false}>
      <Slider 
        handleRef={ref => {
          this.reference = ref;
          console.log("ref====", ref);
        }}/>
    </ContainerSlider>
  </Wrapper>
);
