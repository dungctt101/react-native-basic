
import { Dimensions, Platform } from "react-native";
import DateModel from "./DateModel";
import TimeModel from "./TimeModel";
const sizeWindow = Dimensions.get("window");

const formatDate = "YYYY-MM-DDTHH:MM:SS";
const stringIsEmpty = string => {
  if (objectIsNull(string) || string === "") {
    return true;
  } else {
    return false;
  }
};
const objectIsNull = object => {
  if (object === null || object === undefined || object === "(null)") {
    return true;
  } else {
    return false;
  }
};
const arrayIsEmpty = array => {
  if (objectIsNull(array) || array.length === 0) {
    return true;
  } else {
    return false;
  }
};
const getPaddingBonus = () => {
  if (Platform.OS === "ios") {
    if (isIphoneOverX) {
      return 40;
    } else {
      return 10;
    }
  } else {
    return 0;
  }
};

const isIphoneOverX = () => {
  return (
    Platform.OS === "ios" &&
    (isIPhoneXs_X(sizeWindow) ||
      isIPhoneXr_XsMax(sizeWindow) ||
      isIPhone11(sizeWindow))
  );
};

const isIPhone11 = sizeWindow => {
  return sizeWindow.height == 1194 || sizeWindow.width == 1194;
};

const isIPhoneXs_X = sizeWindow => {
  return sizeWindow.height == 812 || sizeWindow.width == 812;
};

const isIPhoneXr_XsMax = sizeWindow => {
  return sizeWindow.height == 896 || sizeWindow.width == 896;
};

const elevationShadowStyle = elevation => {
  if (Platform.OS === "ios") {
    return {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.4,
      shadowRadius: 0.8 * elevation
    };
  } else {
    return {
      elevation
    };
  }
};

const elevationShadowBottomStyle = elevation => {
  if (Platform.OS === "ios") {
    return {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 0.7 * elevation },
      shadowOpacity: 0.3,
      shadowRadius: 0.4 * elevation
    };
  } else {
    return {
      elevation
    };
  }
};
const getCurrentTime = () => {
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  const timeModel = new TimeModel(hours, min, sec);
  return timeModel;
};
const getCurrentDateTime = () => {
  var dayOfWeek = new Date().getDay();
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  const dateModel = new DateModel(
    year,
    month,
    date,
    dayOfWeek,
    hours,
    min,
    sec
  );
  return dateModel;
};
const parseDateTime = (format, dateStr) => {
  (year = 0), (month = 0), (date = 0), (hours = 0), (minute = 0), (second = 0);

  var _listDate = dateStr.split("T", 2);
  var _listFormat = format.split("T", 2);

  const _date = _listDate[0];
  const listFormatDate = _listFormat[0].split("-", 3);
  const listDate = _date.split("-", 3);
  if (listFormatDate.length === 3) {
    for (i = 0; i < listFormatDate.length; i++) {
      if (listFormatDate[i] === "DD") {
        date = listDate[i];
      }
      if (listFormatDate[i] === "MM") {
        month = listDate[i];
      }
      if (listFormatDate[i] === "YYYY") {
        year = listDate[i];
      }
    }
  }
  const _time = _listDate[1].split(".", 2)[0];
  const listTime = _time.split(":", 3);
  const listFormatTime = _listFormat[1].split(":", 3);
  if (listFormatTime.length === 3) {
    for (i = 0; i < listFormatTime.length; i++) {
      if (listFormatTime[i] === "HH") {
        hours = listTime[i];
      }
      if (listFormatTime[i] === "MM") {
        minute = listTime[i];
      }
      if (listFormatTime[i] === "SS") {
        second = listTime[i];
      }
    }
  }
  const dateModel = new DateModel(year, month, date, 0, hours, minute, second);
  return dateModel;
};

const parseTime = time => {
  (hours = 0), (minute = 0), (second = 0);
  var listTime = time.split(":", 2);
  if (!arrayIsEmpty(listTime) && listTime.length >= 2) {
    hours = listTime[0];
    minute = listTime[1];
  }

  return new TimeModel(hours, minute, second);
};
const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export {
  getRandomColor,
  parseTime,
  parseDateTime,
  getCurrentDateTime,
  getCurrentTime,
  elevationShadowBottomStyle,
  getPaddingBonus,
  elevationShadowStyle,
  isIphoneOverX,
  formatDate,
  stringIsEmpty,
  arrayIsEmpty,
  objectIsNull
};
