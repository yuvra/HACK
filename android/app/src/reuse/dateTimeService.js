const dateTimeService = {
  

  getFormattedDateString : (utcDateString, hourFormat, monthFormat,
    yearFormat) => {

monthFormat = monthFormat || 'MM';
hourFormat = (typeof hourFormat === 'undefined') ? 12 : hourFormat;
yearFormat = yearFormat || '-Y';

let utcDate = null;
let hour = null;
let min = null;
let month = null;
let error = null;
let hFormat = '';
let formattedDateString = '';
const dateObject = new Date(utcDateString);

// Set the Month.
month = dateObject.getUTCMonth();
formattedDateString = (monthFormat === 'MM') ? dateTimeService.getMonthAbr(month) + ' ' :
(monthFormat === 'MMMM') ? dateTimeService.getMonth(month) + ' ' : (monthFormat === '-M') ? ' ' : null;
if (formattedDateString === null) {
error = 'Invalid monthFormat provided.';
}

if (error === null) {
// Set the Date.
utcDate = dateObject.getUTCDate();
formattedDateString += (utcDate < 10 ? '0' : '') + utcDate;
formattedDateString += (yearFormat === '-Y') ? ', ' : ' ';
}

if (error === null && hourFormat !== 0) {
hour = dateObject.getUTCHours();
hourFormat = parseInt(hourFormat, 10);

if (Number.isNaN(hourFormat) || (hourFormat !== 12 && hourFormat !== 24)) {
error = 'Invalid hourFormat provided.';
}
}

if (error === null && yearFormat !== '-Y' && yearFormat !== 'YYYY') {
error = 'Invalid yearFormat provided.';
}

// Set the year.
if (error === null && yearFormat !== '-Y') {
formattedDateString += dateObject.getUTCFullYear() + ', ';
}

// Set the time.
if (error === null && hourFormat !== 0) {
if (hourFormat === 12 && hour >= 12) {
hour = hour - 12;
if (hour === 0) {
hour = 12;
}
hFormat = 'PM';
} else if (hourFormat === 12 && hour < 12) {
if (hour === 0) {
hour = 12;
}
hFormat = 'AM';
}
formattedDateString += (hourFormat === 24 && hour < 10 ? '0' : '') + hour + ':';

min = dateObject.getUTCMinutes();
formattedDateString += (min < 10 ? '0' : '') + min + ((hourFormat === 12) ? (' ' + hFormat) : '') + ' ';
}

// Throw the error, if any.
if (error !== null) {
throw new Error(error);
}

// Return the formatted string.
return formattedDateString.trim();

   },


convertTZTimeToTimeString: (tzDateTimeString) => {

const dateTimeAndTZ = [];

tzDateTimeString = tzDateTimeString.toLowerCase();
const dateTimeArr = tzDateTimeString.split('t');

if (dateTimeArr.length !== 2) {

return dateTimeAndTZ;

}

let sign;
if (dateTimeArr[ 1 ].indexOf('+') !== -1) {
sign = '+';
} else if (dateTimeArr[ 1 ].indexOf('-') !== -1) {
sign = '-';
}

if (!sign) {

dateTimeAndTZ[ 0 ] = tzDateTimeString.toUpperCase();
dateTimeAndTZ[ 1 ] = 0;

return dateTimeAndTZ;

}

const timeTZArr = dateTimeArr[ 1 ].split(sign);
if (timeTZArr.length === 2) {

dateTimeAndTZ[ 0 ] = (dateTimeArr[ 0 ] + 't' + timeTZArr[ 0 ] + 'z').toUpperCase();
const offsetArray = timeTZArr[ 1 ].split(':').map((currentVal) => {

return parseInt(currentVal, 10);

});
dateTimeAndTZ[ 1 ] = parseInt(sign +
((offsetArray.length === 2) ? (offsetArray[ 0 ] * 60 + offsetArray[ 1 ]) : 0), 10);
}

return dateTimeAndTZ;

},

getMonthAbr : (month) => {

  let monthAbr = '';

  switch (month) {

    case 0:
      // this.translateService.get('DATE-TIME.JAN')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

        monthAbr = 'Jan';
      return monthAbr;

    case 1:
      // this.translateService.get('DATE-TIME.FEB')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

        monthAbr = 'Feb';
      return monthAbr;

    case 2:
      // this.translateService.get('DATE-TIME.MAR')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

        monthAbr = 'Mar';
      return monthAbr;

    case 3:
      // this.translateService.get('DATE-TIME.APR')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

        monthAbr = 'Apr';
      return monthAbr;

    case 4:
      // this.translateService.get('DATE-TIME.MAY')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

        monthAbr = 'May';
      return monthAbr;

    case 5:
      // this.translateService.get('DATE-TIME.JUN')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

        monthAbr = 'Jun';
      return monthAbr;

    case 6:
      // this.translateService.get('DATE-TIME.JUL')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

        monthAbr = 'Jul';
      return monthAbr;

    case 7:
      // this.translateService.get('DATE-TIME.AUG')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

        monthAbr = 'Aug';
      return monthAbr;

    case 8:
      // this.translateService.get('DATE-TIME.SEP')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

      monthAbr = 'Sep';
      return monthAbr;

    case 9:
      // this.translateService.get('DATE-TIME.OCT')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

        monthAbr = 'Oct';
      return monthAbr;

    case 10:
      // this.translateService.get('DATE-TIME.NOV')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

        monthAbr = 'Nov';
      return monthAbr;

    case 11:
      // this.translateService.get('DATE-TIME.DEC')
      //   .subscribe((localizedStr) => monthAbr = localizedStr);

        monthAbr = 'Dec';
      return monthAbr;

  }

},




getMonth : (month) => {

  let monthAbr = '';

  switch (month) {

    case 0:
      // this.translateService.get('DATE-TIME.JANUARY')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'January';
      return monthAbr;

    case 1:
      // this.translateService.get('DATE-TIME.FEBRUARY')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'February';

      return monthAbr;

    case 2:
      // this.translateService.get('DATE-TIME.MARCH')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'March';
      return monthAbr;

    case 3:
      // this.translateService.get('DATE-TIME.APRIL')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'April';
      return monthAbr;

    case 4:
      // this.translateService.get('DATE-TIME.MAY')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'May';
      return monthAbr;

    case 5:
      // this.translateService.get('DATE-TIME.JUNE')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'June';
      return monthAbr;

    case 6:
      // this.translateService.get('DATE-TIME.JULY')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'July';
      return monthAbr;

    case 7:
      // this.translateService.get('DATE-TIME.AUGUST')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'August';
      return monthAbr;

    case 8:
      // this.translateService.get('DATE-TIME.SEPTEMBER')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'September';
      return monthAbr;

    case 9:
      // this.translateService.get('DATE-TIME.OCTOBER')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'October';
      return monthAbr;

    case 10:
      // this.translateService.get('DATE-TIME.NOVEMBER')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'November';
      return monthAbr;

    case 11:
      // this.translateService.get('DATE-TIME.DECEMBER')
      //   .subscribe((localizedStr: string) => monthAbr = localizedStr);

        monthAbr = 'December';
      return monthAbr;

  }

}

}

 

export default dateTimeService;