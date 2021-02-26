<template>
    <div class="flex">
        <div class="leftNav"></div>
        <div class="leftBiasNav"></div>
        <div class="middleNav"></div>
        <div class="rightBiasNav"></div>
        <div class="rightNav"></div>
    </div>
</template>

<script>
export default {
    name: 'NavigationBar'
};
</script>

<style>
.leftNav {
    width: 15%;
    height: 50%;
    border-bottom: 1px solid #333;
}

.leftBiasNav {
    align-self: flex-end;
    width: 15%;
    height: 50%;
    border-bottom: 1px solid #333;
    transform: rotate(12deg);
    transform-origin: right;
}

.middleNav {
    width: 40%;
    height: 100%;
    border-bottom: 1px solid #333;
}

.rightBiasNav {
    align-self: flex-end;
    width: 15%;
    height: 50%;
    border-bottom: 1px solid #333;
    transform: rotate(-12deg);
    transform-origin: left;
}

.rightNav {
    width: 15%;
    height: 50%;
    border-bottom: 1px solid #333;
}
</style>