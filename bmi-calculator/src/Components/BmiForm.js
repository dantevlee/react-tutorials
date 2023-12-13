import { useState } from "react";
import Result from "./Result";

const BmiForm = () => {
  const [formIsValid, setIsFormValid] = useState(true);
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("");
  const [result, setResult] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!weight || !weightUnit || !height || !heightUnit) {
      setIsFormValid(false);
      return;
    }

    if (isNaN(weight) || isNaN(height)) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
    calculateBMI();
  };

  const calculateBMI = () => {
    let inputWeight = weight;
    let inputHeight = height;

    if (weightUnit === "lbs") {
      inputWeight = parseFloat(weight) / 2.21;
    }

    if (heightUnit === "in") {
      inputHeight = parseFloat(height) / 39.37;
    }

    const roundedResult =
      Math.round((inputWeight / (inputHeight * inputHeight)) * 10) / 10;

    setResult(roundedResult);
  };

  return (
    <div >
      <form onSubmit={submitHandler}>
        <label class="form-label">Weight:</label>
        <input
          class="form-control input-group-sm mb-3"
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter Weight.."
          type="text"
        />
        <label class="form-label">Unit:</label>
        <select
          class="form-select"
          onChange={(e) => setWeightUnit(e.target.value)}
        >
          <option disabled selected>
            -- Select a Unit --
          </option>
          <option value="lbs">Pounds - (lbs)</option>
          <option value="kg">Kilograms - (kg)</option>
        </select>
        <label class="form-label">Height:</label>
        <input
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter Height.."
          type="text"
          class="form-control"
        />
        <label class="form-label">Unit:</label>
        <select
          class="form-select"
          onChange={(e) => setHeightUnit(e.target.value)}
        >
          <option disabled selected>
            -- Select a Unit --
          </option>
          <option value="in">Inches - (in)</option>
          <option value="m">Meters - (m)</option>
        </select>
        <button type="submit" class="btn btn-warning btn-sm">
          Calculate BMI
        </button>
      </form>
      {!formIsValid && <p class="alert alert-danger">Please Enter Valid Data In All Fields</p>}
      {result && formIsValid && <Result BMIResult={result} />}
    </div>
  );
};

export default BmiForm;
