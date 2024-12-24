const movie=[{title: "Pushpa", genre: "Action", rating: "5.0", release_year:"2024"},
{title: "Singham", genre: "Action", rating: "4.3", release_year:"2024"},
{title: "Avengers", genre: "Sci-fi", rating: "5.0", release_year:"2012"}
]

const addMovie=(collection,movie)=>{
    collection.push(movie);
};
addMovie(movie, {
    title: "Intestellar", genre: "Sci-fi", rating: "5.0", release_year:"2019"
});

console.log("The array before adding a new movie");
console.log(movie);

console.log("The array after adding a new movie");
console.log(movie);

const filter_genre=movie.filter(movie=>movie.genre=="Sci-fi");
console.log("All the movies of Sci-fi genre are:");
console.log(filter_genre);

const filter_year=movie.filter(movie=>movie.release_year>2015);
console.log("The names of movie released after 2015 are:");
console.log(filter_year);

const getMovieTitles = (collection) => {
    return collection.map((movie) => movie.title);
};
console.log("The map out of the array is:");
console.log(getMovieTitles);