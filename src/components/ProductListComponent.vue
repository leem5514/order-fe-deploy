<template>
    <v-container>
      <v-row class="d-flex justify-content-between mt-5">
        <v-col>
          <v-form @submit.prevent="searchProducts">
            <v-row>
              <v-col cols="auto">
                <v-select
                  v-model="searchType"
                  :items="searchOptions"
                  item-title="text"
                  item-value="value"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field v-model="searchValue" label="Search"></v-text-field>
              </v-col>
              <v-col cols="auto">
                <v-btn type="submit">
                  검색
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col cols="auto" v-if="!isAdmin" :style="{marginTop:'10px'}">
            <v-btn class="mr-2" @click="addCart" style="background-color:bule;">장바구니</v-btn>
            <v-btn @click="createOrder" style="background-color:blue;">주문하기</v-btn>
        </v-col>
        
        <v-col v-if="isAdmin" cols="auto">
          <v-btn href="/product/create" color="success">상품등록</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="text-p text-center">{{ pageTitle }}</v-card-title>
            <v-card-text>
              <v-table>
                <thead>
                  <tr>
                    <th>제품사진</th>
                    <th>제풍명</th>
                    <th>가격</th>
                    <th>재고수량</th>
                    <th v-if="!isAdmin">주문수량</th>
                    <th class="text-center" v-if="!isAdmin">주문선택</th>
                    <th v-if="isAdmin">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in productList" :key="p.id">
                    <td>
                      <v-img :src="p.imagePath" style="height:100px;width:auto;"></v-img>
                    </td>
                    <td>{{ p.name }}</td>
                    <td>{{ p.price }}</td>
                    <td>{{ p.stockQuantity }}</td>
                    <td>
                      <v-text-field
                        v-model.number="p.quantity"
                        type="number"
                        style="width:70px"
                      >
                      </v-text-field>
                    </td>
                    <td class="text-center" v-if="!isAdmin">
                      <input type="checkbox" v-model="selected[p.id]">
                    </td>
                    <td v-if="isAdmin">
                      <v-btn color="secondary" @click="deleteProduct(p.id)">
                        삭제
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    props: ['isAdmin', 'pageTitle'],
    data() {
      return {
        searchType: 'optional',
        searchOptions: [
          { text: '선택', value: 'optional' },
          { text: '상품명', value: 'name' },
          { text: '카테고리', value: 'category' },
        ],
        searchValue: "",
        productList: [],
        pageSize: 5,
        currentPage: 0,
        isLastPage: false,
        isLoading: false,
        selected: {}
      }
    },
    created() {
      this.loadProduct();
      window.addEventListener('scroll', this.scrollPagination)
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.scrollPagination);
    },
    methods: {
        deleteProduct(productId) {
            console.log(productId)
        },
        
        searchProducts() {
            this.productList = [];
            this.currentPage = 0;
            this.isLastPage = false;
            this.isLoading = false;
            this.loadProduct();
        },
        async loadProduct() {
            try {
            if (this.isLoading || this.isLastPage) return;
    
            this.isLoading = true;
            let params = {
                size: this.pageSize,
                page: this.currentPage,
            };
    
            if (this.searchType === 'name') {
                params.searchName = this.searchValue;
            } else if (this.searchType === 'category') {
                params.category = this.searchValue;
            }
  
            const response = await axios.get(`${process.env.VUE_APP_API_BASIC_URL}/product/list`, { params });
            const additionalData = response.data.result.content.map(p => ({ ...p, quantity: 0 }));
            
            if (additionalData.length == 0) {
                this.isLastPage = true;
                return;
            }
    
            this.productList = [...this.productList, ...additionalData]
            this.currentPage++;
            this.isLoading = false;
            } catch (e) {
            console.log(e)
            }
        },

        scrollPagination() {
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
            if (isBottom && !this.isLastPage && !this.isLoading) {
            this.loadProduct();
            }
        },

        addCart() {
            const orderProducts = Object.keys(this.selected).filter(key => this.selected[key])
            .map(key => {
                const product = this.productList.find(p => p.id == key)
                return { id: product.id, name: product.name, quantity: product.quantity };
            });
            orderProducts.forEach(p => this.$store.dispatch('addCart', p))
            window.location.reload();
        },

        async createOrder() {
            const orderProducts = Object.keys(this.selected).filter(key => this.selected[key]).map(key => {
                const product = this.productList.find(p => p.id == key)
                return { productId: product.id, productCount: product.quantity };
            });
            if (orderProducts.length < 1) {
                alert("주문대상 물건이 없습니다.");
                return;
            }
            const yesOrNo = confirm(`${orderProducts.length}개의 상품을 준비하시겠습니까?`);
                if (!yesOrNo) {
                console.log("주문이 취소되었습니다.");
                return;
            }
            try {
                await axios.post(`${process.env.VUE_APP_API_BASIC_URL}/order/create`, orderProducts);
                alert("주문 성공하였습니다");
                this.selected = {};
                this.productList.forEach(p => p.quantity = 0);
            } catch (e) {
                console.log(e);
                alert("주문 실패하였습니다.");
            }
        }
    }
  }
  </script>
  