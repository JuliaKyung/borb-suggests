import React, {useState} from "react";
import "./App.css";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";
import Axios from "axios";
import {v4 as uuidv4} from "uuid";
require('dotenv').config();

const App = () => {
    const [query, setQuery] = useState("");
    const [diet, setDiet] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState("");
    
    const API_KEY = "4559be87607d4ee3aab02fc366e98b34";
    const url = `https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${API_KEY}&diet=${diet}`;

    const getData = async () => {
        if(query !== ""){
            const result = await Axios.get(url) //testing out the url
            //async await because it needs to wait a little bit to get the data
            //basic search
            if(result.data.totalResults === 0){
                return setAlert("Borb cannot find what you want!!")
            }
            setRecipes(result.data.results)
            console.log(result);
            setQuery(""); //reset afterwards
            setDiet("");
            setAlert("")
        } else {
            setAlert("A Borb can't recommend NOTHING!")
        }
    }

    const submitSearch = (e) => {
        e.preventDefault();
        getData();
    }

    const onChange = (e) => {
        // console.log(e.target.value)
        setQuery(e.target.value);
    }

    const onClick = (e) => {
        setDiet(e.target.id)
        // console.log(e.target.checked)
    }

    return (
        <center><div className="app-div">
            <h1>Borb suggests!</h1>
            <div className="borbimg">
                <img src="https://i.ibb.co/41ntSZB/output-dzavb5.gif" height="370px" width="370px"/>
            </div>
            <form className="searchForm" onSubmit={submitSearch}>
                {alert !== "" && <Alert alert={alert}/>}
                <input 
                type="text" 
                placeholder="Search food" 
                onChange={onChange}
                value={query}/>
                <form className="diet">
                    <input type="radio" onClick={onClick} id="vegetarian" name="dietbtn"/> Vegetarian
                    <input type="radio" onClick={onClick} id="vegan" name="dietbtn"/> Vegan
                    <input type="radio" onClick={onClick} id="ketogenic" name="dietbtn"/> Keto
                    <input type="radio" onClick={onClick} id="gluten-free" name="dietbtn"/> Gluten Free
                </form>
                <input type="submit" value="search"></input>
            </form>
            <div className="resultsDiv">
            {/* Make sure that the recipes is not empty, and then map thru the recipes
            and grab what we need to render */}
            {recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)}
            </div>
        </div></center>
    )
}

export default App
