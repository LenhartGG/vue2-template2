<template>
  <div style="padding:0 20px">
    <Row>
      <Col span="12">
        <hn-card :title="`title1`">
          <template slot="details">
            <Select v-model="modelCity" size="small" style="width:100px"  class="abs details">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </template>
          <hn-base-table
            :tableData="tableData"
            :columns="columns"
            :pagination="pagination"
            @onPageChange="onPageChange">
          </hn-base-table>
        </hn-card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getUserlist } from '@/request/getData.js';
export default {
  data() {
    return {
      cityList: [
          {
              value: 'New York',
              label: 'New York'
          },
          {
              value: 'London',
              label: 'London'
          },
          {
              value: 'Sydney',
              label: 'Sydney'
          },
          {
              value: 'Ottawa',
              label: 'Ottawa'
          },
          {
              value: 'Paris',
              label: 'Paris'
          },
          {
              value: 'Canberra',
              label: 'Canberra'
          }
      ],
      modelCity: 'New York',
      columns: [
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
      ],

      tableData: [],
      Userlist: [],
      pagination: {
        curPage: 1,
        pageSize: 10,
        total: 0,
      }
    }
  },
  computed: {
  },
  created() {
    this.loadData();
  },
  watch: {
    pagination: {
      handler() {
        this.tableData = this.setTableData()
      },
      deep: true,
    }
  },
  methods: {
    loadData() {
      getUserlist().then(res => {
        this.Userlist = res.data.data
        this.tableData = this.setTableData()
        this.setPagination()
      })
    },
    setPagination(curPage, pageSize) {
      let obj = {
        curPage: curPage || 1,
        pageSize: pageSize || 10,
        total: this.Userlist.length,
      }
      this.pagination = obj
    },
    setTableData() {
      let curPage = this.pagination.curPage
      let pageSize = this.pagination.pageSize
      let data = []
      data = this.Userlist.filter((item, index) => {
        return index > (curPage - 1) * pageSize && index <= curPage * pageSize
      })
      console.log(data);
      return data
    },
    onPageChange(page) {
      this.pagination = {
        curPage: page.curPage,
        pageSize: page.pageSize,
        total: this.Userlist.length,
      }
    }
  }
}
</script>

<style scoped>
.details {
  right: 20px;
}
</style>