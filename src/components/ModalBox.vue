
<template>
    <teleport to="#modal">
        <div id="center" v-if="isOpen">
            <h2><slot>this is a modal</slot></h2>
            <button @click="buttonClick">关闭</button>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        isOpen: Boolean, // default: false. set to true to open it. 描述是否显示窗口，默认为false。是
    },
    emits: {
        "close-modal": null,
    },
    setup(props, context) {
        const buttonClick = () => {
            context.emit("close-modal");
        };
        return {
            buttonClick,
        };
    },
});
</script>

<style>
#center {
    width: 200px;
    height: 200px;
    border: 2px solid black;
    background: white;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
}
</style>