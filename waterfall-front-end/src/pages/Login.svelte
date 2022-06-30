<script>
  import TitleBar from "../components/TitleBar.svelte";
  import LoginForm from "../components/LoginForm.svelte";
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
  <div class="column has-text-centered">
    <p>Here could be a teaser picture</p>
  </div>
  <div class="column">
    <div class="box">
      <h1 class="title">Login</h1>
      <LoginForm/>
    </div>
  </div>
</div>