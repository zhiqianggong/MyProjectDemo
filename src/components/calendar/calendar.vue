<template>
  <div class="container">
    <h1>&nbsp;</h1>
    <div id="calendar">
      <div class="month">
        <ul>
          <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
          <li class="year-month" @click="pickYear(currentYear,currentMonth)">
            <span class="choose-year">{{ currentYear }}</span>
            <span class="choose-month">{{ currentMonth }} {{$t('calendar.month')}}</span>
          </li>
          <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
        </ul>
      </div>
      <ul class="weekdays">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li style="color:red">六</li>
        <li style="color:red">日</li>
      </ul>
      <ul class="days">
        <li
          v-for="(day,index) in days"
          :key="day.id"
          @click="addClass(index)"
          :class="{ classred:index==current}"
        >
          <!--今天-->
          <span
            v-if="day.getMonth()+1 != currentMonth"
            class="other-month"
            @click="pick(day)"
          >{{ day.getDate() }}</span>
          <span v-else>
            <!--今天-->
            <span
              v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()"
              class="active"
            >{{ day.getDate() }}</span>
            <span v-else>{{ day.getDate() }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      date: new Date(),
      current: 0,
      curindex: null,
      curYear: null,
      curMonth: null,
      curDay: null
    };
  },
  created: function() {
    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.date.getMonth() + 2;
    this.pickPre(this.currentYear, this.currentMonth);
    this.setIndex();
  },
  methods: {
    setIndex() {
      this.days.forEach((element, index) => {
        if (
          element.getFullYear() == new Date().getFullYear() &&
          element.getMonth() == new Date().getMonth() &&
          element.getDate() == new Date().getDate()
        ) {
          this.curindex = index;
        }
      });
      this.addClass(this.curindex);
    },
    addClass(index) {
      this.current = index;
    },
    initData: function(cur) {
      var date;
      if (cur) {
        date = new Date(cur);
      } else {
        date = new Date();
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.currentWeek = date.getDay(); // 1...6,0
      if (this.currentWeek == 0) {
        this.currentWeek = 7;
      }
      var str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      // console.log("today:" + str + "," + this.currentWeek);
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        // console.log("y:" + d.getDate());
        this.days.push(d);
      }
      for (var i = 1; i <= 42 - this.currentWeek; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push(d);
      }
      console.log(this.days.length);
      // console.log(this.days[0].getDate());
      if (this.curYear !== null) {
        // setTimeout(function() {
        //   this.days.forEach((element, index) => {
        //     console.log(this.curYear, this.curMonth, this.curDay);
        //     if (
        //       element.getFullYear() == this.curYear &&
        //       element.getMonth() == this.curMonth &&
        //       element.getDate() == this.curDay
        //     ) {
        //       this.curindex = index;
        //       console.log(index);
        //     }
        //   });
        //   this.addClass(this.curindex);
        // }, 1000);
        let _this = this;
        setTimeout(() => {
           console.log(_this.curDay);
          _this.days.forEach((element, index) => {
            // console.log(this.curYear, this.curMonth, this.curDay);
            if (
              element.getFullYear() == _this.curYear &&
              element.getMonth() == _this.curMonth - 1 &&
              element.getDate() == _this.curDay
            ) {
              _this.curindex = index;
            }
          });
          _this.addClass(_this.curindex);
        }, 10);
        
        // this.$nextTick(()=> {
        //   console.log(this.days[0].getDate())
        // this.days.forEach((element, index) => {
        //   // console.log(this.curYear, this.curMonth, this.curDay);
        //   if (
        //     element.getFullYear() == this.curYear &&
        //     element.getMonth() == this.curMonth &&
        //     element.getDate() == this.curDay
        //   ) {
        //     this.curindex = index;
        //     // console.log(index);
        //   }
        // });
        // this.addClass(this.curindex);
        // })
      }
    },
    clickPlck(date) {
      alert(
        this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      );
    },

    pick: function(date) {
      // console.log(date)
      // let curDate = null
      // date.setDate(0);
      // this.initData(this.formatDate(date.getFullYear(), date.getMonth() + 1, 1));

      // alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()));

      // console.log(date)
      // let curDate = null
      // date.setDate(0);
      // this.initData(this.formatDate(date.getFullYear(), date.getMonth() + 1, 1));

      // alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()));
      this.curYear = date.getFullYear();
      this.curMonth = date.getMonth() + 1;
      this.curDay = date.getDate();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      if (m < 10) m = m;
      if (this.currentMonth == 1) {
        if (m == 12) {
          this.pickPre(this.currentYear, 1);
        } else {
          this.pickNext(y, m - 1);
        }
      } else if (this.currentMonth == 12) {
        if (m == 1) {
          this.pickNext(this.currentYear, 12);
        } else {
          this.pickPre(y, m - 1);
        }
      } else {
        if (m < this.currentMonth) {
          this.pickPre(y, m + 1);
        } else if (m > this.currentMonth) {
          this.pickNext(y, m - 1);
        }
      }
    },
    pickPre: function(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickNext: function(year, month) {
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(42);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickYear: function(year, month) {
      alert(year + "," + month);
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      var y = year;
      var m = month;
      if (m < 10) m = "0" + m;
      var d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d;
    }
  }
};
</script>

<style type="text/css">
* {
  box-sizing: border-box;
}

ul {
  list-style-type: none;
}

body {
  font-family: Verdana, sans-serif;
  background: #e8f0f3;
}
#calendar {
  width: 300px;
  margin: 0 auto;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.month {
  width: 100%;
  background: #00b8ec;
}

.month ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.year-month {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.year-month:hover {
  background: rgba(150, 2, 12, 0.1);
}

.choose-year {
  padding-left: 20px;
  padding-right: 20px;
}

.choose-month {
  text-align: center;
  font-size: 1.2rem;
}

.arrow {
  padding: 30px;
}

.arrow:hover {
  background: rgba(100, 2, 12, 0.1);
}

.month ul li {
  color: white;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
}

ul li.classred span span {
  padding: 6px 10px;
  border-radius: 3px;
  background: #00b8ec;
  color: #fff;
}

.weekdays {
  margin: 0;
  padding: 10px 0;
  background-color: #00b8ec;
  display: flex;
  flex-wrap: wrap;
  color: #ffffff;
  justify-content: space-around;
}

.weekdays li {
  display: inline-block;
  width: 13.6%;
  text-align: center;
}

.days {
  padding: 0;
  background: #ffffff;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 14.2%;
  text-align: center;
  padding-bottom: 0;
  padding-top: 0;
  font-size: 1rem;
  color: #000;
}

.days li .other-month {
  padding: 5px;
  color: gainsboro;
  line-height: 30px;
}

.days li span {
  padding: 5px !important;
  /* color: gainsboro; */
  /* padding: 0 !important; */
  display: block;
  line-height: 20px;
}

.days li:hover {
  cursor: pointer;
}
</style>