<script>
    import {user} from "../stores.js";

    export let title = "";
    export let subTitle = "";
</script>

<div class="box has-text-centered columns m-2">
    <div class="column">
        <i class="fas fa-water fa-3x" style="color:rgb(46,49,220)"></i>
    </div>
    <div class="column">
        <div class="title is-5"> {title} </div>
        <div class="subtitle is-5"> {subTitle} </div>
    </div>
    <div class="column">
        <i class="fas fa-water fa-3x" style="color:rgb(46,49,220)"></i>
        {#if $user.email}
            <div class="is-size-7">{$user.email} </div>
        {:else}
            <div class="is-size-7">Waterfall-Svelte 0.1.0</div>
        {/if}
    </div>
</div>