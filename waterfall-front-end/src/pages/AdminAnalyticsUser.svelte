<script>
    import Navigator from "../components/Navigator.svelte";
    import TitleBar from "../components/TitleBar.svelte";
    import AnalyticsUserDetails from "../components/AnalyticsUserDetails.svelte";

    export let params;
    const userid = params.userid;

</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar title={"Waterfall Services"} subTitle={"Analyse User"}/>
    </div>
    <div class="column">
        <Navigator/>
    </div>
</div>

<AnalyticsUserDetails {userid}/>