<template>
<div class="tree_list">
  <MyTree />
</div>
</template>

<script>
import MyTree from '@/components/TreeList/MyTree';
export default {
  components: {
    MyTree
  }
}
</script>

<style>
.tree_list {
  text-align: left;
}
</style>