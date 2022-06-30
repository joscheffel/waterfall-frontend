<script>
    import TitleBar from "../components/TitleBar.svelte";
    import Navigator from "../components/Navigator.svelte";
    import UserEdit from "../components/UserEdit.svelte";
    import {isUserItselfOrAdmin} from "../services/userUtils.js";
    import {push} from "svelte-spa-router";

    export let params;
    let userid;
    let userEdit;
    setUserId();

    $: params, setUserId();


    async function setUserId() {
        userid = params.userid;
        if(userEdit) {
            userEdit.setUserId(userid);
        }
    }


    redirectForbiddenUsers();

    async function redirectForbiddenUsers() {
        const allowed = await isUserItselfOrAdmin(userid);
        if (!allowed) {
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

{#if userid}
    <UserEdit bind:this={userEdit} {userid}/>
{/if}