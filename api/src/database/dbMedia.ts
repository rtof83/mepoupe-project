import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

type LogMedia = {
  id: string,
  num1: string,
  num2: string,
  avg: string,
  datetime: Date
};

type Schema = {
  logMedia: LogMedia[];
};

let dbMedia: lowdb.LowdbSync<Schema>;

export const createConnMedia = () => {
  const adapter = new FileSync<Schema>('./src/database/media.json');
  dbMedia = lowdb(adapter);
  dbMedia.defaults({ logMedia: [] }).write();
};

export const getConnMedia = () => dbMedia;
