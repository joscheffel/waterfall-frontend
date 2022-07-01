<script>
    import {createEventDispatcher} from "svelte";
    import Map from "./Map.svelte";

    export let waterfallId;

    const dispatch = createEventDispatcher();
    let satellite;
    let satelliteDetail;
    let markerTerrain;


    export function moveToLocation(location) {
        markerTerrain.moveToLocation(location);
        satellite.moveToLocation(location);
        satelliteDetail.moveToLocation(location);
    }

    function handleActiveMarker(event){
        moveToLocation(event.detail.latlng);
        dispatch("message", event.detail);
    }


</script>


<Map bind:this={markerTerrain} showMarkers="{true}" mapName="terrain-marker-map" height="400"} on:activeMarker={handleActiveMarker}/>
<Map bind:this={satellite} layerGroups="" showMarkers="{false}" baseLayer="Satellite" mapName="satellite-map" height="400"/>
<Map bind:this={satelliteDetail} layerGroups="" showMarkers="{false}" baseLayer="Satellite" mapName="terrain-map" zoom="15" height="400"/>