<template>
    <!-- tabs -->
    <div class="row text-center">
        <div class="tab">
            <button class="tablinks w-25" :class="{ 'clicked': pendingShow }" @click="openTab('pending')">Pending</button>
            <button class="tablinks w-25" :class="{ 'clicked': approvedShow }"
                @click="openTab('approved')">Approved</button>
                <button class="tablinks w-25" :class="{ 'click': statsShow }" @click="openTab('stats')">Stats</button>
        </div>

        <!-- pending content -->
        <div v-if="pendingShow" class="tabcontent">
            <h3>Pending</h3>
            <div class="card">
                <DataTable :value="products" tableStyle="min-width: 50rem">
                    <Column field="id" header="ID"></Column>
                    <Column field="image" header="Image"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="price" header="Price"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>
            </div>
        </div>

        <!-- approved content -->
        <div v-if="approvedShow" class="tabcontent">
            <h3>Approved</h3>
            <div class="card">
                <DataTable :value="products" tableStyle="min-width: 50rem">
                    <Column field="id" header="ID"></Column>
                    <Column field="image" header="Image"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="price" header="Price"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>
            </div>
        </div>

        <!-- stats content -->
        <div v-if="statsShow" class="tabcontent">
            <h1>stats</h1>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pendingShow: true,
            approvedShow: false,
            statsShow: false,
            products: null,
        }
    },
    methods: {
        openTab(word) {
            // console.log('openTab');
            if (word == "pending") {
                this.pendingShow = true;
                this.approvedShow = false;
                this.statsShow = false;
            }
            else if (word == "approved") {
                this.pendingShow = false;
                this.approvedShow = true;
                this.statsShow = false;
            } else {
                this.pendingShow = false;
                this.approvedShow = false;
                this.statsShow = true;
            }
        },
    },

}
</script>

<style scoped>
.clicked {
    background-color: #ddd;
}

.tablinks {
    border: 1px solid black;
    margin: 0;
    color: black;
    font-weight: 600;
    font-size: 1.2rem;
    cursor: pointer;
    transition: 0.3s;

}

/* Style the tab */
.tab {
    overflow: hidden;
    border: 1px solid white;
    border-bottom: none;
    /* background-color: #f1f1f1; */

}

/* Style the buttons inside the tab */
.tab button {
    /* background-color: inherit; */
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
    background-color: #ddd;
}

/* Style the tab content */
.tabcontent {
    padding: 10dvh;
    border: 1px solid #fffefe;
    border-top: none;
    margin-bottom: 5dvh;
}

@media (max-width: 768px) {

    * {
        font-size: 10px;
    }

    .tab button {
        font-size: 12px;
    }

}
</style>