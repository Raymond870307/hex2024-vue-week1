import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'hex2024-vue-week1', // 将 <REPO_NAME> 替换为你的 GitHub 仓库名称
})
