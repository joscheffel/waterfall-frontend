<script>
    import TitleBar from "../components/TitleBar.svelte";
    import WaterfallList from "../components/WaterfallList.svelte";
    import WaterfallDetails from "../components/WaterfallDetails.svelte";
    import {getContext} from "svelte";
    import Navigator from "../components/Navigator.svelte";
    import Map from "../components/Map.svelte";

    let selectedWaterfallId = null;
    let waterfallDetails = null;

    const waterfallService = getContext("WaterfallService");

    async function waterfallSelected(event) {
        selectedWaterfallId = event.detail.waterfallId;
        waterfallDetails.selectWaterfall(selectedWaterfallId);
    }

    let map;

    function moveTo(event) {
        map.moveToLocation(event.detail);
    }

</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar subTitle={"Filter Waterfalls"} title={"Waterfall Services"}/>
    </div>
    <div class="column">
        <Navigator/>
    </div>
</div>

<div class="columns">
    <div class="column has-text-centered is-half m-3">
        <div class="box">
            <Map bind:this={map} height="300"/>
            <WaterfallDetails bind:this="{waterfallDetails}"/>
        </div>
    </div>
    <div class="column has-text-centered m-3">
        <div class="box">
            <h1 class="title is-4">All the Waterfalls around the globe</h1>
            <WaterfallList on:selectedWaterfallId={waterfallSelected} on:location={moveTo}/>
        </div>
    </div>
</div>
