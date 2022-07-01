<script>
    import TitleBar from "../components/TitleBar.svelte";
    import Navigator from "../components/Navigator.svelte";
    import {isUserItselfOrAdmin} from "../services/userUtils.js";
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";
    import WaterfallForm from "../components/WaterfallForm.svelte";
    import Map from "../components/Map.svelte";

    export let params;
    let waterfallForm;
    let waterfallMap;
    const waterfallid = params.waterfallid;
    let waterfall;
    const waterfallService = getContext("WaterfallService");

    redirectForbiddenUsers();
    async function redirectForbiddenUsers(){
        waterfall = await waterfallService.getWaterfallDetails(waterfallid);
        const allowed = isUserItselfOrAdmin(waterfall.userid);
        if(!allowed){
            await push("/error/forbidden");
        }
    }

    function waterfallChanged(event){
        const waterfall = event.detail.waterfall;
        waterfallMap.changeMarkerLocation(waterfall._id, {lat: waterfall.location.lat, lng: waterfall.location.long});
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
        <TitleBar title={"Waterfall Services"} subTitle={"Edit Waterfall"}/>
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
        <WaterfallForm bind:this={waterfallForm} on:message={waterfallChanged} on:moveToLocation={moveTo}
                       on:getCenter={getCurrentLocation} waterfallid={waterfallid} title="Edit a Waterfall"/>
    </div>
</div>