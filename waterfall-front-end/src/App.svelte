<script>
    import Main from "./pages/Main.svelte"
    import Login from "./pages/Login.svelte"
    import Signup from "./pages/Signup.svelte"
    import Router from "svelte-spa-router";
    import {wrap} from 'svelte-spa-router/wrap'
    import Waterfall from "./pages/Waterfall.svelte";
    import WaterfallDashboard from "./pages/WaterfallDashboard.svelte";
    import {WaterfallService} from "./services/WaterfallService.js";
    import {setContext} from "svelte";
    import {validateAdmin, validateAuthentication} from "./services/userUtils.js";
    import Error from "./pages/Error.svelte";
    import Admin from "./pages/Admin.svelte";

    let routes = {
        "/": Main,
        "/login": Login,
        "/signup": Signup,
        "/main": Main,
        "/logout": Main,
        "/error/:error_message?": Error,
        "/waterfalls": wrap({
            component: Waterfall,
            conditions: [validateAuthentication]
        }),
        "/waterfalls/dashboard": wrap({
            component: WaterfallDashboard,
            conditions: [validateAuthentication]
        }),
        "/admin/": wrap({
            component: Admin,
            conditions: [validateAuthentication, validateAdmin],
        })
    }

    setContext("WaterfallService", new WaterfallService("http://localhost:4000"));
</script>

<div class="container">
    <Router {routes}/>
</div>