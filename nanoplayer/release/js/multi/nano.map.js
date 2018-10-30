        var infowindow = null;
        document.addEventListener("DOMContentLoaded", function(event) {
            initialize();
        });

        function initialize() {

            var myOptions = {
                zoom: 10,
                center: {
                    lat: 52.520008,
                    lng: 13.404954
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById("map"), myOptions);


            document.getElementById("map_results").addEventListener("click", function() {
                if (document.getElementById("map_results").checked === true) {
                    _.observe(streamobj, function() {
                        if(streamobj.length == 0) {
         
                        }
                        clearMarkers();
                        setMarkers(map, streamobj);
                    });
                }
            });

            infowindow = new google.maps.InfoWindow({
                content: "loading..."
            });

        }

        var streamspins = [];
        var bounds = new google.maps.LatLngBounds();

        function setMarkers(map, markers) {
            var marker = [];
            for (var i = 0; i < markers.length; i++) {
                var sites = markers[i];
                var siteLatLng = new google.maps.LatLng(sites.gps.latitude, sites.gps.longitude);

                marker = new google.maps.Marker({
                    position: siteLatLng,
                    map: map,
                    title: sites.name,
                    html: sites.html,
                    animation: google.maps.Animation.DROP
                });
                streamspins.push(marker);
                google.maps.event.addListener(marker, "click", function() {
                    infowindow.setContent(this.html);
                    infowindow.open(map, this);
                });
                bounds.extend(siteLatLng);
            }

            if (markers.length !== 0) {
                map.fitBounds(bounds);
            }

        }

        function clearMarkers() {
            if (streamspins.length !== 0) {
                [].forEach.call(streamspins, function(stream) {
                    stream.setMap(null);
                });
            }
        }

        function onCheckedMap() {
            var li = document.querySelectorAll('#bintuStreamList li:not(:first-child)');
            //if the checkbox is checked
            if (document.getElementById("map_results").checked === true) {
              //show the map
                document.getElementById("map").style.position = "relative";
                document.getElementById("map").style.left = "0";
                //hide stream list
                document.getElementById('bintuStreamList').style.display = "none";
            } else {
                //if the checkbox is unchecked
                //hide the map
                document.getElementById("map").style.position = "absolute";
                document.getElementById("map").style.left = "-100%";
                //show Stream List
                document.getElementById('bintuStreamList').style.display = "block";

            }
        }
