$(document).ready(function () {
    const countriesToInclude = ['ITA', 'FRA', 'JPN', 'GBR', 'ESP', 'DEU'];
    const apiURL = 'https://restcountries.com/v3.1/all';
    const countriesSelect = $('#countriesSelect');

    // Realizar una solicitud AJAX para obtener información de los países
    $.ajax({
        url: apiURL,
        type: 'GET',
        success: function (data) {
            // Filtrar los datos solo para los países que deseas incluir
            const filteredCountries = data.filter(country => countriesToInclude.includes(country.cca3));

            // Iterar sobre los datos filtrados y agregar opciones al <select>
            filteredCountries.forEach(function (country) {
                countriesSelect.append($('<option>', {
                    value: country.cca3,
                    text: country.name.common
                }));
            });
        },
        error: function (error) {
            console.error('Error al obtener la información de los países:', error);
        }
    });
});
