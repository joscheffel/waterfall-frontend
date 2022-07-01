<script>
    import Chart from "svelte-frappe-charts";
    import {onMount} from "svelte";

    export let type = "bar";
    export let data = {
        labels: ["Peter", "Hannah", "Jan"],
        datasets: [
            {
                values: [5, 8, 3],
            }
        ]
    };
    export let title;

    let visualData = {labels: [], datasets: []};

    let checkboxes = [];
    let types = ["bar", "pie"];
    let typeSelect;
    let unique = {};

    onMount(() => {
        initValues();
        typeSelect.value = type;
    });

    $: data, initValues();

    function initValues() {
        checkboxes = [];
        data.labels.forEach(label => {
            checkboxes.push({checked: true, label: label});
        });

        setChecks();
        updateData();
        unique = {};
    }

    function changeType(event) {
        const selectedType = typeSelect.options[typeSelect.selectedIndex].value;
        type = selectedType;
        unique = {};
    }

    function setChecks(event) {
        checkboxes.forEach(checkbox => {
        });
        unique = {};
    }

    function updateData(event) {
        visualData.labels = [];
        visualData.datasets = [];
        const values = [];
        for (let i = 0; i < checkboxes.length; i += 1) {
            if (checkboxes[i].checked) {
                visualData.labels.push(data.labels[i]);
                values.push(data.datasets[0].values[i]);
            }
        }
        visualData.datasets.push({values});
        unique = {};
    }
</script>


<div class="box">
    <h2 class="title is-6 has-text-centered">{title}</h2>
    <div class="select is-primary">
        <select bind:this={typeSelect} on:change={changeType}>
            {#each types as type}
                <option>{type}</option>
            {/each}
        </select>
    </div>
    {#key unique}
        <Chart data={visualData} type="{type}"/>
        <div>
            <h4 class="subtitle is-6">Filter results</h4>
            {#each checkboxes as checkbox}
                <label class="checkbox m-2">
                    <input type="checkbox" bind:checked={checkbox.checked} on:change={updateData}>
                    {checkbox.label}
                </label>
            {/each}
        </div>
    {/key}

</div>

