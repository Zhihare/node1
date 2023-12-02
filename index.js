import { listContacts, getContactById, removeContact, addContact } from './contacts.js';
import { Command } from 'commander';

const program = new Command();
program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			const list = await listContacts();
			console.log(list);
			break;

		case 'get':
			const get = await getContactById(id);
			console.log(get);
			break;

		case 'add':
			const add = await addContact(name, email, phone);
			console.log(add);
			break;

		case 'remove':
			const remove = await removeContact(id);
			console.log(remove);
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}

invokeAction(argv);