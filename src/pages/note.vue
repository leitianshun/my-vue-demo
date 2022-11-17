<template>
  <div>
    <el-container>
      <el-col :span="6">
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          :disabled="!$route.query.id"
          round
          @click="addNote"
          style="margin:10px 0"
          >添加笔记</el-button
        >
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-management"></i>
              <span>{{ noteBookTitle ? noteBookTitle : "" }} </span>
            </template>
            <el-menu-item-group v-for="(item, index) in noteInfo" :key="index">
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item @click="selectNote(index)"
                >笔记标题: {{ item.title }}</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group v-show="noteInfo.length == 0">
              <el-menu-item
                >{{
                  !$route.query.id
                    ? "请先选择笔记本后点击添加笔记"
                    : " 暂无笔记，请点击上方添加笔记 "
                }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-header>
          <el-row>
            <el-col :span="6">
              <span>创建时间: {{ selectNotes.createdAt | formDate }}</span>
            </el-col>
            <el-col :span="6">
              <span>更新时间 :{{ selectNotes.updatedAt | formDate }}</span>
            </el-col>
            <el-col :span="6">
              <span>{{ statusText }} </span>
            </el-col>
            <el-col :span="6">
              <i
                class="el-icon-delete"
                style="cursor:pointer"
                @click="delNote(selectNotes.id)"
                >删除笔记</i
              >
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-row type="flex" justify="left">
            <el-col :span="8" style="margin:10px 0">
              <el-input
                :disabled="noteInfo.length == 0"
                type="text"
                placeholder=" 输入笔记标题"
                v-model="selectNotes.title"
                @keydown.native="keydownEvent($event)"
                @input="updateNote"
              />
            </el-col>
          </el-row>
          <textarea
            :disabled="noteInfo.length == 0"
            style="width:100%;"
            id="content"
            focus
            rows="18"
            v-model="selectNotes.content"
            @keypress="statusText = '正在输入...'"
            placeholder="输入笔记内容"
            @input="updateNote"
          ></textarea>
        </el-main>
      </el-col>
    </el-container>
  </div>
</template>
<script>
// let content = document.querySelector("#content");
// content.addEventListener("keyup", e => {
//   console.log(e.target.value);
// });
import lodash from "lodash";
import api from "../utils/http/axios";
export default {
  name: "note",
  data() {
    return {
      noteInfo: [],
      selectNotes: {},
      noteBookId: "",
      noteTitle: "",
      statusText: "笔记未改动",
      noteBookTitle: ""
    };
  },
  created() {
    this.getInfo();
    // console.log(this.$route.query.id);
    // console.log(this.$route.params.id);
    this.noteBookTitle = this.$route.query.title;
    let noteBookId = this.$route.query.id;
    if (noteBookId) {
      this.getNoteFromNoteBook(noteBookId).then(res => {
        if (res.data.length == 0) {
          this.$message.warning("请选择或添加笔记");
        }
      });
      this.noteBookId = noteBookId;
    }
  },
  mounted() {
    // if (Object.keys(this.selectNotes).length == 0) {
    //   this.$message.warning("请选择或添加笔记");
    // }
    if (!this.$route.query.id) {
      this.$message.warning("请先选择笔记本后再添加笔记");
    }
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
    keydownEvent(e) {
      console.log(e);
    },
    updateNote: lodash.debounce(function() {
      api
        .updateNote(this.selectNotes.id, {
          content: this.selectNotes.content,
          title: this.selectNotes.title
        })
        .then(res => {
          this.statusText = "已保存";
        })
        .catch(err => {
          this.statusText = "保存出错";
        });
    }, 1000),
    // console.log(e.target.value);

    debounce(fn, time) {
      let timer;
      return function(arg) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.call(this, arg), time);
      };
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    getNoteFromNoteBook(id) {
      return new Promise((resolve, reject) => {
        api.getNoteFromNoteBook(id).then(res => {
          resolve(res);
          console.log(res.data);
          this.noteInfo = res.data;
          this.selectNotes = res.data[0] || {};
        });
      });
    },
    selectNote(index) {
      console.log(index);
      this.selectNotes = this.noteInfo[index];
      console.log(this.selectNotes);
    },
    delNote(id) {
      this.$confirm("此操作将删除该笔记, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.delNOte(id).then(res => {
            this.$message.success("删除成功");
            this.getNoteFromNoteBook(this.noteBookId);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addNote() {
      // api
      //   .addNote(this.noteBookId, {
      //     content: this.selectNotes.content,
      //     title: this.selectNotes.title
      //   })
      //   .then(res => {
      //     console.log(res.data);
      //     this.getNoteFromNoteBook();
      //   });
      api
        .addNote(this.noteBookId, {
          content: "",
          title: ""
        })
        .then(res => {
          this.$message.success("添加成功");
          console.log(res.data);
          this.getNoteFromNoteBook(this.noteBookId);
        });
    }
  }
};
</script>
<style scoped></style>
