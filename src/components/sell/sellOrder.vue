<template>
  <div id="sellOrder">
    <div id="search">
      <div id="searchBox">
        <el-input v-model="searchItem.id" style="width:25%;margin-left: 25%;margin-right: 2%;margin-top: 30px"
                  aria-placeholder="搜索商品id"></el-input>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "sellOrder",
  data(){
    return{
      searchItem:{
        id:null,
        goodsName:null,
        price:null
      },
      tableData: [],
      tableData1: [],
      tableAllData: [],
      currentPage4: 4,
      data1:{
        id: '',
        sellItem:[
          {}
        ]
      },
      page:1,
      pageSize:5,
      goodsTotal:100,
      post:{
        id:'123',
        name:'zn'
      }
    }
  },
  methods:{
    searchMessage(){
      let id = this.searchItem.id
      this.tableData=this.tableAllData.filter(function (item){
        console.log(id)
        console.log(item)
        console.log(item.id)
        if(item.goodsId == id)
          return item
      })
      console.log(this.tableData)
    },
    reduceGoods(row){
      console.log(row);
      if(row.num ==0){
        this.$message({
          message:'数量不能为负',
          type:'warning'
        })
      }
      else {
        row.num--
        this.tableAllData.forEach(function (item,index){
          if(item.goodsId == row.goodsId){
            item.num=row.num
          }
        })
      }
    },
    addGoods(row){
      if(row.num==row.amount){
        this.$message({
          message:'数量不能超过最大存货量',
          type:'warning'
        })
      }
      else{
        row.num++
        this.tableAllData.forEach(function (item,index){
          if(item.goodsId == row.goodsId)
            item.num=row.num
        })
      }
      console.log(this.tableAllData)
    },
    handleSizeChange(val){
      console.log('每页${val}条');
      this.pageSize=val
      this.getGoodsMsg()
    },
    async handleCurrentChange(val){//异步函数
      console.log('当前页:${val}');
      await this.getGoodsMsg(val,this.pageSize)
      console.log(this.tableAllData)
      this.tableData = this.tableAllData.filter((obj)=>{
        for(let item of this.tableData){
          if(obj.goodsId == item.goodsId){
            return obj
          }
        }
      })
    }
  },

  async getGoodMsg(currentPage = this.page, pageSize = this.pageSize){
    await this.$http('/sell/goods/'+currentPage+'/'+pageSize).then(resp=>{
      console.log(resp)
      for(let item of resp.data.data){
        item.num=0
      }
      this.tableData = []
      this.tableData = this.tableData.concat(resp.data.data)
      this.goodsTotal = resp.data.recordsNum
      this.pageSize = resp.data.pageSize
    })
  },
  getAllGoodsMsg(){
    this.$http('/sell/goods/1/1000').then(resp=>{
      console.log(resp)
      for(let item of resp.data.data){
        item.num=0
      }
      this.tableAllData=[]
      this.tableAllData=resp.data.data
    })
  },
  async commitOrder(){
    this.$http.defaults.headers.post['Content-Type']='application/json';
    let sellItem=[
      {
        sellId:"null",
        goodsId:14,
        price:4,
        amount:2
      },
      {
        sellId: "null",
        goodsId: 15,
        price: 4,
        amount:2
      }
    ]
    sellItem=[]
    this.tableAllData.forEach((item,index)=>{
      if(item.num!=0){
        sellItem = sellItem.concat({
          sellId: "null",
          goodsId: item.goodsId,
          price: item.price,
          amount:item.amount
        })
        console.log(sellItem)
      }
    })
    await this.$http.post('/sell/addOrder/1',JSON.stringify(sellItem)).then(resp=>{
      this.$message('添加成功')
    })
    await this.getGoodMsg()
    await this.getAllGoodsMsg()
  },
  async reset(){
    this.searchItem={
      id:null,
      goodsName: null,
      price: null
    }
    await this.getGoodMsg()
    console.log(this.tableAllData)
    this.tableData = this.tableAllData.filter((obj)=>{
      for(let item of this.tableData){
        if(obj.goodsId == item.goodsId) {
          return obj
        }
      }
    })
  },
  mounted() {
    this.getGoodMsg()
    this.getAllGoodsMsg()
  }
}
</script>

<style scoped>
#sellOrder{
  height: 100%;
  width: 100%;
}
#sellOrder{
  width:100%;
  height: 15%;
}

#sellOrder #search #searchBox{
  width:80%;
  height: 100%;
  margin:0 auto;
  border-bottom: 1px solid #ccc;
  position: relative;
}

#sellOrder #table{
  width: 100%;
  height: 85%;
  text-align: center;
}

#pagination{
  margin-top: 20px;
}

#tableChild{
  width:80%;
  margin:0px auto;
}

#addOrder{
  float: left;
  margin-left: 10px;
}

</style>