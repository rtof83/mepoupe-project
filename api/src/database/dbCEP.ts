import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

type LogCEP = {
  id: string,
  cep: string,
  log: string,
  uf: string,
  datetime: Date
};

type Schema = {
  logCEP: LogCEP[];
};

let dbCEP: lowdb.LowdbSync<Schema>;

export const createConnCEP = async () => {
  const adapter = new FileSync<Schema>('./src/database/cep.json');
  dbCEP = lowdb(adapter);
  dbCEP.defaults({ logCEP: [] }).write();
};

export const getConnCEP = () => dbCEP;
