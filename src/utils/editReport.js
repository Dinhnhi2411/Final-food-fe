
function editReport(array, typeArr) {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;

  let result = [];
  if (array?.length === 1) {
    result = array[0];
  } else {
    result = array?.reduce((acc, curr, idx, array) => {
      if (curr.month === currentMonth) {
        acc[typeArr] = curr[typeArr];
      }
      if (curr.month === currentMonth - 1) {
        acc.totalLastMonth = curr.count || curr[typeArr];
      }

      return acc;
    }, {});
  }
  return result;
}

export default editReport;
