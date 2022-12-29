const headers = [
  {label: 'Id', key: 'id'},
  {label: 'Name', key: 'name'},
  {label: 'Email ', key: 'email'},
  {label: 'Gender', key: 'gender'},
  {label: 'Status', key: 'status'},
];

function downloadCSV(data: any) {
  const csvReport = {
    data: data,
    headers: headers,
    filename: 'user_list.csv',
  };

  return csvReport;
}

export default downloadCSV;
