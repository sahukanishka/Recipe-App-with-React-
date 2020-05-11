import React , {useEffect ,useState} from 'react';
import Recipe from './Recipe'; 
import "./App.css";

const App = () =>{

const APP_ID = "d368cc37";
const APP_KEY = "f2226e3107ff9b7cfbc241e29d4fba7b" ; 

// const example_request =  `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

const [recipes,setRecipes] = useState([]);
const [search,setResults] = useState("");
const[query,setQuery] = useState("chicken");

useEffect(()=>{
    getRecipes();
},[query]);

const getRecipes =async () => {
    const response = await fetch( `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
}

const updateSearch = e => {
    setResults(e.target.value);
}

const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setResults('');
}

return (
    <div className = "body">
    <div className="app-bar">
        <form className="search-form" onSubmit={getSearch}>
      <input 
      className="search-bar" 
      type="text" value={search} 
      onChange={updateSearch}/>
      <button 
      className="search-button" 
      type="submit" > Search </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
      <Recipe
      key = {recipe.recipe.label}
      title = {recipe.recipe.label}
      calories = {recipe.recipe.calories}
      image = {recipe.recipe.image}
      ingredients = {recipe.recipe.ingredients}
      />
      ))}
      </div>
    </div>
    </div>
);
}
export default App ; 