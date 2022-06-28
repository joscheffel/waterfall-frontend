<script>
    const waterfalls = [
        {name: "Niagara Falls"},
        {name: "Other Falls"},
        {name: "More Falls"},
    ];
</script>

<div>
    {#each waterfalls as waterfall}
        <p>{waterfall.name}</p>
    {/each}
</div>