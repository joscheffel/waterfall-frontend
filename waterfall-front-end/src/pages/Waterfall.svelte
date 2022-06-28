<script>
    import WaterfallForm from "../components/WaterfallForm.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import MainNavigator from "../components/MainNavigator.svelte";
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar subTitle={"Please add a new Waterfall"} title={"Waterfall Services"}/>
    </div>
    <div class="column">
        <MainNavigator/>
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