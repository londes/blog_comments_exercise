import airplane from "airplane"
import Airtable from "airtable"

export default airplane.task(
	{
		slug: "get_airtable_assignments",
		name: "Get Airtable assignments",
	},
	// This is your task's entrypoint. When your task is executed, this
	// function will be called.
	async () => {
		
		console.log('in async')
		let data: Array<any> = []
		var base = new Airtable({apiKey: 'patEYp2SibdcMbAja.5e45d430a04d8651095c81d933a5432465443e37ee3f3dcfa1dc67ac8a1e6559'}).base('appRwVDwo7wPhV87g');

		await base('Tasks').select({
			// Selecting the first 3 records in Grid view:
			maxRecords: 3,
			view: "Grid view"
		}).eachPage(function page(records, fetchNextPage) {
			// This function (`page`) will get called for each page of records.
		
			records.forEach(function(record) {
				const newRecord = {
					id: record.get('id'),
					reviewer_name: record.get('reviewer_name'),
					assigned_comments: record.get('assigned_comment_ids')
				}
				data.push(newRecord)
				//console.log('Retrieved', record.get('id'));
			});
		
			// To fetch the next page of records, call `fetchNextPage`.
			// If there are more records, `page` will get called again.
			// If there are no more records, `done` will get called.
			fetchNextPage();
		});
		console.log(data)
		// const assignmentMap = data.reduce((acc, currentRow) => {
		// 	const {reviewer_name, comment_id} = currentRow;
		// 	// check if the name already exists in the object
		// 	// if so push the value on, if not create a new array
		// 	if (acc[reviewer_name]) {
		// 	  acc[reviewer_name].push(comment_id)
		// 	} else {
		// 	  acc[reviewer_name] = [comment_id];
		// 	}
		// 	return acc
		//   }, {})
		//   Object.entries(assignmentMap).map(([key, value]) => {
		// 	return {reviewer_name: key, comment_ids: value}
		//   })
		

		// const data = [
		// 	{ id: 1, name: "Gabriel Davis", role: "Dentist" },
		// 	{ id: 2, name: "Carolyn Garcia", role: "Sales" },
		// 	{ id: 3, name: "Frances Hernandez", role: "Astronaut" },
		// 	{ id: 4, name: "Melissa Rodriguez", role: "Engineer" },
		// 	{ id: 5, name: "Jacob Hall", role: "Engineer" },
		// 	{ id: 6, name: "Andrea Lopez", role: "Astronaut" },
		// ];

		// Sort the data in ascending order by name.
		// data.sort((u1, u2) => {
		// 	return u1.name.localeCompare(u2.name);
		// });

		// You can return data to show output to users.
		// Output documentation: https://docs.airplane.dev/tasks/output
		return data;
	}
)
