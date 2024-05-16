import {executeQuery} from './db'


export const findUser = async (id: number) => {
    console.log(`Requesting a user with id ${id}...`);
    const query = `SELECT * FROM users WHERE id = $1`;
    const params = [id];
    const result = await executeQuery(query, params);
    return result;
  };

export default {findUser};