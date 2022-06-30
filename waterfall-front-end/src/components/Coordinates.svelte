<script>
    export let lat = 0.0;
    export let lng = 0.0;
</script>

<div class="columns">
    <div class="column">
        <div class="field">
            <label class="label">Latitude</label>
            <div class="control">
                <input class="input" type="float" placeholder="76.54321" bind:value={lat}>
            </div>
        </div>
    </div>

    <div class="column">
        <div class="field">
            <label class="label">Longitude</label>
            <div class="control">
                <input class="input" type="float" placeholder="-12.34567" bind:value={lng}>
            </div>
        </div>
    </div>
</div>