<template>
  <div>
    <el-container>
      <el-row type="flex" justify="center">
        <el-col :span="20" v-if="noteInfo.length == 0">
          <h3>暂无笔记请先添加笔记</h3>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        justify="center"
        v-for="item in noteInfo"
        :key="item.id"
      >
        <el-col :span="7">
          <h3>{{ item.title }}</h3>
        </el-col>
        <el-col :span="13">
          {{ item.content }}
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>
<script>
import api from "../utils/http/axios";
export default {
  name: "note",
  data() {
    return {
      noteInfo: []
    };
  },
  created() {
    // console.log(this.$route.query.id);
    // console.log(this.$route.params.id);
    let noteBookId = this.$route.query.id;
    if (noteBookId) {
      this.getNoteFromNoteBook(noteBookId);
    }
  },
  methods: {
    getNoteFromNoteBook(id) {
      api.getNoteFromNoteBook(id).then(res => {
        // console.log(res);
        this.noteInfo = res.data;
      });
    }
  }
};
</script>
<style scoped></style>
