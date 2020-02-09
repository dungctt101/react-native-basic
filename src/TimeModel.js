export default class TimeModel {
  hours;
  minute;
  second;
  constructor(hours = 0, minute = 0, second = 0) {
    this.hours = hours;
    this.minute = minute;
    this.second = second;
  }
  getTime() {
    var hours = this.hours;
    var minute = this.minute;
    var second = this.second;
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (second < 10) {
      second = '0' + second;
    }
    return hours + ':' + minute + ':' + second;
  }
  getTimeNotSecond() {
    var hours = this.hours;
    var minute = this.minute;
    var second = this.second;
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    return hours + ':' + minute ;
  }
}
