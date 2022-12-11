import api from '../api';
import GetLog from './GetLog';

const DelLog = async (route, setLoading, setData) => {
  if (window.confirm('Atenção! Todos os dados serão excluídos.')) {
    await api.delete(route)
      .then(() => GetLog(route, setLoading, setData))
      .catch(e => alert(e));
  };
};

export default DelLog;
