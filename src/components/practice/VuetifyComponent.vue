<template>
    <v-app-bar>app
        네이게이션 바
    </v-app-bar>

    <!-- v-container, v-row, v-col -->
    <v-container>
        <v-row>
            <v-col cols="4">
                hello world1
            </v-col>
            <v-col cols="5">
                hello world2
            </v-col>
        </v-row>
        <v-row>
            <!-- v-card:회원가입하거나 로그인할 때 많이 사용 -->
            <v-card>
                <!-- card-title(제목), card-text(내용) -->
                <v-card-title>안내문구</v-card-title>
                <v-card-text>안녕하세요</v-card-text>
            </v-card>
        </v-row>
        <v-row>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>홍길동1</th>
                        <th>hong1@naver.com</th>
                    </tr>
                    <tr>
                        <th>홍길동2</th>
                        <th>hong2@naver.com</th>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-row>
        <v-row>

        </v-row>
    </v-container>
    <v-card>
        <v-card-title>회원가입</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field label="email" type="email" />
                <v-text-field label="name" type="text" />
                <v-text-field label="password" type="password" />
                <v-btn color="primary">제출</v-btn>
            </v-form>
        </v-card-text>
    </v-card><br><br>

    <v-btn @click.stop="cancel()">취소버튼</v-btn>
    <!-- 모달창을 위한 v-dialog -->
    <v-dialog v-model="dialog" max-withd="400px">
        <v-card>
            <v-card-title>정말 취소하시겠습니까?</v-card-title>
            <v-card-actions>
                <v-btn>확인</v-btn>
                <v-btn @click="dialog = false">취소</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- 1. 실시간으로 데이터가 변경되고 있는 상황에서는 페이지가 reload가 되어야 데이터를 받아올 수 있음 : create함수 호출-->
    <!-- 2. 서버로부터 데이터를 받아오는 경우아 아니라면 이 방법이 효율적 -->
    <!-- html화면상에서 이동하는 방법 -->
    <v-btn href="/practice/modeling">일반 라우팅/ 화면을 전체 reload</v-btn>
    <v-btn :to="{ path: '/practice/modeling' }">Single Page Rounter(SPA)/ 라우터 기능 활용</v-btn>
    <v-btn :to="{ name: 'ModelingComponent' }">Single Page Router(SPA)/ 네임 호출</v-btn>
</template>

<script>
export default {
    // 변수 설정: data() 함수를 통해 변수 셋팅

    data() {
        return {
            dialog: false
        }
    },
    methods: {
        cancel() {
            this.dialog = true;

        }
    }

};

</script>