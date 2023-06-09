<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <!-- {{ count }}
    {{ double }} -->
        <!-- <ul>
        <li v-for="number in numbers" :key="number">{{ number }}</li>
    </ul> -->
        <!-- <button @click="openModal">打开</button> -->
        <ModalBox :isOpen="modalIsOpen" @close-modal="onMoadlClose"
            >my modal !!!!</ModalBox
        >
        <!-- {{ person.name }} -->
        <!-- <h1>X:{{ x }}</h1>
    <h1>Y:{{ y }}</h1> -->
        <!-- <button @click="increase">+1</button>
    <button @click="ipdataGerrting">+1</button> -->
        <!-- <h1 v-if="loading">加装中....</h1> -->
        <Suspense>
            <template #default>
                <div>
                    <async-show />
                    <dog-show />
                </div>
            </template>
            <template #fallback>
                <p>loading......</p>
            </template>
        </Suspense>

        <!-- <img v-if="loaded" :src="resule[0].url" /> -->
    </div>
</template>

<script lang="ts">
import {
    ref,
    computed,
    reactive,
    toRefs,
    onUpdated,
    onRenderTriggered,
    watch,
    onMounted,
    onUnmounted,
} from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
import ModalBox from "./components/ModalBox.vue";
import AsyncShow from "./components/AsyncShow.vue";
import DogShow from "./components/DogShow.vue";
interface DataProps {
    count: number;
    double: number;
    increase: () => void;
    numbers: number[];
    person: { name?: string };
}
interface DogResult {
    message: string;
    status: string;
}
interface CatResult {
    id: string;
    url: string;
    width: number;
    height: number;
}
export default {
    name: "App",
    components: {
        ModalBox,
        AsyncShow,
        DogShow,
    },
    setup() {
        onUpdated(() => {
            console.log("updated");
        });
        onRenderTriggered((event) => {
            console.log(event);
        });
        const data: DataProps = reactive({
            count: 0,
            increase: () => {
                data.count++;
            },
            double: computed(() => data.count * 2),
            numbers: [0, 1, 2],
            person: { name: "Joe" },
        });

        data.numbers[0] = 5;
        data.person.name = "v";
        const refData = toRefs(data);
        const greetiongs = ref("");
        const ipdataGerrting = () => {
            greetiongs.value += "Hello! ";
        };

        watch([greetiongs, () => data.count], (newValue, oldValue) => {
            console.log(newValue);
            console.log(oldValue);
            document.title = "updated" + greetiongs.value + data.count;
        });

        const { x, y } = useMousePosition();
        const { resule, loading, loaded } = useURLLoader<CatResult[]>(
            // "https://dog.ceo/api/breeds/image/random"
            "https://api.thecatapi.com/v1/images/search?limit=1"
        );
        watch(resule, () => {
            if (resule.value) {
                console.log(resule.value[0].url);
            }
        });
        const modalIsOpen = ref(false);
        const openModal = () => (modalIsOpen.value = true);
        const onMoadlClose = () => (modalIsOpen.value = false);
        return {
            ...refData,
            greetiongs,
            ipdataGerrting,
            x,
            y,
            resule,
            loading,
            loaded,
            modalIsOpen,
            openModal,
            onMoadlClose,
        };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
