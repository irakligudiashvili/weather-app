import './style.css';

const searchBtn = document.getElementById('submitBtn');

searchBtn.addEventListener('click', () => {
    const searchTerm = document.getElementById('searchField').value;

    getData(searchTerm);
})

async function getData(term = 'london'){

    this.term = term;

    console.log('term: ' + term);

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${term}?unitGroup=metric&key=T56VNNTPMTZ9D8MS466XMU642&contentType=json`;
    
    try {
        const response = await fetch(url, {
            mode: 'cors'
        });


        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error.message);
    }

}

getData();