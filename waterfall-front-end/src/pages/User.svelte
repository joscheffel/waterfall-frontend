<script>
    import TitleBar from "../components/TitleBar.svelte";
    import Navigator from "../components/Navigator.svelte";
    import UserEdit from "../components/UserEdit.svelte";
    import {isUserItselfOrAdmin} from "../services/userUtils.js";
    import {push} from "svelte-spa-router";

    export let params;
    const userid = params.userid;
    redirectForbiddenUsers();
    async function redirectForbiddenUsers(){
        const allowed = isUserItselfOrAdmin(userid);
        if(!allowed){
            await push("/error/forbidden");
        }
    }
</script>

<div class="columns is-vcentered">
    <div class="column is-two-thirds">
        <TitleBar title={"Waterfall Services"} subTitle={"Edit User"}/>
    </div>
    <div class="column">
        <Navigator/>
    </div>
</div>

<UserEdit {userid}/>