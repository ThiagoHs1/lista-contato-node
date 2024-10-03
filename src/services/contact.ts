
import { promises } from "fs";

const dataSource = './data/list.txt'

export const getContacts = async () => {
    let list: string[] = [];
    try {
        const data = await promises.readFile(dataSource, 'utf8');
        list = data.split('\n');
    } catch (err) {
        console.error(err);
    }
    return list;
}

export const createContact = async (name: string) => {
    let list = await getContacts();
    list.push(name);

    await promises.writeFile(dataSource, list.join('\n'));

}


export const deleteContact = async (name: string) => {
    let list = await getContacts();

    list = list.filter(item => item.toLowerCase() !== (name as string).toLowerCase());

    await promises.writeFile(dataSource, list.join('\n'));

}