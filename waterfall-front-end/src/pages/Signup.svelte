<script>
    import TitleBar from "../components/TitleBar.svelte";
    import SignupForm from "../components/SignupForm.svelte";
    import Navigator from "../components/Navigator.svelte";
    import niagaraFallsNight from "/src/assets/niagaraFallsNight.jpg";
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
        <div class="box">
            <h1 class="title">Signup</h1>
            <SignupForm/>
        </div>
    </div>
    <div class="column">
        <div class="box m-2">
            <h2 class="subtitle is-4 m-2">Niagara Falls by Nightfall</h2>
            <img src="{niagaraFallsNight}">
            <span class="tag is-light"><i class="fas fa-camera m-2"></i> by J. Scheffel</span>
        </div>
    </div>
</div>