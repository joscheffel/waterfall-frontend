<script>
    import {getUserId, isAdmin, isAuthenticated} from "../services/userUtils.js";

    let authenticated = false;
    let admin = false;
    let userid;

    checkAuthentication();

    async function checkAuthentication() {
        authenticated = await isAuthenticated();
        admin = await isAdmin();
        userid = await getUserId();
    }
</script>

{#if authenticated}
    <div class="box has-text-centered is-centered columns m-2">
        <a href="/#/waterfalls" class="column is-2">
            <i class="fas fa-plus fa-2x" style="color:rgb(153, 196, 74)"></i>
        </a>
        <a href="/#/waterfalls/dashboard" class="column is-2">
            <i class="fas fa-th-list fa-2x" style="color:rgb(63, 122, 139)"></i>
        </a>
        {#if admin}
            <a href="/#/admin" class="column is-2">
                <i class="fas fa-users-cog fa-2x" style="color:rgb(190,82,49)"></i>
            </a>
        {/if}
        {#if userid}
            <a href="/#/users/{userid}" class="column is-2">
                <i class="fas fa-user-edit fa-2x" style="color:rgb(70,81,156)"></i>
            </a>
        {/if}
        <a href="/#/logout" class="column is-2">
            <i class="fas fa-sign-out-alt fa-2x" style="color:rgb(156, 70, 128)"></i>
        </a>
    </div>
{:else }
    <div class="box has-text-centered is-centered columns m-2">
        <a href="/#/signup" class="column is-2">
            <i class="fas fa-user-cog fa-2x" style="color:rgb(63, 160, 155)"></i>
        </a>
        <a href="/#/login" class="column is-2">
            <i class="fas fa-user-edit fa-2x" style="color:green" title="Log in"></i>
        </a>
    </div>
{/if}