<template>
  <div class="base-table">
    <Table border :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="showItem(row, index)">View</Button>
        <Button type="error" size="small" @click="removeItem(row, index)">Delete</Button>
      </template>
    </Table>

    <Page :current="pagination.curPage" :total="pagination.total" size="small" show-elevator show-sizer @on-change="handleChangePage" />
  </div>
</template>

<script>

export default {
  name: 'Vue2Template2Basetable',
  props: {
    // 分页器配置
    pagination: {
      type: Object,
      required: true,
      default() {
        return {
          total: 0,
          curPage: 1,
          pageSize: 10,
        }
      },
    },
    // 表格列的配置
    columns: {
      type: Array,
      required: true,
      default() {
        return [
          {
            title: 'ID',
            key: 'id'
          },
          {
            title: 'Name',
            slot: 'name'
          },
          {
            title: 'Address',
            key: 'address'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ]
      }
    },
    // 表格数据
    tableData: {
      type: Array,
      required: true,
      default: [],
    },
  },
  watch: {
    tableData(data) {
      console.log(data);
    }
  },
  data() {
    return {
    };
  },
  computed: {
    data() {
      return this.tableData
    }
  },
  methods: {
    handleChangePage(page) {
      this.$emit('onPageChange', {
        curPage: page,
        pageSize: 10,
      })
    },
    showItem(index, row) {
      console.log(index, row)
    },
    removeItem(index, row) {
      console.log(index, row)
    }
  }
};
</script>

<style lang="less" scoped>
.base-table {
  padding: 10px 20px;
}
</style>