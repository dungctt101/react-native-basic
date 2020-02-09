export default class DateModel {
  year;
  month;
  date;
  dayOfWeek;
  hours;
  minute;
  second;
  constructor(
    year = 0,
    month = 0,
    date = 0,
    dayOfWeek = 0,
    hours = 0,
    minute = 0,
    second = 0
  ) {
    this.year = year;
    this.month = month;
    this.date = date;
    this.dayOfWeek = dayOfWeek;
    this.hours = hours;
    this.minute = minute;
    this.second = second;
  }

  getDateOfWeek() {
    var month = this.month;
    var date = this.date;
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }
    const days = [
      "CN",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7"
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return (
      days[this.dayOfWeek] +
      ", " +
      date +
      "/" +
      month +
      "/" +
      this.year
    );
  }
  getDate() {
    return this.date + "/" + this.month + "/" + this.year;
  }
  getTimeNormal() {
    return hours + ":" + minute + ":" + second;
  }
  getTime() {
    var hours = this.hours;
    var minute = this.minute;
    var second = this.second;
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    return hours + ":" + minute + ":" + second;
  }
}
