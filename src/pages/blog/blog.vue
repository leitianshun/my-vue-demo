<template>
  <div class="box">
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        <el-button type="success" round @click="blogLogin">博客登录</el-button>
        <el-button type="info" round @click="blogLogout">退出登录</el-button>
        <el-button type="warning" round @click="blogIsLogin"
          >判断博客登录是否过期</el-button
        >
        <el-button type="success" round @click="showDialog">新增博客</el-button>
        <el-button type="warning" round @click="getAllBlogList"
          >获取博客列表</el-button
        >
        <el-button type="warning" round @click="pre">获取上一页</el-button>
        <el-button type="warning" round @click="next">获取下一页</el-button>
      </el-col>
    </el-row>
    <hr />
    <el-dialog
      :title="isAdd ? '添加博客' : '修改博客'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="博客标题:" :label-width="formLabelWidth">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="请输入标题，最低10个字"
          ></el-input>
        </el-form-item>
        <el-form-item label="博客简介:" :label-width="formLabelWidth">
          <el-input
            v-model="form.description"
            autocomplete="off"
            placeholder="请输入简介，最低30个字"
          ></el-input>
        </el-form-item>
        <el-form-item label="博客内容:" :label-width="formLabelWidth">
          <textarea
            placeholder="请输入内容"
            v-model="form.content"
            cols="13"
            rows="12"
            style="width:100%"
          ></textarea>
        </el-form-item>
        <el-form-item
          label="是否置顶:"
          :label-width="formLabelWidth"
          style="text-align:left"
        >
          <el-select v-model="form.atIndex" placeholder="请选择是否置顶">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="isAdd ? addBlog() : editBlog()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <ul class="noteBookList">
          <li v-for="(item, index) in blogList" :key="item.id">
            <img
              :src="item.user.avatar"
              alt=""
              style="width:30px ;height:30px"
            />
            <span>博客标题:{{ item.title }}</span>
            <span>创建时间:{{ item.createdAt | formDate }}</span>
            <span>更新时间:{{ item.updatedAt | formDate }}</span>
            <span>是否置顶:{{ item.atIndex ? "是" : "否" }}</span>
            <span>博客作者:{{ item.user.username }}</span>
            <span
              class="el-icon-delete"
              style=""
              @click.stop="delBlog(item.id)"
            >
              删除</span
            >
            <span
              @click.stop="showDialog2(item.id, index)"
              class="el-icon-edit"
              style="margin:0 20px;"
              >修改</span
            >
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/http/blog";
export default {
  data() {
    return {
      blogList: [],
      page: 1,
      totalPage: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {},
      isAdd: false,
      blogId: ""
    };
  },
  created() {
    this.getAllBlogList();
  },
  methods: {
    showDialog() {
      this.dialogFormVisible = true;
      this.isAdd = true;
      this.form == {};
    },
    async showDialog2(id, index) {
      this.form == {};
      let res = await request("/blog/" + id, "get", null);
      console.log(res);
      this.form.content = res.data.content;
      this.blogId = id;
      this.isAdd = false;
      console.log("🚀 ~ file: blog.vue ~ line 66 ~ editBlog ~ id", id);
      this.dialogFormVisible = true;
      let blogItem = this.blogList[index];
      console.log(blogItem);
      this.form.title = blogItem.title;
      // this.form.content = blogItem.content;
      this.form.description = blogItem.description;
      this.form.atIndex = blogItem.atIndex;

      // request("/blog/" + id, "get", null).then(res => {
      //   //获取博客详情
      //   console.log("🚀 ~ file: blog.vue ~ line 181 ~ request ~ res", res);
      //   let blogDetail = res.data;
      //   this.form.title = blogDetail.title;
      //   this.form.content = blogDetail.content;
      //   this.form.description = blogDetail.description;
      //   this.form.atIndex = blogDetail.atIndex;
      // });
    },
    delBlog(id) {
      this.$confirm("此操作将删除该博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request("/blog/" + id, "DELETE", null).then(res => {
            console.log("🚀 ~ file: blog.vue ~ line 74 ~ request ~ res", res);
            this.$message({
              type: "success",
              message: res.msg
            });
            this.getAllBlogList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addBlog() {
      this.dialogFormVisible = false;
      if (JSON.stringify(this.form) == "{}") {
        this.$message.error("请完整填写内容");
        return;
      } else {
        if (this.form.title.length < 10) {
          this.$message.error("文章标题至少10个字");
          return;
        }
        if (this.form.description.length < 30) {
          this.$message.error("文章简介至少30个字");
          return;
        }
        if (this.form.content.length < 200) {
          this.$message.error("文章内容至少200个字");
          return;
        }
      }

      request(
        "/blog",
        "post",
        "title=" +
          this.form.title +
          "&description=" +
          this.form.description +
          "&atIndex=" +
          this.form.atIndex +
          "&content=" +
          this.form.content
      ).then(res => {
        this.form = {};
        console.log(res);
        this.$message.success(res.msg);
        this.getAllBlogList();
      });
    },
    editBlog() {
      // .then(() => {
      request(
        "/blog/" + this.blogId,
        "PATCH",
        "title=" +
          this.form.title +
          "&description=" +
          this.form.description +
          "&atIndex=" +
          this.form.atIndex +
          "&content=" +
          this.form.content
      ).then(res => {
        console.log("🚀 ~ file: blog.vue ~ line 196 ~ request ~ res", res);
      });
      // });
    },
    next() {
      if (this.page < this.totalPage) {
        this.page += 1;
        this.getAllBlogList();
      } else {
        this.$message.error("没有更多了");
      }
    },
    pre() {
      if (this.page > 1) {
        this.page -= 1;
        this.getAllBlogList();
      }
    },
    blogLogin() {
      request("/auth/login", "POST", "username=lts&password=123456").then(
        res => {
          console.log(
            "🚀 ~ file: HelloWorld.vue ~ line 377 ~ blogLogin ~ result",
            res
          );

          let token = res.token;
          window.localStorage.setItem("token", token); //登录成功后将token存在本地
          console.log("博客登录成功");
          this.$message.success("博客登录成功");
        }
      );
    },
    blogLogout() {
      request("/auth/logout", "get", null).then(res => {
        console.log(res);
        this.$message.success(res.msg);
        localStorage.removeItem("token");
      });
    },
    blogIsLogin() {
      request("/auth", "get").then(res => {
        console.log(res);
        if (!res.isLogin) {
          this.$message.error("登录已过期请从新登录");
        } else {
          console.log("当前登录未过期");
        }
      });
    },
    initData() {
      this.blogList = [];
    },
    getAllBlogList() {
      this.blogList = [];
      request("/blog?page=" + this.page, "get", null).then(res => {
        // console.log(res.response);
        this.blogList = res.data;
        this.totalPage = res.totalPage;
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  .noteBookList {
    padding: 0 20px;
    max-height: 500px;
    overflow: scroll;
    li {
      width: 100%;
      padding: 10px;
      height: 30px;
      background-color: rgb(219, 235, 245);
      border-radius: 20px;
      margin: 10px 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      overflow: hidden;
      &:hover {
        cursor: pointer;
        background: #409eff;
        color: white;
      }
      span {
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover:last-child {
          color: rgb(255, 187, 0);
        }
        &:hover:nth-child(6) {
          color: red;
        }
      }
    }
  }
}
dhakhd {
  color: #757773;
}
</style>
