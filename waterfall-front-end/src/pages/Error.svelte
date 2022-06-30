<script>
    import Navigator from "../components/Navigator.svelte";
    import TitleBar from "../components/TitleBar.svelte";

    export let params = {};
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar title={"Waterfall Services"} subTitle={"An Error Occurred"}/>
    </div>
    <div class="column">
        <Navigator/>
    </div>
</div>

<div class="box is-centered">
<h2 class="title is-3">Uups, something went wrong.</h2>
<h3 class="subtitle is-4">Get back to the <a href="/main">main page</a></h3>
{#if params.error_message}
    <p class="is-italic">Error Message: <span class="is-uppercase">{params.error_message}</span></p>
{/if}
</div>