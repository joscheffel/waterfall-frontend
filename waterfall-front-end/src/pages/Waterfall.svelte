<script>
    import WaterfallForm from "../components/WaterfallForm.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import Navigator from "../components/Navigator.svelte";
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
        <p>Here could be a map at a later point </p>
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Create a Waterfall</h1>
        <WaterfallForm/>
    </div>
</div>