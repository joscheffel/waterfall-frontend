<script>
    import WaterfallForm from "../components/WaterfallForm.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import Navigator from "../components/Navigator.svelte";
    import Map from "../components/Map.svelte";

    let waterfallMap;
    let waterfallForm;

    function waterfallAdded(event) {
        waterfallMap.addWaterfallMarker(event.detail.waterfall);
    }

    function moveTo(event) {
        waterfallMap.moveToLocation(event.detail);
    }

    function getCurrentLocation() {
        const center = waterfallMap.getCurrentCenter();
        waterfallForm.setCurrentCenter(center);
    }
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar title={"Waterfall Services"} subTitle={"Add Waterfalls"}/>
    </div>
    <div class="column">
        <Navigator/>
    </div>
</div>

<div class="columns is-vcentered">
    <div class="column has-text-centered">
        <Map bind:this={waterfallMap}/>
    </div>
    <div class="column has-text-centered">
        <WaterfallForm bind:this={waterfallForm} on:message={waterfallAdded} on:moveToLocation={moveTo}
                       on:getCenter={getCurrentLocation} title="Create a Waterfall"/>
    </div>
</div>