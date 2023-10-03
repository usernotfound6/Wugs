import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

// Path: /getmoreinfo

function GetMoreInfoPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const [aboutClient, setAboutClient] = useState('');
  const [whyWugs, setWhyWugs] = useState('');

  // captures characters into 3 groups, adding parentheses around first group and - between 2nd/3rd groups
  function getFormattedPhoneNum(input) {
    let output = "(";
    input.replace(/^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function (match, g1, g2, g3) {
      if (g1.length) {
        output += g1;
        if (g1.length == 3) {
          output += ")";
          if (g2.length) {
            output += " " + g2;
            if (g2.length == 3) {
              output += " - ";
              if (g3.length) {
                output += g3;
              }
            }
          }
        }
      }
    }
    );
    return output;
  }

  // Function to format the phone number as you type
  const handleFormatPhoneNumber = (event) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    // Remove non-digit characters
    let formattedValue = getFormattedPhoneNum(inputValue);
    setPhone(formattedValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("inside handleSubmit");
    let getMoreInfoObject = {
      name: name,
      email: email,
      phone_number: phone,
      industry: industry,
      about_you: aboutClient,
      why_wugs: whyWugs
    }
    console.log(getMoreInfoObject)

    axios.post('/api/interested', getMoreInfoObject)
      .then(response => {
        console.log("success with interested party POST:", response);
      })
      .catch(error => {
        console.error("error with interested party POST:", error);
      })
    setName('');
    setEmail('');
    setPhone('');
    setIndustry('');
    setAboutClient('');
    setWhyWugs('');
  }

  return (
    <div>
      <h2>Contact Wugs</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        /><br />

        <label htmlFor="email">Email Address:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john.doe@gmail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        /><br />

        <label htmlFor="phone">Phone Number:</label><br />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="(123) 456-7890"
          value={phone}
          onChange={handleFormatPhoneNumber}
          required
        /><br />

        <label htmlFor="industry">Business / Industry:</label><br />
        <input
          type="text"
          id="industry"
          name="industry"
          placeholder="School, Office, Warehouse, etc"
          value={industry}
          onChange={(event) => setIndustry(event.target.value)}
        /><br />

        <label htmlFor="about">About You:</label><br />
        <textarea
          id="aboutClient"
          name="aboutClient"
          value={aboutClient}
          placeholder="Example: We operate a university library serving students and faculty."
          onChange={(event) => setAboutClient(event.target.value)}
          rows="4"
          cols="50"
        ></textarea><br />

        <label htmlFor="whyWugs">What brings you to Wugs today?</label><br />
        <textarea
          id="whyWugs"
          name="whyWugs"
          value={whyWugs}
          placeholder="Example: Having a mini-market on-site would be a great convenience for our students and staff."
          onChange={(event) => setWhyWugs(event.target.value)}
          rows="4"
          cols="50"
        ></textarea><br />

        <button type="submit" value="Submit">Submit</button>
      </form>

    </div>
  );
}

export default GetMoreInfoPage;