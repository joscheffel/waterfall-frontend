<script>
    import TitleBar from "../components/TitleBar.svelte";
    import Navigator from "../components/Navigator.svelte";
    import {isUserItselfOrAdmin} from "../services/userUtils.js";
    import {push} from "svelte-spa-router";
    import {getContext} from "svelte";
    import WaterfallForm from "../components/WaterfallForm.svelte";

    export let params;
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
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar title={"Waterfall Services"} subTitle={"Edit Waterfall"}/>
    </div>
    <div class="column">
        <Navigator/>
    </div>
</div>

<WaterfallForm waterfallid={waterfallid}/>