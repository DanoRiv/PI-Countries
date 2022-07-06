import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clearPage, createActivity, getCountries } from '../../redux/actions';
import style from './form.module.css'

function CreateActivity() {

  const countries = useSelector(state => state.countries);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries())

    return()=>{
      dispatch(clearPage())
    }
  }, [dispatch]);

  const [selected, setSelected] = useState([]);
  const [durationString, setDurationString] = useState({durationNum: 0, durationText: ""});
  const [values, setValues] = useState({
    name: "",
    difficulty: 0,
    duration: "",
    season: "",
    country: []
  });

  const [validate, setValidate] = useState({
    name: "",
    difficulty: "",
    durationNum: "",
    country: ""
  });

  /* changes on the normal inputs */
  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  /* changes on the difficulty slider input */
  function handleDifficulty(e) {
    setValues({
      ...values,
      difficulty: parseInt(e.target.value),
    });
  }

  /* changes on the duration inputs */
  function handleDuration(e){
    setDurationString({ ...durationString, [e.target.name]: e.target.value })
  }
  function handleSelect(){

    const {durationNum, durationText} = durationString
    setValues({
      ...values,
      duration: `${durationNum} ${durationText}`
    })
  }
  
   /* changes on the countries multi-select */
  function handleCountries(e) {
    let value = Array.from(e.target.selectedOptions, (select) => select.value);
    if(!selected.includes(value.toString())){
      setSelected([...selected, value].flatMap((e) => e));
    }
  }
  /*  sends the country input changes to the values state  */
  const handleClick = () => {
    setValues({
      ...values,
      country: selected,
    });
  };

  const handleRemove = (index)=>{
    const list = [...selected];
    list.splice(index, 1);
    setSelected(list)
    setValues({
      ...values,
      country: list,
    });
  }

  /*  VALIDATIONS  */

  const validateAll = ()=>{
    const { name, difficulty, country } = values;
    const { durationNum } = durationString
    const validation = {name: "", difficulty: "", durationNum: "", country:""};
    let isValid = true;
    if(!name){
      validation.name = "Activity name required";
      isValid = false;
    }
    if(!difficulty){
      validation.difficulty = "Activity difficulty required"
      isValid = false
    }
    if(!typeof difficulty === "number"){
      validation.difficulty = "The field must be a number";
      isValid = false;
    }
    if(!typeof durationNum === "number"){
      validation.difficulty = "The field must be a number";
      isValid = false;
    }
    if(durationNum < 0 || durationNum > 100){
      validation.durationNum = "The score must be over 0 and under 100";
      isValid = false;
    }
    if(!country.length){
      validation.country = "Must select at least one country for the activity";
      isValid = false;
    }

    if(!isValid){
      setValidate({validation});
    }
    return isValid
  }

  const validateOne = (e)=>{
    const val = values[e.target.name];
    const val2 = durationString[e.target.name];
    let message = "";

    if(!val && !val2){
      message = `${e.target.name} required`;
    }
    if(e.target.name === "country" && !val.length){
      message = "Must select at least one country for the activity";
    }
    if(val2 && e.target.name === 'durationNum' && (val2 < 0 || val2 > 100)){
      message = `${e.target.name} must be over 0 and under 100`
    }
    if((e.target.name === 'difficulty' || e.target.name === 'durationNum') && !typeof val2 === 'number' ){
      message = `${e.target.name} must be a number`
    }

    setValidate({
      ...validate,
      [e.target.name]: message
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return false;
    dispatch(createActivity(values));
    alert("Activity created successfully");
    setTimeout(() => {
      history.push("/countries");
    }, 1000);
  }

  const {name, difficulty, durationNum, durationText} = values;
  const {name: nameVal, difficulty: difficultyVal, durationNum: durationNumVal, country: countryVal} = validate;

  return (
    <div className={style.formContainer}>
      <Link to='/countries' className={style.cta}>
       <span>Go Home</span> 
      </Link>
      <div className={style.formBox}>
        <h3>Create your activity</h3>
        <form className={style.form} onSubmit={handleSubmit}>
          <label>
            Name:{" "}
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={validateOne}
              placeholder="Activity name"
              required
            />
          </label>
          <div className={style.validation}>{nameVal}</div>
          <label>
            Difficulty (From 1 to 5): {difficulty}
            <input
              name="difficulty"
              value={difficulty}
              type="range"
              min={0}
              max={5}
              onChange={handleDifficulty}
              onClick={validateOne}
              required
            />
          </label>
          <div className={style.validation}>{difficultyVal}</div>
          <label>
            Duration:{" "}
            <div className={style.duration}>
              <input
                type="number"
                name="durationNum"
                value={durationNum}
                min={0}
                max={100}
                onChange={handleDuration}
                onBlur={validateOne}
                required
              />
              <select
                name="durationText"
                defaultValue=""
                value={durationText}
                onChange={handleDuration}
                onBlur={handleSelect}
              >
                <option value="" disabled>
                  Time
                </option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
          </label>
          <div className={style.validation}>{durationNumVal}</div>
          <label>
            Season:{" "}
            <select
              name="season"
              defaultValue=""
              onChange={handleChange}
              onBlur={validateOne}
            >
              <option value="" disabled>
                Season{" "}
              </option>
              <option value="fall">Fall</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
            </select>
          </label>
          <label>
            Countries:
            <select
              name="country"
              value={selected}
              onChange={handleCountries}
              onClick={handleClick}
              onBlur={validateOne}
              multiple={true}
            >
              {countries
                .sort((a, b) =>
                  a.name > b.name ? 1 : b.name > a.name ? -1 : 0
                )
                .map((e, index) => (
                  <option key={index}>{e.name}</option>
                ))}
            </select>
          </label>
          {" "}
          <div className={style.validation}>{countryVal}</div>
          <span>
            {selected.map((e, index) => (
              <div key={index} className={style.firstDivision}>
                <p>{e}
                  <button
                    type="button"
                    className={style.removeBtn}
                    onClick={() => handleRemove(index)}
                  >
                  <span>x</span>
                  </button>
                </p>
              </div>
            ))}
          </span>
          <button className={style.send}> Create </button>
        </form>
      </div>
    </div>
  );
}

export default CreateActivity