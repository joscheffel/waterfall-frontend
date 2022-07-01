<script>
    import 'leaflet/dist/leaflet.css';
    import {getContext, onMount} from "svelte";
    import {LeafletMap} from "../services/LeafletService.js";
    export let height = 800;

    const mapConfig = {
        location: {lat: 52.160858, lng: -7.152420},
        zoom: 8,
        minZoom: 1,
    };

    const waterfallService = getContext("WaterfallService");

    let map;

    onMount(async () => {
        map = new LeafletMap("donation-map", mapConfig);
        map.showZoomControl();
        map.addLayerGroup("Small");
        map.addLayerGroup("Medium")
        map.addLayerGroup("Large");
        map.showLayerControl();

        const waterfalls = await waterfallService.getWaterfalls();
        waterfalls.forEach(waterfall => {
            const waterfallString = `${waterfall.name} [${waterfall.categories.continent},${waterfall.categories.size}]`;
            map.addMarker({lat: waterfall.location.lat, lng: waterfall.location.long}, waterfallString, waterfall.categories.size);
        });
    });

    export function addWaterfallMarker(waterfall){
        const waterfallString = `${waterfall.name} [${waterfall.categories.continent},${waterfall.categories.size}]`;
        map.addMarker({lat: waterfall.location.lat, lng: waterfall.location.long}, waterfallString, waterfall.categories.size);
        map.moveTo(11, {lat: waterfall.location.lat, lng: waterfall.location.long})
    }

    export function moveToLocation(location){
        map.moveTo(11, {lat: location.lat, lng: location.lng})
    }

    export function getCurrentCenter(){
        return  map.getCenterOfMap();
    }

    export function changeMarkerLocation(id, location){
        map.changeLocationOfMarker(id, location);
    }
</script>

<div class="box" id="donation-map" style="height:{height}px">
</div>