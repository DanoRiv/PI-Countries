import React from 'react'
import Nav from '../Nav';

function CreateActivity() {
  return (
    <>
    <Nav/>
    <div>
      <h3>Create your activity</h3>
      <label > Name:
        <input type="text" />
      </label>
      <label > Difficulty:
        <input type="range" />
      </label>
      <label > Duration
        <input type="number" />
      </label>
      <label > Season
        <select name="" id="">
          <option value="">Fall</option>
          <option value="">Spring</option>
          <option value="">Summer</option>
          <option value="">Winter</option>
        </select>
      </label>
      <button> Create </button>
    </div>
  </>
  );
}

export default CreateActivity