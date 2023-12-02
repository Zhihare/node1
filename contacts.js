import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

// contacts.js


const contactsPath = path.join('db', 'contacts.json');

// TODO: задокументувати кожну функцію
export async function listContacts() {
	const readResult = await fs.readFile(contactsPath);
	const json = JSON.parse(readResult);
	return json
}

export async function getContactById(contactId) {
	// ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
	const json = await listContacts();
	const result = json.find((id) => id.id === contactId);
	return result || null;
}

export async function removeContact(contactId) {
	// ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
	const json = await listContacts();
	const index = json.findIndex((el) => el.id === contactId);
	if (index !== -1) {
		const removeContact = json.splice(index, 1);
		const newData = JSON.stringify(json);
		fs.writeFile(contactsPath, newData, err => {
			// error checking
			if (err) throw err;
			console.log("New data added");
		});
		return removeContact;
	} else {
		return null;
	}


}


export async function addContact(name, email, phone) {
	// ...твій код. Повертає об'єкт доданого контакту. 
	const json = await listContacts();

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
	return newContact;
}



