
//this file is supposed to be run once to populate the database with all the countries 
//it uses the restcountries api to get all the countries and their data
//it then uses axios to post the data to the database
//change the url in axios.post to match your own url
//run this file using node Populate Countries.js
//don't forget to install axios using npm install axios


import axios from "axios";

const getCountries = () => {
    return fetch("https://restcountries.com/v3.1/all")
        .then(response => {
            if (!response.ok) {
                console.log('Error fetching countries:');
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(countries => {
            console.log('Data fetched successfully');
            for (let country of countries) {
                let obj = {
                    name: country.name.common,
                    languages: country.languages?Object.values(country.languages):null,
                    flag: country.flags.png,
                    code: country.flag
                }
                axios.post('http://localhost:8000/api/country', obj)
                    .then(res => {
                        console.log(res.data);
                        console.log("Country added");
                    })
                    .catch(err => {
                        console.log(err);
                        console.log("Country not added");
                    })

            }
            return countries; // You may want to return the data for further processing
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}

getCountries();