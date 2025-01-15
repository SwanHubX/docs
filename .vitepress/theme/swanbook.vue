<template>
  <div class="swanbook">
    <!-- 顶部区域 -->
    <header class="swanbook-header" :style="headerStyle">
      <div 
        class="header-background" 
        v-if="frontmatter.headerBgImage"
        :style="{
          backgroundImage: `url(${frontmatter.headerBgImage})`
        }"
      >
        <!-- 只在启用时显示蒙版 -->
        <div 
          v-if="frontmatter.headerOverlayEnabled !== false" 
          class="header-overlay"
          :style="{
            background: frontmatter.headerOverlay || 'rgba(0, 0, 0, 0.5)'
          }"
        ></div>
      </div>
      <div class="container">
        <h1>{{ frontmatter.title || 'SwanBook' }}</h1>
        <p v-if="frontmatter.tagline" class="tagline">{{ frontmatter.tagline }}</p>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="swanbook-main container">
      <!-- 可配置的布局类型 -->
      <div class="content-wrapper" :class="contentLayoutClass">
        <Content class="content" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

// 计算内容布局类名
const contentLayoutClass = computed(() => ({
  'layout-grid': frontmatter.value.contentLayout === 'grid',
  'layout-list': frontmatter.value.contentLayout === 'list',
  [`columns-${frontmatter.value.columns || 3}`]: true
}))

// 计算头部样式
const headerStyle = computed(() => ({
  color: frontmatter.value.headerColor || 'white',
  position: 'relative',
}))

console.log('Frontmatter:', frontmatter.value) // 添加调试信息
</script>

<style>
.swanbook {
  min-height: 100vh;
  background-color: var(--vp-c-bg);
}

.container {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
  padding: 0 24px;
}

/* 头部样式 */
.swanbook-header {
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.swanbook-header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.swanbook-header .tagline {
  font-size: 1.4rem;
  opacity: 0.9;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  margin: 0 auto;
}

/* 背景图片样式 */
.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 分离蒙版样式 */
.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* 主要内容区域 */
.swanbook-main {
  padding: 2rem 0;
}

/* 网格布局 */
.layout-grid {
  display: grid;
  gap: 2rem;
}

/* 列数配置 */
.columns-1 { grid-template-columns: 1fr; }
.columns-2 { grid-template-columns: repeat(2, 1fr); }
.columns-3 { grid-template-columns: repeat(3, 1fr); }
.columns-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
  .layout-grid {
    grid-template-columns: 1fr !important;
  }
}

/* 列表布局 */
.layout-list {
  max-width: 800px;
  margin: 0 auto;
}

/* 内容样式 */
.content :deep(h2) {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.content :deep(h2:hover) {
  transform: translateY(-4px);
}

.content :deep(h2 + p) {
  padding: 0 1.5rem 1.5rem;
  margin: -2rem 0 0;
  background: var(--vp-c-bg-soft);
  border-radius: 0 0 8px 8px;
}

/* 确保 VitePress 默认样式不影响我们的布局 */
.content :deep(.vp-doc) {
  padding: 0;
  background: transparent;
}
</style>
