function initState() {
    return {
        //로컬스토리지에서 데이터 추출
        productsInCart: JSON.parse(localStorage.getItem('productsInCart')|| []), 
        totalQuantity: localStorage.getItem('productsInCart')|| 0,
    }
}

const practice={
    state: initState,
    mutations: {    
        addCart(state, product) {
            const existProducts = state.productsInCart.find(p => p,id == product.id);
            if(existProducts) {
                existProduct.quantity +=product.quantity;
            } else{
                state.productsInCart.push(product);
            }
            state.totalQuantity = parseInt(state.totalQuantity) + product.quantity;
            //로컬스토리지에서 데이터 직렬화 -> 삽입
            localStorage.setItem('porductsInCart', JSON.stringify(state.productsInCart));
            localStorage.setItem('totalQuantity', state.totalQuantity);
        },
        clearCart(state) {
            state.productsInCart = [];
            state.totalQuantity = 0;
            localStorage.removeItem('porductsInCart');
            localStorage.removeItem('totalQuantity');
        }
    },
    actions:{
        addCart(context, product){
            context.commit('addCart', product)
        },
        clearCart(context) {
            context.commit('clearCart')
        }
    },

    getters: {
        getTotalQuantity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart,
    }
}

export default practice;