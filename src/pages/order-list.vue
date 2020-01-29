<template>
    <div class="order-list">
        <order-header title="订单列表">
            <template v-slot:tip>
                <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="order-box">
                    <loading v-if="loading"></loading>
                    <div class="order" v-for="(item,index) in list" :key="index">
                        <div class="order-title">
                            <div class="item-info fl">
                                {{item.createTime | formatDate}}
                                <span>|</span>
                                订单号：{{item.orderNo}}
                                <span>|</span>
                                在线支付
                            </div>
                            <div class="item-money fr">
                                <span>应付金额：</span>
                                <span class="money">{{item.payment}}</span>
                                <span>元</span>
                            </div>
                        </div>
                        <div class="order-content clearfix">
                            <div class="good-box fl">
                                <div class="good-list" v-for="(product,i) in item.orderItemVoList" :key="i">
                                    <div class="good-img">
                                        <img v-lazy="product.productImage"
                                             alt="">
                                    </div>
                                    <div class="good-name">
                                        <div class="p-name">{{product.productName}}</div>
                                        <div class="p-money">{{product.totalPrice +' x '+product.quantity}}&nbsp;元</div>
                                    </div>
                                </div>
                            </div>
                            <div class="good-state fr" v-if="item.status === 10">
                                <a href="javascript:;" @click="goPay(item.orderNo)">未支付</a>
                            </div>
                            <div class="good-state fr" v-else>
                                <a href="javascript:;">已支付</a>
                            </div>

                        </div>
                    </div>
                    <el-pagination
                            v-if="true"
                            class="pagination"
                            background
                            layout="prev, pager, next"
                            :pageSize="pageSize"
                            :total="total"
                            @current-change="handleChange"
                    ></el-pagination>
                    <div class="load-more" v-if="false">
                        <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
                    </div>
                    <div class="scroll-more"
                         v-infinite-scroll="scrollMore"
                         infinite-scroll-disabled="true"
                         infinite-scroll-distance="410"
                         v-if="false"
                    >
                        <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
                    </div>
                    <no-data v-if="!loading && list.length===0"></no-data>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderHeader from "../components/order-header";
    import Loading from "../components/loading";
    import NoData from "../components/no-data";
    import {Pagination, Button} from 'element-ui'
    import infiniteScroll from 'vue-infinite-scroll'

    export default {
        name: "order-list",
        components: {
            NoData,
            Loading,
            [Pagination.name]: Pagination,
            [Button.name]: Button,
            OrderHeader
        },
        directives: {
            infiniteScroll
        },
        data() {
            return {
                loading: true,
                list: [],
                pageSize: 2,
                pageNum: 1,
                total: 0,
                showNextPage: true,//加载更多：是否显示按钮
                busy: false,//滚动加载，是否触发
            }
        },
        filters: {
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
        },
        mounted() {
            this.getOrderList();
        },
        methods: {
            getOrderList() {
                this.loading = true;
                this.busy = true;
                this.axios.get('/order/list', {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                }).then((res) => {
                    // this.list = this.list.concat(res.list);
                    this.list = res.list;
                    this.total = res.total;
                    this.loading = false;
                    this.showNextPage = res.hasNextPage;
                    this.busy = false;
                }).catch(() => {
                    this.loading = false;
                })
            },
            goPay(orderNo) {
                this.$router.push({
                    path: '/order/pay',
                    query: {
                        orderNo
                    }
                })
            },
            handleChange(pageNum) {
                this.pageNum = pageNum;
                this.getOrderList();
            },
            loadMore() {
                this.pageNum++;
                this.getOrderList();
            },
            scrollMore() {
                this.busy = true;
                setTimeout(() => {
                    this.pageNum++;
                    this.getList();
                }, 500);
            },
            // 专门给scrollMore使用
            getList() {
                this.loading = true;
                this.axios.get('/order/list', {
                    params: {
                        pageSize: this.pageSize,
                        pageNum: this.pageNum
                    }
                }).then((res) => {
                    this.list = this.list.concat(res.list);
                    this.loading = false;
                    if (res.hasNextPage) {
                        this.busy = false;
                    } else {
                        this.busy = true;
                    }
                });
            },
        }
    }
</script>

<style lang="scss">
    @import './../assets/scss/config.scss';
    @import './../assets/scss/mixin.scss';

    .order-list {
        .wrapper {
            background-color: $colorJ;
            padding-top: 33px;
            padding-bottom: 110px;

            .order-box {
                .order {
                    @include border();
                    background-color: $colorG;
                    margin-bottom: 31px;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    .order-title {
                        @include height(74px);
                        background-color: $colorK;
                        padding: 0 43px;
                        font-size: 16px;
                        color: $colorC;

                        .item-info {
                            span {
                                margin: 0 9px;
                            }
                        }

                        .money {
                            font-size: 26px;
                            color: $colorB;
                        }
                    }

                    .order-content {
                        padding: 0 43px;

                        .good-box {
                            width: 88%;

                            .good-list {
                                display: flex;
                                align-items: center;
                                height: 145px;

                                .good-img {
                                    width: 112px;

                                    img {
                                        width: 100%;
                                    }
                                }

                                .good-name {
                                    font-size: 20px;
                                    color: $colorB;
                                }
                            }
                        }

                        .good-state {
                            @include height(145px);
                            font-size: 20px;
                            color: $colorA;

                            a {
                                color: $colorA;
                            }
                        }
                    }
                }

                .pagination {
                    text-align: right;
                }

                .el-pagination.is-background .el-pager li:not(.disabled).active {
                    background-color: #FF6600;
                }

                .el-button--primary {
                    background-color: #FF6600;
                    border-color: #FF6600;
                }

                .load-more, .scroll-more {
                    text-align: center;
                }
            }
        }
    }
</style>