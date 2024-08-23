<template>
    <v-app-bar app dark>
        <v-container>
            <v-row align="center">

                <v-col class="d-flex justify-start">
                    <div v-if="userRole == 'ADMIN'">
                        <v-btn :to="{ path: '/member/list' }">회원관리</v-btn>
                        <v-btn :to="{ path: '/product/manage' }">상품관리</v-btn>
                        <v-btn href='/order/list'>실시간 주문({{ liveQuantity }})</v-btn>
                    </div>
                </v-col>

                <v-col class="text-center">
                    <v-btn :to="{ path: '/' }">java shop 변경 1</v-btn>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn v-if="isLogin" :to="{ path: '/order/cart' }">장바구니({{ getCartItemCount }})</v-btn>
                    <v-btn :to="{ path: '/product/list' }">상품목록</v-btn>
                    <v-btn v-if="isLogin" :to="{ path: '/mypage' }">MyPage</v-btn>
                    <v-btn v-if="!isLogin" :to="{ path: '/member/create' }">회원가입</v-btn>
                    <v-btn v-if="!isLogin" :to="{ path: '/login' }">로그인</v-btn>
                    <v-btn v-if="isLogin" @click="doLogout">로그아웃</v-btn>
                </v-col>
            </v-row>

        </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
// 서버와 실시간 알림서비스를 위한 의존성 추가 필요
import { EventSourcePolyfill } from 'event-source-polyfill';

export default {
    data() {
        return {
            userRole: null,
            isLogin: false,
            liveQuantity:0
        }
    },
    computed: {
        ...mapGetters(['getCartItemCount'])
    },
    created() {
        const token = localStorage.getItem("token")
        if (token) {
            this.isLogin = true;
            this.userRole = localStorage.getItem("role");
        }
        //SSemitter
        // 알림의 경우 새로고침을 하면 사라지는 이슈 발생 -> localstorage 에 넣으면 해결 가능
        if(this.userRole === 'ADMIN') {
            let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASIC_URL}/subscribe`, {headers: {Authorization: `Bearer ${token}`}});
            sse.addEventListener('connect', (event) => { console.log(event) })
            sse.addEventListener('ordered', (event) => {
                 console.log(event.data) 
                 this.liveQuantity ++;
                })
            sse.oneerror = (error) => {
                console.log(error);
                sse.close();
            }
        }
    },
    methods: {
        doLogout() {
            localStorage.clear();
            window.location.reload();
        }
    }
};
</script>
