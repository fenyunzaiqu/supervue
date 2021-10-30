<template>
  <div>
  <!--卡片区域-->
    <el-card class="box-card" shadow="hover">
      <!--搜索栏-->
      <el-row :gutter="15" style="margin-bottom: 10px">
        <el-col :span="10">
          <el-input v-model="staffName" aria-placeholder="请输入员工名" prefix-icon="el-icon-search">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success" icon="el-icon-search"
                     style="padding: 10px 20px; margin-top: 2px" @click="searchStaff">
            搜索
          </el-button>
        </el-col>
      </el-row>
      <!--信息展示-->
      <el-table :data="staffData" border stripe size="mini" highlight-current-row>
        <el-table-column prop="name" fixed align="left"
                         label="姓名" width="90"></el-table-column>
        <el-table-column prop="sex" label="性别"
                         align="left" width="85"></el-table-column>
        <el-table-column prop="identity" label="身份证"
                         align="left" width="130"></el-table-column>
        <el-table-column prop="phoneNum" label="电话号码"
                         align="left" width="130"></el-table-column>
        <el-table-column prop="email" label="电子邮箱"
                         align="left" width="180"></el-table-column>
        <el-table-column prop="address" label="联系地址"
                         align="left" width="250"></el-table-column>
        <el-table-column prop="workState" label="任职状态"
                         align="left" width="85"></el-table-column>
        <!--功能列-->
        <el-table-column fixed="right" width="100" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success"
                       @click="handleEdit(scope.$index,scope.row,scope.name)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <div class="pagination">
        <el-button type="success" size="small">批量删除</el-button>
        <el-pagination style="text-align: right" background
                       layout="total,prev,pager,next,jumper"
                       @current-change="getPage"
                       :page-size="size"
                       :total="total"></el-pagination>
      </div>
    </el-card>
  </div>

</template>

<script>
export default {
  name: "staff",
  data(){
    return{
      staffData:[],
      total:null,
      staffName:null,
      page:1,
      size:5
    }
  },
  created() {
    let _self = this;
    document.onkeydown=function (){
      let key = window.event.keyCode;
      if(key===13){
        _self.searchStaff();
      }
    }
    this.$http.get('/staff/basicInfo',{
      params:{
        page:1,
        size:5,
        search:''
      }
    }
  ).then(resp=>{
    console.log(resp)
    if(resp){
      this.staffData=resp.data.data;
      this.total=resp.data.recordsNum;
    }
    else{
      this.$message.error("资料获取失败")
    }
  })
},
  methods:{
    // eslint-disable-next-line no-unused-vars
    handleEdit(index,row,name){
      alert("请求编辑员工的个人信息")
    },
    getPage(currentPage){
      this.$http.get('/staff/basicInfo',{
        params:{
          page:currentPage,
          size:5,
          search:this.staffName
        }
      }).then(resp=>{
        if(resp){
          this.staffData=resp.data.data;
          this.total=resp.data.recordsNum;
        }
        else{
          console.log(this.staffName);
          this.$message.error("资料获取失败")
        }
      })
    },
    searchStaff(){
      this.$http.get('/staff/basicInfo',{
        params:{
          page:1,
          size:5,
          search:this.staffName
        }
      }).then(resp=>{
        console.log(resp)
        if(resp){
          this.staffData=resp.data.data;
          this.total=resp.data.recordsNum;
        }
        else{
          console.log(this.staffName);
          this.$message.error("获取资料失败")
        }
      })
    }
  }
}
</script>

<style scoped>
.el-table{
  font-size: 12px;
  width:100%;
  margin-bottom: 10px;
}
.pagination{
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}

</style>