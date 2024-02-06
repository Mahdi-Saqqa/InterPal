const utilities = {
    generateRandomNumber() {
      const minm = 100000;
      const maxm = 999999;
      return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    },
  
    isOver18(birthDay) {
      const today = new Date();
  
      // Convert birthDay to a Date object
      const birthDayDate = new Date(birthDay);
  
      // Check if birthDayDate is a valid Date object
      if (!(birthDayDate instanceof Date && !isNaN(birthDayDate))) {
        return false; // Invalid birth date
      }
  
      const minimumAgeDate = new Date(today);
      minimumAgeDate.setFullYear(today.getFullYear() - 18);
  
      return birthDayDate <= minimumAgeDate;
    }
  };
  
  module.exports = utilities;
  