import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../context/auth";

function Catch(props) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [bait, setBait] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [fish, setFish] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weathercondition, setWeatherCondition] = useState("");
  const [image, setImage] = useState("");
  const [dummyimage, setDummyImage] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const { authTokens } = useAuth();
  

  function postCatch(e) {
    e.preventDefault()
    let userId = authTokens.record.id
    let formData = new FormData();
    formData.append("userId", userId)
    formData.append("latitude", latitude)
    formData.append("longitude", longitude)
    formData.append("weight", weight)
    formData.append("length", length)
    formData.append("bait", bait)
    formData.append("time", time)
    formData.append("date", date)
    formData.append("fish", fish)
    formData.append("temperature", temperature)
    formData.append("weathercondition", weathercondition)
    formData.append("image", image)
    axios.post('/api/catch', formData, {headers: {'Content-Type': 'multipart/form-data' }}) 
      
     
    // .then gotta finish this lines...
    }
  
    
  return (
    <Card>
      <Form>
        <Input
          type="number"
          value={latitude}
          onChange={e => {
            setLatitude(e.target.value);
          }}
          placeholder="latitude"
        />
        <Input
          type="number"
          value={longitude}
          onChange={e => {
            setLongitude(e.target.value);
          }}
          placeholder="longitude"
        />
        <Input
          type="number"
          value={weight}
          onChange={e => {
            setWeight(e.target.value);
          }}
          placeholder="weight in ounces"
        />
        <Input
          type="number"
          value={length}
          onChange={e => {
            setLength(e.target.value);
          }}
          placeholder="length in inches"
        />
        <Input
          type="text"
          value={bait}
          onChange={e => {
            setBait(e.target.value);
            console.log(e.target.value)
          }}
          placeholder="type of bait"
        /><Input
        type="time"
        value={time}
        onChange={e => {
          setTime(e.target.value);
        }}
        placeholder="time"
      />
      <Input
        type="date"
        value={date}
        onChange={e => {
          setDate(e.target.value);
        }}
        placeholder="date"
      /><Input
      type="text"
      value={fish}
      onChange={e => {
        setFish(e.target.value);
      }}
      placeholder="what fish"
    />
    <Input
      type="number"
      value={temperature}
      onChange={e => {
        setTemperature(e.target.value);
      }}
      placeholder="in fahrenheit"
    />
    <Input
      type="text"
      value={weathercondition}
      onChange={e => {
        setWeatherCondition(e.target.value);
        console.log(e.target.value);
      }}
      placeholder="sunny? cloudy? rainy?"
    />
    <Input
      type="file"
      value={dummyimage}
      onChange={e => {
        setDummyImage(e.target.value)
        setImage(e.target.files[0]);
        console.log(e.target.value);
      }}

      
    />

        <Button onClick={postCatch}>Post your catch</Button>
      </Form>
    </Card>
    
    
    
  
  );
}


export default Catch;