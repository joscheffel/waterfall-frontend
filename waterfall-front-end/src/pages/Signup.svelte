<script>
    import TitleBar from "../components/TitleBar.svelte";
    import SignupForm from "../components/SignupForm.svelte";
    import Navigator from "../components/Navigator.svelte";
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
    <div class="column has-text-centered">
        <p>Here could be a teaser picture</p>
    </div>
</div>