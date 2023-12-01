import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

// contacts.js


const contactsPath = path.join('contacts.json');
const readResult = await fs.readFile(contactsPath);
const json = JSON.parse(readResult);

// TODO: задокументувати кожну функцію
export async function listContacts() {
	// ...твій код. Повертає масив контактів.
	// const readResult = await fs.readFile(contactsPath);
	// const json = JSON.parse(readResult);
	return console.log(json);
}

export async function getContactById(contactId) {
	// ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
	// const readResult = await fs.readFile(contactsPath);
	// const json = JSON.parse(readResult);
	const result = json.filter((id) => id.id === contactId);
	return console.log(result);
}

export async function removeContact(contactId) {
	// ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
	const index = json.findIndex((el) => el.id === contactId);
	const removeContact = json.splice(index, 1);
	const newData = JSON.stringify(json);
	fs.writeFile(contactsPath, newData, err => {
		// error checking
		if (err) throw err;

		console.log("New data added");
	});

	return console.log(removeContact);

}


export async function addContact(name, email, phone) {
	// ...твій код. Повертає об'єкт доданого контакту. 
	let newContact = {
		id: nanoid(),
		name: name,
		email: email,
		phone: phone,
	}
	json.push(newContact);
	const newData = JSON.stringify(json);
	fs.writeFile(contactsPath, newData, err => {
		// error checking
		if (err) throw err;

		console.log("New data added");
	});
	return console.log(newContact);
}
// addContact("kldfv", "lkndfv", "340854435");


