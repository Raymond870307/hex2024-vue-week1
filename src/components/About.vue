<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const signField = ref({
  email: '',
  password: '',
  nickname: '',
});

const signin = ref({
  email: '',
  password: '',
});

const signinRes = ref('');
const api = 'https://todolist-api.hexschool.io';
const user = ref({
  nickname: '',
  uid: '',
});
const tokenSignOut = ref('');

const getToken = () => {
  return document.cookie.replace(/(?:(?:^|.*;\s*)todolist\s*\=\s*([^;]*).*$)|^.*$/, "$1");
};

const setToken = (token) => {
  document.cookie = `todolist=${token}`;
};

const removeToken = () => {
  document.cookie = 'todolist=; Max-Age=0';
};

const signup = async () => {
  console.log(`${api}/users/sign_up`);

  try {
    const res = await axios.post(`${api}/users/sign_up`, signField.value);
    console.log('Signup successful:', res);
  } catch (error) {
    console.error('Signup error:', error.response?.data?.message || error.message);
  }
};

const submit = async () => {
  console.log(`${api}/users/sign_in`);

  try {
    const res = await axios.post(`${api}/users/sign_in`, signin.value);
    console.log('Signin successful:', res);
    signinRes.value = res.data.token;
    setToken(res.data.token);
  } catch (error) {
    console.error('Signin error:', error.response?.data?.message || error.message);
  }
};

const signout = async () => {
  console.log(`${api}/users/sign_out`);
  const token = getToken();

  try {
    const res = await axios.post(`${api}/users/sign_out`, {}, {
      headers: {
        Authorization: token,
      },
    });
    console.log('Signout successful:', res.data);
    removeToken();
  } catch (error) {
    console.error('Signout error:', error.response?.data?.message || error.message);
  }
};

onMounted(async () => {
  const token = getToken();
  console.log('Token:', token);

  if (token) {
    try {
      const res = await axios.get(`${api}/users/checkout`, {
        headers: {
          Authorization: token,
        },
      });
      console.log('User data:', res);
      user.value = res.data;
    } catch (error) {
      console.error('Checkout error:', error.response?.data?.message || error.message);
    }
  }
});
</script>

<template>
  <h1>註冊</h1>
  <div class="flex gap12">
    <input type="email" placeholder="輸入你的電子郵件" v-model="signField.email" />
    <input type="password" placeholder="輸入你的密碼" v-model="signField.password" />
    <input type="name" placeholder="輸入你的暱稱" v-model="signField.nickname" />
    <button type="button" @click="signup">註冊</button>
  </div>

  <div class="flex gap12">
    <h1>登入</h1>
    <input type="email" placeholder="輸入你的電子郵件" v-model="signin.email" />
    <input type="password" placeholder="輸入你的密碼" v-model="signin.password" />
    <button type="button" @click="submit">提交</button>
    <p>token: {{ signinRes }}</p>
  </div>

  <div class="flex gap12">
    <h1>驗證</h1>
    <div v-if="user.uid">
      <p>username: {{ user.nickname }}</p>
      <p>uid: {{ user.uid }}</p>
    </div>
    <div v-else>
      你尚未登入
    </div>
  </div>

  <div class="flex gap12">
    <h1>登出</h1>
    <button type="button" @click="signout">登出</button>
  </div>
</template>

<style scoped>
.flex {
  display: grid;
}
.gap12 {
  gap: 12px;
}
input {
  width: 100%;
  height: 20px;
}
</style>
