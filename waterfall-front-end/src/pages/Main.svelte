<script>
    import TitleBar from "../components/TitleBar.svelte";
    import {getContext} from "svelte";
    import Navigator from "../components/Navigator.svelte";

    const waterfallService = getContext("WaterfallService");
    waterfallService.logout();
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar title={"Waterfall Services"} subTitle={"Sign up or Log in"}/>
    </div>
    <div class="column">
        <Navigator/>
    </div>
</div>

<div class="columns is-vcentered content">
    <div class="column has-text-centered">
        <p>Here could be a teaser picture</p>
    </div>
    <div class="column">
        <h1 class="title">Let's collect and document all Waterfalls around the globe</h1>
        <p>In this application you can add, update or scroll through waterfalls.</p>
    </div>
</div>