import { Container, Paper, Grid, Button, styled } from "@mui/material";
import React, { useState } from "react";
import { GridOperationButton } from "./GridOperationButton";
import { GridDigitButton } from "./GridDigitButton";

const OutputContainer = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "right",
  height: "2em",
  padding: theme.spacing(2),
  fontSize: "3em",
  overflow: "hidden"
}));

const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 15
}));

function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [operation, setOperation] = useState("");
  const [prevValue, setPrevValue] = useState("");
  const [overwrite, setOverwrite] = useState(true);


  const calculate = () => {
    if (!prevValue || !operation) return currentValue;
    const curr = parseFloat(currentValue);
    const prev = parseFloat(prevValue)
    
    let result;
    switch(operation) {
      case "÷":
        result = prev / curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "+":
        result = prev + curr;
        break;

    }
    return result
  }

  const equals = () => {
    const val = calculate();
    setCurrentValue(`${val}`);
    setPrevValue("");
    setOperation("")
    setOverwrite(true)
  }

  const clear = () => {
    setPrevValue("");
    setOperation("");
    setCurrentValue("0");
    setOverwrite(true);
  };

  const del = () => {
    setCurrentValue("0");
    setOverwrite(true);
  };

  const percent = () => {
    const curr = parseFloat(currentValue);
    setCurrentValue((curr / 100).toString());
  }

  const selectOperation = (operation: string) => {
    if (prevValue) {
        const val = calculate();
        setCurrentValue(`${val}`)
        setPrevValue(`${val}`)
    }
    else {

      setPrevValue(currentValue)
    }
    setPrevValue(currentValue);
    setOperation(operation)
    setOverwrite(true);
  };

  const setDigit = (digit: string) => {
    if (currentValue[0] === "0" && digit === "0") return;
    if (currentValue.includes(".") && digit === ".") return;
    if (overwrite && digit !== ".") {
      setCurrentValue(digit);
    } else {
      setCurrentValue(`${currentValue}${digit}`);
    }

    setOverwrite(false);
  };

  // BURDAYIZ
  // https://youtu.be/q4fLzIr3BwE?t=1178
  return (
    <Container maxWidth="sm">
      <CalculatorBase elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <OutputContainer>{currentValue}</OutputContainer>
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridOperationButton operation={"AC"} selectOperation={clear} selectedOperation={operation} />
            <GridOperationButton operation={"C"} selectOperation={del} selectedOperation={operation} />
            <GridOperationButton operation={"%"} selectOperation={percent} selectedOperation={operation} />
            <GridOperationButton operation={"÷"} selectOperation={selectOperation} selectedOperation={operation} />
          </Grid>
          <Grid item container>
            <GridDigitButton digit={"7"} enterDigit={setDigit}></GridDigitButton>
            <GridDigitButton digit={"8"} enterDigit={setDigit}></GridDigitButton>
            <GridDigitButton digit={"9"} enterDigit={setDigit}></GridDigitButton>
            <GridOperationButton operation={"*"} selectOperation={selectOperation} selectedOperation={operation} />
          </Grid>
          <Grid item container>
            <GridDigitButton digit={"4"} enterDigit={setDigit}></GridDigitButton>
            <GridDigitButton digit={"5"} enterDigit={setDigit}></GridDigitButton>
            <GridDigitButton digit={"6"} enterDigit={setDigit}></GridDigitButton>
            <GridOperationButton operation={"-"} selectOperation={selectOperation} selectedOperation={operation} />
          </Grid>
          <Grid item container>
            <GridDigitButton digit={"1"} enterDigit={setDigit}></GridDigitButton>
            <GridDigitButton digit={"2"} enterDigit={setDigit}></GridDigitButton>
            <GridDigitButton digit={"3"} enterDigit={setDigit}></GridDigitButton>
            <GridOperationButton operation={"+"} selectOperation={selectOperation} selectedOperation={operation} />
          </Grid>
          <Grid item container>
            <GridDigitButton digit={"0"} enterDigit={setDigit} xs={6}></GridDigitButton>
            <GridDigitButton digit={"."} enterDigit={setDigit}></GridDigitButton>
            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={equals}>
                =
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CalculatorBase>
    </Container>
  );
}

export default App;
