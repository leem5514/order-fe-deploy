<template>

    <v-container>
        <v-row justify="center">
            <!--화면크기가 small 이상(스마트폰, 태블릿)일 때 : sm -->
            <!-- 화면크기가 medium 이상(데스크탑)일 때 : md -->
            <v-col cols="12" sm="2" md="4">
                <v-card>
                    <v-card-title class="text-h5 text-center">로그인</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="doLogin">

                            <v-text-field label="email" v-model="email" type="email" prepend-icon="mdi-email" required>
                            </v-text-field>
                            <v-text-field label="비밀번호" v-model="password" type="password" required
                                prepend-icon="mdi-lock">
                            </v-text-field>
                            <v-row>
                                <v-col>
                                    <v-btn color="red" block @click="showPassWordModal">비밀번호 변경</v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn type="submit" color="primary" block>로그인</v-btn>
                                </v-col>

                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- resetPassword가 true가 될 째 해당 모달창이 보여짐 -->
        <!-- @update:dialog는 modal 컴포넌트가 update:dialog라는 이벤트를 발생시킬 때 실행할 이벤트 핸들러를 정의함 -->
        <!-- $event는 자식요소로부터 전달된 값: true/false가 모달로부터 전달 -->
        <ResetPasswordModal v-model="resetPassword" @update:dialog="resetPassword = $event"></ResetPasswordModal>
    </v-container>
</template>

<script>
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import ResetPasswordModal from './ResetPasswordModal.vue'

export default {
    components: {
        ResetPasswordModal
    },
    data() {
        return {
            email: "",
            password: "",
            resetPassword: false
        }
    },
    methods: {
        async doLogin() {
            // try catch로 묶어서 Login성공시 token을 console.log로 출력
            try {
                const loginData = {
                    email: this.email,
                    password: this.password
                }

                const response = await axios.post(`${process.env.VUE_APP_API_BASIC_URL}/doLogin`, loginData);
                const token = response.data.result.token;
                const refreshToken = response.data.result.refreshToken;
                const role = jwtDecode(token).role;
                localStorage.setItem('token', token)
                localStorage.setItem('refreshToken', refreshToken)
                localStorage.setItem('role', role)
                
                // this.$router.push("/")
                // sse 을 위한 연결코드
                

                window.location.href = "/"

            } catch (e) {
                const error_message = e.response.data.error_message
                console.error(error_message);
                alert(error_message);
            }
        },
        showPassWordModal() {
            this.resetPassword = true;
        }

    }
}
</script>