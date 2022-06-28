<script>
 import Main from "./pages/Main.svelte"
 import Login from "./pages/Login.svelte"
 import Signup from "./pages/Signup.svelte"
 import Router from "svelte-spa-router";
 import Waterfall from "./pages/Waterfall.svelte";
 import WaterfallDashboard from "./pages/WaterfallDashboard.svelte";

 let routes = {
  "/": Main,
  "/login": Login,
  "/signup": Signup,
  "/main": Main,
  "/waterfalls": Waterfall,
  "/waterfalls/dashboard": WaterfallDashboard,
  "/logout": Main
 }
</script>

<div class="container">
 <Router {routes}/>
</div>