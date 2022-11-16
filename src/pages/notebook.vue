<template>
  <div>
    <ul style=";" class="noteBookList">
      <h3>笔记本列表</h3>
      <el-row type="flex" justify="left" style="margin:20px">
        <el-col :span="6">
          <el-button
            type="primary"
            class="el-icon-circle-plus-outline"
            round
            @click="addNoteBook"
          >
            添加笔记本
          </el-button>
        </el-col>
      </el-row>
      <!-- <router-link to="/note"> -->
      <li
        v-for="(item, index) in bookList"
        :key="index"
        style=" "
        @click="toNoteInfo(item.id, item.title)"
      >
        <span>{{ item.title }} </span>
        <span>创建时间:{{ item.createdAt }}</span>
        <div>
          <span
            class="el-icon-delete"
            style="color:red"
            @click.stop="delNoteBook(item.id)"
          ></span>
          <span
            @click.stop="editNoteBook(item.id)"
            class="el-icon-edit"
            style="margin:0 20px;color: blue;"
          ></span>
        </div>
      </li>
      <!-- </router-link> -->
    </ul>
  </div>
</template>
<script>
import api from "@/utils/http/axios";
export default {
  name: "component_name",
  data() {
    return {
      bookList: []
    };
  },
  created() {
    this.getInfo();
    this.getAllNoteBook();
  },
  methods: {
    getInfo() {
      api.getInfo().then(res => {
        if (!res.isLogin) {
          this.$message.error("登录失效，请重新登录");
          this.$router.push({ path: "/login" });
        }
      });
    },
    getAllNoteBook() {
      api.getAllNoteBook().then(res => {
        console.log(res.data);
        this.isLogin = true;
        this.bookList = res.data.reverse();
      });
    },
    delNoteBook(id) {
      this.$confirm("此操作将删除该笔记本, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .deleteNoteBook(id)
            .then(res => {
              this.$message.success("删除成功");
              this.getAllNoteBook();
            })
            .catch(err => {
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editNoteBook(id) {
      this.$prompt("请输入笔记标题", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          api.editNoteBook(id, { title: value }).then(res => {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.getAllNoteBook();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    addNoteBook() {
      this.$prompt("请输入笔记标题", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          api.addNoteBook({ title: value }).then(res => {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.getAllNoteBook();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });

      // axios
      //   .request({
      //     url: "https://note-server.hunger-valley.com/auth/login",
      //     method: "POST",
      //     data: { username: "hunger", password: "123456" }
      //   })
      //   .then(res => {
      //     console.log(res);
      //   });
      // api({
      //   url: "/auth/login",
      //   method: "POST",
      //   data: { username: "lts", password: "123456" }
      // }).then(res => {
      //   console.log(res);
      // });
    },
    toNoteInfo(id, title) {
      this.$router.push({ path: "/note", query: { id: id, title: title } });
      // this.$router.push({ name: "note", params: { id: id } });  //两种方法都可 使用这种时要在路由里配置name
    }
  }
};
</script>
<style scoped lang="scss">
.noteBookList {
  padding: 0 20px;
  li {
    width: 100%;
    height: 30px;
    background-color: rgb(219, 235, 245);
    border-radius: 20px;
    margin: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &:hover {
      cursor: pointer;
      background: #409eff;
      color: white;
    }
  }
}
</style>
