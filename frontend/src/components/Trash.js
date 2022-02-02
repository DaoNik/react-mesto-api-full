import api from '../utils/api';

export default function Trash() {
  api.fetch('https://api.pro100grog.students.nomoredomains.work/crash-test', {
    method: 'GET',
  });
}
