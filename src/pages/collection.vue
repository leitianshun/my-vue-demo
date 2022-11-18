<template>
  <div class="box" style="">
    <el-card class="box-card" style="height:100%;">
      <div slot="header" class="clearfix " style=" text-align: center;">
        <span>回收站</span>
      </div>
      <ul class="list">
        <li v-for="(item, index) in trashNoteList" :key="index">
          <span> 笔记标题: {{ item.title }} </span>
          <!-- <span>
            {{ item.content }}
          </span> -->
          <span> 创建时间:{{ item.createdAt | formDate }} </span>
          <span> 更新时间:{{ item.updatedAt | formDate }} </span>
          <span> 所属笔记本id:{{ item.notebookId }} </span>
          <el-button
            round
            style=" padding: 8px ;"
            type="danger"
            @click="deleteNote(item.id)"
            >彻底删除</el-button
          >
          <el-button
            round
            style=" padding: 8px ;margin-right: 20px;"
            type="success"
            @click="revertNote(item.id)"
            >恢复</el-button
          >
        </li>
      </ul>
    </el-card>
  </div>
</template>
<script>
import api from "../utils/http/axios";
export default {
  name: "component_name",
  data() {
    return {
      trashNoteList: []
    };
  },
  created() {
    this.getInfo();
    this.getNoteByTrash();
  },
  methods: {
    getNoteByTrash() {
      api.getNoteByTrash().then(res => {
        console.log(res.data);
        this.trashNoteList = res.data;
      });
    },
    getInfo() {
      api.getInfo().then(res => {
        if (!res.isLogin) {
          this.$message.error("登录失效，请重新登录");
          this.$router.push({ path: "/login" });
        }
      });
    },
    deleteNote(id) {
      this.$confirm("此操作将永久删除该笔记, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteNote(id).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getNoteByTrash();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    revertNote(id) {
      api.revertNote(id).then(res => {
        this.$message({
          type: "success",
          message: "恢复成功!"
        });
        this.getNoteByTrash();
      });
    }
  }
};
</script>
<style scoped lang="scss">
.box {
  max-height: 350px;
  overflow: scroll;
  .box-card {
    text-align: center;
    .list {
      list-style: none;
      li {
        cursor: pointer;
        border: 1px solid rgb(200, 248, 216);
        padding: 10px;
        border-radius: 20px;
        display: flex;
        justify-content: space-around;
        margin: 10px 0;
        &:hover {
          background: rgb(147, 240, 147);
        }
      }
    }
  }
}
</style>
