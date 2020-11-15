async function getData(APIpath) {
    let data = await fetch(APIpath);

    return data.json();
}

async function populateHandlebars(targetElement, handlebarsPath, APIpath) {
    let dataToInsert = await getData(APIpath);
    let HBTemplate = await getTemplateAjax(handlebarsPath);
    let template = Handlebars.compile(HBTemplate);
    let score_list = document.querySelector(targetElement)
    score_list.innerHTML = '';
    dataToInsert.forEach((country) => {
        score_list.innerHTML += template(country);
    })

}

async function getTemplateAjax(path) {
    let response = await fetch(
        path,
        {method: 'get'}
    )

    return response.text()
}

let filter = document.querySelector('.region-filter');
filter.addEventListener('change', () => {
    let filterResult = filter.value;
    switch (filterResult) {
    case '1':
        populateHandlebars('.all-countries', 'js/templates/countryIndex.hbs', 'https://restcountries.eu/rest/v2/all');
        break;
    case '2':
        populateHandlebars('.all-countries', 'js/templates/countryIndex.hbs', 'https://restcountries.eu/rest/v2/region/oceania');
        break;
    case '3':
        populateHandlebars('.all-countries', 'js/templates/countryIndex.hbs', 'https://restcountries.eu/rest/v2/region/europe');
        break;
    case '4':
        populateHandlebars('.all-countries', 'js/templates/countryIndex.hbs', 'https://restcountries.eu/rest/v2/region/americas');
        break;
    case '5':
        populateHandlebars('.all-countries', 'js/templates/countryIndex.hbs', 'https://restcountries.eu/rest/v2/region/africa');
        break;
    case '6':
        populateHandlebars('.all-countries', 'js/templates/countryIndex.hbs', 'https://restcountries.eu/rest/v2/region/asia');
        break;
    }
})

populateHandlebars('.all-countries', 'js/templates/countryIndex.hbs', 'https://restcountries.eu/rest/v2/all');


let startsSearchQueryBox = document.querySelector('.country-starts-search');
startsSearchQueryBox.addEventListener('keyup', startsWithSearch)

let includesSearchQueryBox = document.querySelector('.country-includes-search');
includesSearchQueryBox.addEventListener('keyup', includesSearch)

function includesSearch () {
    let countries = document.querySelectorAll('.flag-container');
    let searchQuery = includesSearchQueryBox.value.toLowerCase();
    if (searchQuery.length >= 1) {
        startsSearchQueryBox.value = '';
    }
    countries.forEach((country) => {
        let name = country.getAttribute('data-name').toLowerCase();
        // console.log(name);
        if (!name.includes(searchQuery)) {
            country.style.display = 'none';
        } else {
            country.style.display = 'flex';
        }
    })
}

function startsWithSearch () {
    let countries = document.querySelectorAll('.flag-container');
    let searchQuery = startsSearchQueryBox.value.toLowerCase();
    if (searchQuery.length >= 1) {
        includesSearchQueryBox.value = '';
    }
    let regex = '^' + searchQuery + '\\w+';
    let pattern = new RegExp(regex);
    countries.forEach((country) => {
        let name = country.getAttribute('data-name').toLowerCase();
        // console.log(name);
        console.log(pattern)
        if (name.match(pattern)) {
            country.style.display = 'flex';
        } else {
            country.style.display = 'none';
        }
    })
}