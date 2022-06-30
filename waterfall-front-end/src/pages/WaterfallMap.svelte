<script>
    import TitleBar from "../components/TitleBar.svelte";
    import Navigator from "../components/Navigator.svelte";
    import Map from "../components/Map.svelte";
</script>

<div class="columns is-vcentered">
    <div class="column is-one-thirds">
        <TitleBar title={"Waterfall Services"} subTitle={"Map of Waterfalls"}/>
    </div>
    <div class="column">
        <Navigator/>
    </div>
</div>

<Map/>