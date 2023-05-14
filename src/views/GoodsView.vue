<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="queryData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="queryData.title" placeholder="请输入商品名" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="queryData.introduce" placeholder="请输入商品名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit"><el-icon><Search /></el-icon>查询 </el-button>
        </el-form-item>
        
      </el-form>
    </div>

    <div class="show-table">
      <el-table :data="sliceList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="title" label="商品名" width="180" />
        <el-table-column prop="introduce" label="详情介绍" />
      </el-table>
    </div>

    <el-pagination
      v-model:page-size="data.queryData.pagesize"
      v-model:current-page="data.queryData.page"
      layout="prev, pager, next"
      :total="queryData.count"
    />
  </div>
</template>

<script setup lang="ts">
import { getGoodsList } from "@/request/api";
import { InitData, IList } from "../type/goods";
import { reactive, toRefs, computed, watch } from "vue";
import { Search} from "@element-plus/icons-vue";

const data = reactive(new InitData());

getGoodsList().then((res) => {
  data.list = res.data.list;
  data.queryData.count = res.data.list.length;
});

/* 
处理页面大小和当前页

const sizeChange = (pageSize: number) => {
  data.queryData.pagesize = pageSize;
};
const currentChange = (page: number) => {
  data.queryData.page = page;
};
WARNING

以上事件不推荐使用（但由于兼容的原因仍然支持，
在以后的版本中将会被删除）；
如果要监听 current-page 和 page-size 的改变，
使用 v-model 双向绑定是个更好的选择。

*/

const sliceList = computed(() => {
  return data.list.slice(
    (data.queryData.page - 1) * data.queryData.pagesize,
    data.queryData.page * data.queryData.pagesize
  );
});

const onSubmit = () => {
  let arr: IList[] = [];
  //title/introduce exist,put data.list item in arr
  if (data.queryData.title || data.queryData.introduce) {
    if (data.queryData.title) {
      arr = data.list.filter((i) => {
        return i.title.indexOf(data.queryData.title) != -1;
      });
    }
    if (data.queryData.introduce) {
      arr = arr.concat(
        data.list.filter((i) => {
          return i.introduce.indexOf(data.queryData.introduce) != -1;
        })
      );
    }
    arr = arr.filter((item, index) => {
      return arr.indexOf(item) == index;
    });

    arr.sort((a, b) => {
      return a.id - b.id;
    });
  } else {
    arr = data.list;
  }
  data.list = arr;
  data.queryData.count = arr.length;
};

watch([() => data.queryData.title, () => data.queryData.introduce], () => {
  if (data.queryData.title == "" && data.queryData.introduce == "") {
    getGoodsList().then((res) => {
      data.list = res.data.list;
      data.queryData.count = res.data.list.length;
    });
  }
});

const { queryData } = toRefs(data);
</script>

<style scoped></style>
