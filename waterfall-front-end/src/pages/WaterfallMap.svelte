<script>
    import TitleBar from "../components/TitleBar.svelte";
    import Navigator from "../components/Navigator.svelte";
    import MultiMap from "../components/MultiMap.svelte";
</script>

<div class="columns is-vcentered">
    <div class="column is-one-thirds">
        <TitleBar title={"Waterfall Services"} subTitle={"Map of Waterfalls"}/>
    </div>
    <div class="column">
        <Navigator/>
    </div>
</div>

<MultiMap/>