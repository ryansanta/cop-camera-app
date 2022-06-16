import moment from 'moment';


async function getTime(){
  var date = moment()
        .utcOffset('-05:00')
        .format('MM/DD/YYYY hh:mm:ss a');
        console.log('Current timedate:', date);
}
getTime();
