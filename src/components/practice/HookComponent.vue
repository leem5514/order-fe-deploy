<template>

    <h1>생명 주기 함수</h1>
    <p>{{ data1 }}</p>
    <p>{{ data2 }}</p>
    <p>{{ data3 }}</p>
</template>


<script>
export default {
    data() {
        return {
            data1: "변경될 데이터1",
            data2: "변경될 데이터2",
            data3: "변경될 데이터3",

        }
    },
    // 화면이 열리기 전(vue인스턴스가 생성되기 이전)에 실행되는 함수
    // 데이터를 axios로 먼저 받아오는 경우에 많이 사용
    // axios를 통해 데이터를 먼저 받아오고 데이터를 화면에 나타낼 때 원한는 데이터로 수정해서 보여줌
    created() {
        this.data2 = "변경된 데이터2"
    },
    beforeMount() {
        window.addEventListener('resize', this.resize);
    },
    // vue 컴포넌트들이 DOM에 마운트 된 이후(화면이 모두 그려진 이후)에 실행되는 함수
    mounted() {
        console.log("화면이 그려진 이후에 출력")
        this.data3 = "변경된 데이터3"
    },
    // 컴퓨넌트가 화면에서 제거될 때 아래 함수 실행, beforeDestory로 사용하기도 함
    // 웹소켓, sse연결 등 서버와의 연결을 끊어주고 나가야하는 시점
    beforeUnmount() {
        window.removeEventListener("resize", this.resize)
    },
    methods: {
        resize() {
            alert("화면의 배율이 변경되고 있습니다.")
        }

    }
}
</script>