<script>
    import {getContext} from "svelte";
    import {isAdmin} from "../services/userUtils.js";

    export let userid;
    let user;
    const waterfallService = getContext("WaterfallService");

    let firstName;
    let lastName;
    let email;
    let password;
    let admin;

    let adminPrivilege;
    getUser();
    checkWhetherAdminPrivilege();


    async function getUser() {
        user = await waterfallService.getUserDetails(userid);
    }

    async function checkWhetherAdminPrivilege() {
        adminPrivilege = await isAdmin();
    }

    async function onSubmit() {
        user.firstName = firstName.value;
        user.lastName = lastName.value;
        user.email = email.value;
        if (password.value) {
            user.password = password.value;
        }
        if (adminPrivilege) {
            user.isAdmin = admin.checked;
        }
        await waterfallService.updateUser(user);
    }
</script>

{#if user}
    <div class="box">
        <div class="field">
            <label class="label">Firstname</label>
            <div class="control">
                <input class="input" type="text" bind:this={firstName} placeholder="firstname" value={user.firstName}>
            </div>
        </div>

        <div class="field">
            <label class="label">Lastname</label>
            <div class="control">
                <input class="input" type="text" bind:this={lastName} placeholder="lastname" value={user.lastName}>
            </div>
        </div>

        <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="email" bind:this={email} placeholder="Email input" value={user.email}>
                <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
            </span>
            </div>
        </div>

        <div class="field">
            <label class="label">Lastname</label>
            <div class="control">
                <input class="input" type="text" bind:this={password}
                       placeholder="Only enter password if you want to change it">
            </div>
        </div>

        {#if adminPrivilege}
            <div class="field">
                <div class="control">
                    <label class="checkbox">
                        <input type="checkbox" bind:this={admin} checked={user.isAdmin}>
                        is Admin
                    </label>
                </div>
            </div>
        {/if}

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" on:click={onSubmit}>Submit</button>
            </div>
        </div>
    </div>
{/if}