<script>
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
    import WaterfallList from "../components/WaterfallList.svelte";
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar subTitle={"Scroll through the Waterfalls ..."} title={"Waterfall Services"}/>
    </div>
    <div class="column">
        <MainNavigator/>
    </div>
</div>

<div class="columns">
    <div class="column has-text-centered">
        <p>Here could be maps</p>
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">All the Waterfalls around the globe</h1>
        <WaterfallList/>
    </div>
</div>