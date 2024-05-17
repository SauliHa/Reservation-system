import {executeQuery} from './db'


export const findUser = async (id: number) => {
    console.log(`Requesting a user with id ${id}...`);
    const query = `SELECT * FROM users WHERE id = $1`;
    const params = [id];
    const result = await executeQuery(query, params);
    return result;
  };

  export const createUser = async (product) => {
    console.log(product)
    const id = uuidv4();
    const params = [id, ...Object.values(product)];
    const query = `INSERT INTO products (id, name, price) VALUES ($1, $2, $3)`
    console.log(`Inserting a new product ${params[0]}...`);
    const result = await executeQuery(query, params);
    console.log(`New product ${id} inserted succesfully.`);
    return result;
  };

