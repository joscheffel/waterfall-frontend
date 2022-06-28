<script>
    export let params = {};
</script>

<h2>Uups, something went wrong.</h2>
<h3>Get back to the <a href="/main">main page</a></h3>
{#if params.error_message}
    <p>Error Message: </p>
    <p>{params.error_message}</p>
{/if}