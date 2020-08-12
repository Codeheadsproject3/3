import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../context/auth";
import MapSection from '../components/Map'


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
  const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const { authTokens } = useAuth();
  

  function postCatch() {
    let userId = authTokens.record.id
    axios.post('/catch', {
      latitude,
      longitude,
      weight,
      length,
      bait,
      time,
      date,
      fish,
      temperature,
      weathercondition,
      userId
    }) 
    // .then gotta finish this lines...
    }
  
    const location = {
      address: '1600 Amphitheatre Parkway, Mountain View, california.',
      lat: 37.42216,
      lng: -122.08427,
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
    

        <Button onClick={postCatch}>Post your catch</Button>

      </Form>
    </Card>


    
    
    
  
  );
}


export default Catch;