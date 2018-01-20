   $(document).ready(function () {
        var geocoder;
        var map;

        $('#creaMappa').click(function () {
            var address = $('#addr').val();

            geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    console.log('geocoder results:');
                    console.dir(results);

                    var mapOptions = {
                        zoom: 16,
                        mapTypeControl: true,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                        },
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.SMALL
                        },
                        //streetViewControl: false,
                        center: results[0].geometry.location
                    }

                    map = new google.maps.Map(document.getElementById('map1'), mapOptions);

                    $('#lat').text(results[0].geometry.location.lat());
                    $('#lng').text(results[0].geometry.location.lng());

                    //map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        title:"Lost Dog",
                        label: "Lost",
                        position: results[0].geometry.location,
                        draggable: false,
                        animation: google.maps.Animation.DROP
                    });
                    var contentString = '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">Lost Dog</h1>' +
                        '<div id="bodyContent">' +
                        '<p><b>Lost Dog</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                        'sandstone rock formation in the southern part of the ' +
                        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
                        'south west of the nearest large town, Alice Springs;</p>' +
                        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
                        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
                        '(last visited June 22, 2009).</p>' +
                        '</div>' +
                        '</div>';
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });
                    

                } else {
                    alert('Please try a different address.');
                }
            });

        })
            .trigger('click');

    });


 