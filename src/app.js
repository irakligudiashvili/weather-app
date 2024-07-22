import './style.css';

const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const searchTerm = document.getElementById('search-field').value;

    getData(searchTerm);
})

document.addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchTerm = document.getElementById('search-field').value;
    
    getData(searchTerm);
});

async function getData(term = 'london'){

    const searchTerm = term;

    console.log('term: ' + searchTerm);

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?unitGroup=metric&key=T56VNNTPMTZ9D8MS466XMU642&contentType=json`;
    
    try {
        const response = await fetch(url, {
            mode: 'cors'
        });

        const data = await response.json();
        populateData(data);
        console.log(data);
        return;
    } catch (error) {
        console.log(error.message);
    }

}

function populateData(data){
    const area = document.getElementById('area');

    area.innerHTML = data.resolvedAddress;

    const minorDesc = document.getElementById('minor-desc');

    minorDesc.innerHTML = data.currentConditions.conditions;

    const degrees = document.getElementById('degrees');

    degrees.innerHTML = data.currentConditions.temp + '°C';

    const time = document.getElementById('time');

    time.innerHTML = data.currentConditions.datetime;

    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');


    sunrise.innerHTML = data.currentConditions.sunrise;
    sunset.innerHTML = data.currentConditions.sunset;

    const majorDesc = document.getElementById('major-desc');

    majorDesc.innerHTML = data.description;

    const container = document.getElementById('container');
    container.innerHTML = '';
    
    data.days.forEach(day => {
        const forecast = document.createElement('div');
        forecast.classList.add('forecast-div');
        forecast.innerHTML = `
            <div class="forecast-text-div">
                <p class="forecast-day">${formatDate(day.datetime)}</p>
            </div>
            <p class="forecast-degrees">${day.temp}°</p>
        `

        container.appendChild(forecast);
    });

    container.firstChild.remove();

    const searchTerm = document.getElementById('search-field');
    searchTerm.value = '';
}

getData();

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });

    // Get the day suffix (st, nd, rd, th)
    const daySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${day}${daySuffix(day)} ${month}`;
}