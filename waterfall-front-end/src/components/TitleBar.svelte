<script>
    import {user} from "../stores.js";

    export let title = "";
    export let subTitle = "";
</script>

<div class="box has-text-centered columns m-2">
    <div class="column">
        <i class="fab fa-github fa-2x has-text-info"></i>
        <div class="is-size-7"><a href="https://github.com/joscheffel/waterfall-backend" class="has-text-grey is-underlined">SERVER</a> & <a
                href="https://github.com/joscheffel/waterfall-front-end" class="has-text-grey is-underlined">UI</a>
        </div>
    </div>
    <div class="column">
        <div class="title is-5"> {title} </div>
        <div class="subtitle is-5"> {subTitle} </div>
    </div>
    <div class="column">
        <i class="fab fa-skyatlas fa-2x has-text-info"></i>
        {#if $user.email}
            <div class="is-size-7">{$user.email} </div>
        {:else}
            <div class="is-size-7">UI Version 0.4.0</div>
        {/if}
    </div>
</div>