<script>
    import {createEventDispatcher, getContext, onMount} from "svelte";
    import {push} from "svelte-spa-router";
    import MultipleTypeChart from "./MultipleTypeChart.svelte";

    const dispatch = createEventDispatcher();

    let selectedUserId = null;
    let userList;
    let userFilterList = [];

    const userSelectPossibilities = ["All", "User", "Admin"];
    let appliedFilter = "";
    let userSelect;

    let analyticsAdmin = {num: 0, cumPwdLength: 0};
    let analyticsUser = {num: 0, cumPwdLength: 0};

    let privilegeDistributionData;
    let averagePwdLength;

    const waterfallService = getContext("WaterfallService");

    function analyseData() {
        analyticsAdmin = {num: 0, cumPwdLength: 0};
        analyticsUser = {num: 0, cumPwdLength: 0};

        userList.forEach(user => {
            if (user.scope === "admin") {
                analyticsAdmin.num += 1;
                analyticsAdmin.cumPwdLength += user.passwordLength;
            } else {
                analyticsUser.num += 1;
                analyticsUser.cumPwdLength += user.passwordLength;
            }
        });
        privilegeDistributionData = {
            labels: ["Admin", "User"],
            datasets: [
                {
                    values: [analyticsAdmin.num, analyticsUser.num],
                }
            ]
        };
        const averageAdminPwdLength = analyticsAdmin.cumPwdLength / analyticsAdmin.num;
        const averageUserPwdLength = analyticsUser.cumPwdLength / analyticsUser.num;
        const averageAllPwdLength = (analyticsAdmin.cumPwdLength + analyticsUser.cumPwdLength) / (analyticsAdmin.num + analyticsUser.num);

        averagePwdLength = {
            labels: ["All", "Admin", "User"],
            datasets: [
                {
                    values: [averageAllPwdLength, averageAdminPwdLength, averageUserPwdLength],
                }
            ]
        };
    }

    onMount(async () => {
            userList = await waterfallService.getUserAnalyticsList();
            filterApplied();
            analyseData();
        }
    );

    function clicked(user) {
        push("/admin/" + user._id);
    }

    function filterApplied() {
        const userFilter = userSelect.options[userSelect.selectedIndex].value;

        userFilterList = userList.filter(user => {
            let filterBool = true;
            if (userFilter !== "All") {
                if (user.scope.toUpperCase() !== userFilter.toUpperCase()) {
                    filterBool = false;
                }
            }
            return filterBool;
        });
    }

</script>

<div class="columns is-centered">

    <div class=" column is-2 m-2">
        <div class="box">
            <div class="level-item m-3">
                <p class="subtitle is-size-4 is-italic">Filter users</p>
            </div>
            <div class="level-item m-2">
                <p class="subtitle is-5">Scope</p>
            </div>
            <div class="level-item m-2">
                <div class="control has-icons-left">
                    <div class="select is-primary">
                        <select bind:this={userSelect}>
                            {#each userSelectPossibilities as possibility}
                                <option>{possibility}</option>
                            {/each}
                        </select>
                        <span class="icon is-small is-left">
                            <i class="fas fa-user-lock"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="level-item m-2">
                <button class="button is-primary is-light " on:click={filterApplied}>Apply filters</button>
            </div>
        </div>
    </div>

    <div class="column is-6 m-2">
        <div class="box">
            {#if Object.keys(userFilterList).length === 0}
                <p><i class="far fa-folder-open"/> <span>No users found for these filters</span></p>
            {:else}
                <div class="table-container">
                    <table class="table is-fullwidth">
                        <thead>
                        <th>Name</th>
                        <th>Scope</th>
                        </thead>
                        <tbody>
                        {#each userFilterList as user}
                            <tr on:click={clicked(user)}>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    {#if user.scope === "admin"}
                                        <span class="tag is-danger is-uppercase">{user.scope}</span>
                                    {:else }
                                        <span class="tag is-primary is-uppercase">{user.scope}</span>
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            {/if}
        </div>
    </div>

    <div class="column is-3 m-2">
        <MultipleTypeChart title="Privilege Proportion" data={privilegeDistributionData} type="pie"/>
        <MultipleTypeChart title="Average Password Length" data={averagePwdLength} type="bar"/>
    </div>
</div>