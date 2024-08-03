<script setup>
import { ref } from "vue";

const data = ref([
  {
    name: "珍珠奶茶",
    description: "香濃奶茶搭配QQ珍珠",
    price: "50",
    stock: 20
  },
  {
    name: "冬瓜檸檬",
    description: "清新冬瓜配上新鮮檸檬",
    price: "45",
    stock: 18
  },
  {
    name: "翡翠檸檬",
    description: "綠茶與檸檬的完美結合",
    price: "55",
    stock: 34
  },
  {
    name: "四季春茶",
    description: "香醇四季春茶，回甘無比",
    price: "45",
    stock: 10
  },
  {
    name: "阿薩姆奶茶",
    description: "阿薩姆紅茶搭配香醇鮮奶",
    price: "50",
    stock: 25
  },
  {
    name: "檸檬冰茶",
    description: "檸檬與冰茶的清新組合",
    price: "45",
    stock: 20
  },
  {
    name: "芒果綠茶",
    description: "芒果與綠茶的獨特風味",
    price: "55",
    stock: 18
  },
  {
    name: "抹茶拿鐵",
    description: "抹茶與鮮奶的絕配",
    price: "60",
    stock: 20
  }
]);

const increment = (item) => {
  item.stock += 1;
};

const decrement = (item) => {
  item.stock -= 1;
};

const editStatus = ref(false);
const currentEditIndex = ref(); // 跟踪當前編輯行的索引

const edit = (index) => {
  currentEditIndex.value = index; //當前正在編輯的項目索引被更新
  editStatus.value = true;
};

const finish = () => {
  editStatus.value = false;
  currentEditIndex.value = null;
};

const cancel = () => {
  editStatus.value = false;
  currentEditIndex.value = null;
};


</script>

<template>
  <!-- 建立表頭 -->
  <table class="primary">
    <thead class="Header">
      <tr>
        <th scope="col">品項</th>
        <th scope="col">描述</th>
        <th scope="col">價格</th>
        <th scope="col">庫存</th>
        <th scope="col">操作</th>
      </tr>
    </thead>
    <!-- 迴圈v-for -->
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td class="primary500b">
          <span v-if="editStatus && currentEditIndex === index">
            <input 
              type="text" 
              v-model="item.name"
              class="IgInput"
            />
          </span>
          <span v-else>
            {{ item.name }}
          </span>
        </td>
        <td class="primary500b">{{ item.description }}</td>
        <td class="primary500b">{{ item.price }}</td>
        <td class="primary500b">
          <button @click="decrement(item)" type="button">-</button>
          {{ item.stock }}
          <button @click="increment(item)" type="button">+</button>
        </td>
        <td>
          <button v-if="!editStatus" @click="edit(index)">編輯</button>
          <button v-if="editStatus && currentEditIndex === index" class="button-gap" @click="finish">完成</button>
          <button v-if="editStatus && currentEditIndex === index" class="button-gap" @click="cancel">取消</button>
        </td>
      </tr> 
    </tbody>
  </table>
</template>

<style scoped>
.Header{
  color: #4D4D4D;
  background-color: #F2F2F2;
}
.primary{
  background-color: #F2F2F2;
}
.primary500b{
 color: #4D4D4D; 
}
table{
  width: 760px;
  
}
.IgInput{
  background-color: #fff;
  height: 24px;
  color: black;
  width: 96px;
}
.button-gap {
  margin-right: 8px; /* 添加右侧间距 */
}
</style>
