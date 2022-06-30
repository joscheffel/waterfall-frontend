<script>
    import UserList from "../components/UserList.svelte";
    import Navigator from "../components/Navigator.svelte";
    import TitleBar from "../components/TitleBar.svelte";
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar title={"Waterfall Services"} subTitle={"Administrate & Analyse Users"}/>
    </div>
    <div class="column">
        <Navigator/>
    </div>
</div>

<UserList/>