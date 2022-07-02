<script>
    import TitleBar from "../components/TitleBar.svelte";
    import LoginForm from "../components/LoginForm.svelte";
    import Navigator from "../components/Navigator.svelte";
    import niagaraFallsDay from "/src/assets/niagaraFallsDay.jpg";
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar title={"Waterfall Services"} subTitle={"Sign up or Log in"}/>
    </div>
    <div class="column">
        <Navigator/>
    </div>
</div>

<div class="columns">
    <div class="column">
        <div class="box m-2">
            <h2 class="subtitle is-4 m-2">Niagara Falls by Daylight</h2>
            <img src="{niagaraFallsDay}">
            <span class="tag is-light"><i class="fas fa-camera m-2"></i> by J. Scheffel</span>
        </div>
    </div>
    <div class="column m-2">
        <div class="box">
            <h1 class="title">Login</h1>
            <LoginForm/>
        </div>
    </div>
</div>