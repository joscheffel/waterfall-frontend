<script>
    import {createEventDispatcher, getContext, onMount} from "svelte";
    import {push} from "svelte-spa-router";

    const dispatch = createEventDispatcher();

    let selectedUserId = null;
    let userList;
    let userFilterList = [];

    const userSelectPossibilities = ["All", "User", "Admin"];
    let appliedFilter = "";
    let userSelect;

    const waterfallService = getContext("WaterfallService");

    onMount(async () => {
            userList = await waterfallService.getUserAnalyticsList();
            filterApplied();
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
    <div class="box column is-6 m-2">
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

    <div class="box column is-2 m-2">
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