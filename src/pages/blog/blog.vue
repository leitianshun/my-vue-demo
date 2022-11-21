<template>
  <div class="box">
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        <el-button type="success" round @click="blogLogin">博客登录</el-button>
        <el-button type="info" round @click="blogLogout">退出登录</el-button>
        <el-button type="warning" round @click="blogIsLogin"
          >判断博客登录是否过期</el-button
        >
        <el-button type="warning" round @click="getAllBlogList"
          >获取博客列表</el-button
        >
        <el-button type="warning" round @click="pre">获取上一页</el-button>
        <el-button type="warning" round @click="next">获取下一页</el-button>
      </el-col>
    </el-row>
    <hr />
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <ul class="noteBookList">
          <li v-for="item in blogList" :key="item.id">
            <img
              :src="item.user.avatar"
              alt=""
              style="width:30px ;height:30px"
            />
            <span>博客标题:{{ item.title }}</span>
            <span>创建时间:{{ item.createdAt | formDate }}</span>
            <span>是否置顶:{{ item.atIndex }}</span>
            <span>博客作者:{{ item.user.username }}</span>
            <span
              class="el-icon-delete"
              style=""
              @click.stop="delBlog(item.id)"
            >
              删除</span
            >
            <span
              @click.stop="editBlog(item.id)"
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
      totalPage: ""
    };
  },
  created() {
    this.getAllBlogList();
  },
  methods: {
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
              type: "warning",
              message: res.msg
            });
            // this.getAllBlogList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editBlog(id) {
      console.log("🚀 ~ file: blog.vue ~ line 66 ~ editBlog ~ id", id);
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
