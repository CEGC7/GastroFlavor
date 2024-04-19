function initMap() {
    // Obtener la ubicación actual del usuario
    navigator.geolocation.getCurrentPosition(function(position) {
        var ubicacionActual = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        // Coordenadas del punto de negocio (ejemplo)
        var puntoNegocio = { lat: 10.004846, lng: -84.202328};  
        
        // Crear un nuevo mapa en el div #map
        /*Esta es una llamada al constructor de la clase
         Map del API de Google Maps JavaScript. 
         Crea una nueva instancia de un objeto de mapa de Google Maps.*/
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12, // Nivel de zoom inicial
            center: ubicacionActual // Centrar el mapa en la ubicación actual
        });

        // Crear marcador en la ubicación actual
        var marker = new google.maps.Marker({
            position: ubicacionActual,
            map: map, // Mapa donde se colocará el marcador
            title: 'Tu ubicación actual' // Título del marcador
        });

        // Crear marcador en el punto de negocio
        var negocioMarker = new google.maps.Marker({
            position: puntoNegocio,
            map: map,
            title: 'Punto de negocio' // Título del marcador
        });

        // Calcular ruta entre la ubicación actual y el punto de negocio

        /* El DirectionsService se utiliza para calcular rutas entre dos o más ubicaciones.
         Proporciona métodos para enviar solicitudes de rutas al servidor de Google 
         y recibir respuestas con la ruta calculada.*/
        var directionsService = new google.maps.DirectionsService();

        /**El DirectionsRenderer se utiliza para visualizar las rutas calculadas en el mapa.
         *  Es responsable de mostrar la línea de la ruta 
         * y los marcadores asociados en el mapa. */
        var directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        var request = {
            origin: ubicacionActual,
            destination: puntoNegocio,
            travelMode: 'DRIVING'
        };

        directionsService.route(request, function(result, status) {
            if (status == 'OK') {
                directionsRenderer.setDirections(result);
                // Calcular la distancia entre los puntos

                var distancia = result.routes[0].legs[0].distance.text;
                document.getElementById('distance').textContent = distancia;
                console.log('Distancia: ' + distancia);
            } else {
                window.alert('No se pudo calcular la ruta: ' + status);
            }
        });
    });
}