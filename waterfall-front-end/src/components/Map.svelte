<script>
    import {createEventDispatcher, getContext, onMount} from "svelte";
    import {LeafletMap} from "../services/LeafletService.js";

    export let height = 800;
    export let layerGroups = ["Small", "Medium", "Large"];
    export let showMarkers = true;
    export let baseLayer = "";
    export let mapName = "waterfall-map";
    export let zoom = 8;
    export let startLocation = {lat: 52.160858, lng: -7.152420};

    const dispatch = createEventDispatcher();

    const mapConfig = {
        location: startLocation,
        zoom: zoom,
        minZoom: 1,
    };

    const waterfallService = getContext("WaterfallService");

    let map;

    function onMarkerClick(event){
        const waterfallId = map.findIdForLocation(event.latlng);
        dispatch("activeMarker", {latlng: event.latlng, waterfallId: waterfallId});
    }

    onMount(async () => {
        map = new LeafletMap(mapName, mapConfig, baseLayer, onMarkerClick);
        map.showZoomControl();
        for (let layerGroup of layerGroups) {
            map.addLayerGroup(layerGroup);
        }
        map.showLayerControl();

        if (showMarkers) {
            const waterfalls = await waterfallService.getWaterfalls();
            waterfalls.forEach(waterfall => {
                const waterfallString = `${waterfall.name} [${waterfall.categories.continent},${waterfall.categories.size}]`;
                map.addMarker({
                    lat: waterfall.location.lat,
                    lng: waterfall.location.long
                }, waterfallString, waterfall.categories.size, waterfall._id);
            });
        }
    });

    export function addWaterfallMarker(waterfall) {
        const waterfallString = `${waterfall.name} [${waterfall.categories.continent},${waterfall.categories.size}]`;
        map.addMarker({
            lat: waterfall.location.lat,
            lng: waterfall.location.long
        }, waterfallString, waterfall.categories.size, waterfall._id);
        map.moveTo(11, {lat: waterfall.location.lat, lng: waterfall.location.long})
    }

    export function moveToLocation(location) {
        map.moveTo(zoom, {lat: location.lat, lng: location.lng})
    }

    export function getCurrentCenter() {
        return map.getCenterOfMap();
    }

    export function changeMarkerLocation(id, location) {
        map.changeLocationOfMarker(id, location);
    }
</script>

<div class="box" id="{mapName}" style="height:{height}px">
</div>