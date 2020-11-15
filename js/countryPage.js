function getProjectID() {
    let pageUrl = window.location.href;
    return pageUrl.split('#')[1];
}

let apiPath = 'https://restcountries.eu/rest/v2/name/' + getProjectID() + '?fullText=true';

populateHandlebars('.one-country', 'js/templates/individualCountry.hbs', apiPath)