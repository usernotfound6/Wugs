import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { InlineWidget } from "react-calendly";


// Path: /review

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name Review with the name for the new component.
function ReviewPage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const store = useSelector((store) => store);
  // const [heading, setHeading] = useState('Functional Component');

  return (
    <div className="App">
      <header className="App-header">{/* Your other content */}</header>

      <InlineWidget url="https://calendly.com/dontyellwillcry" />
      <h3>CALANDLY</h3>
      {/* <button onClick={getGif}>Get Gif</button> */}
    </div>
  );
}

export default ReviewPage;