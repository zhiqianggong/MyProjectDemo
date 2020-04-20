<template>
  <div>
      <el-button @click="outTab('outTable','订单记录')" type="info" size="small">导出数据</el-button> 
      <!-- 传入table id和标题 -->
  </div>
</template>

<script>
import FileSaver from "file-saver"; //引入xlsx
import XLSX from "xlsx"; //引入xlsx
export default {
  data() {},
  methods: {
    outTab(id,title) {
      let fix = document.querySelector(".el-table__fixed");
      let wb;
      if (fix) {
        wb = XLSX.utils.table_to_book(
          document.querySelector("#" + id).removeChild(fix)
        );
        document.querySelector("#" + id).appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector("#" + id));
      }
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          title + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  }
};
</script>

<style>
</style>