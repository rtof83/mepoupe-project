import api from '../api';

const GetLog = async (route, setLoading, setData) => {
  setLoading(true);

  await api.get(route)
      .then(({ data }) => {
      setData(data);
    })
      .catch(e => {
      setData([]);
      console.log(e);
    });

  setLoading(false);
};

export default GetLog;
