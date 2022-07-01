<script>
    import TitleBar from "../components/TitleBar.svelte";
    import WaterfallList from "../components/WaterfallList.svelte";
    import WaterfallDetails from "../components/WaterfallDetails.svelte";
    import {getContext} from "svelte";
    import Navigator from "../components/Navigator.svelte";
    import Map from "../components/Map.svelte";
    import MultiMap from "../components/MultiMap.svelte";

    let selectedWaterfallId;
    let waterfallDetails = null;
    let isDetailsViewActive = true;
    let location;

    const waterfallService = getContext("WaterfallService");

    async function waterfallSelected(event) {
        selectedWaterfallId = event.detail.waterfallId;
        location = event.detail.latlng;
        if (waterfallDetails) {
            waterfallDetails.selectWaterfall(selectedWaterfallId);
        }
    }

    function setWaterfallSelected() {
        if (waterfallDetails)
            waterfallDetails.selectWaterfall(selectedWaterfallId);
    }

    $: waterfallDetails, setWaterfallSelected();

    let map;

    function moveTo(event) {
        map.moveToLocation(event.detail);
    }

    function changeState() {
        isDetailsViewActive = !isDetailsViewActive;
    }

    function markerGotSelected(event) {
        map.moveToLocation(event.detail.latlng);
        waterfallSelected(event);
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


{#if isDetailsViewActive}
    <button class="button is-primary is-light" on:click={changeState}>Multiple Maps<i
            class="fas fa-map ml-1"></i></button>
{:else}
    <button class="button is-info is-light" on:click={changeState}>Waterfall Details <i
            class="fas fa-info ml-1"></i></button>
{/if}

<div class="columns">
    <div class="column has-text-centered is-half m-3">
        <div class="box">
            {#if isDetailsViewActive}
                <Map bind:this={map} startLocation="{location}" height="300" on:activeMarker={markerGotSelected}/>
                <WaterfallDetails bind:this="{waterfallDetails}"/>
            {:else }
                <MultiMap bind:this={map} on:message={waterfallSelected}/>
            {/if}
        </div>
    </div>
    <div class="column has-text-centered m-3">
        <div class="box">
            <h1 class="title is-4">All the Waterfalls around the globe</h1>
            <WaterfallList on:selectedWaterfallId={waterfallSelected} on:location={moveTo}/>
        </div>
    </div>
</div>
