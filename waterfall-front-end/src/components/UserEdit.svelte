<script>
    import {getContext} from "svelte";
    import {isAdmin} from "../services/userUtils.js";
    import {push} from "svelte-spa-router";

    export let userid;

    export async function setUserId(userId) {
        userid = userId;
        await getUser();
    }

    let user;
    const waterfallService = getContext("WaterfallService");

    let firstName;
    let lastName;
    let email;
    let password;
    let admin;

    let errorMessages = []

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
        if (!user.firstName) {
            errorMessages.push("You need to enter a firstname!");
        }
        user.lastName = lastName.value;
        if (!user.lastName) {
            errorMessages.push("You need to enter a lastname!");
        }
        user.email = email.value;
        if (!user.email) {
            errorMessages.push("You need to enter a email address!");
        }

        if (password.value) {
            user.password = password.value;
        }
        if (adminPrivilege) {
            user.isAdmin = admin.checked;
        }

        if (errorMessages.length > 0) {
            return;
        }
        let response = await waterfallService.updateUser(user);
        errorMessages = [];
        if (response.error) {
            errorMessages.push(response.message);
        } else {
            if (adminPrivilege) {
                await push("/admin");
            }
            await push("/waterfalls");
        }
    }
</script>

{#if user}
    <form>
        <div class="box">
            <div class="field">
                <label class="label">Firstname</label>
                <div class="control">
                    <input class="input" type="text" bind:this={firstName} placeholder="firstname"
                           value={user.firstName}>
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
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" bind:this={password}
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

            {#if errorMessages.length > 0}
                <div class="message is-danger">
                    <div class="message-header">
                        <p>Error</p>
                    </div>
                    <div class="message-body">
                        {#each errorMessages as message}
                            <p>{message}</p>
                        {/each}
                    </div>
                </div>
            {/if}

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" on:click={onSubmit}>Update</button>
                </div>
            </div>
        </div>
    </form>
{/if}