<script>
	import { createForm } from "felte";
	import { validator } from "@felte/validator-zod";
	import entitySchema from "../../configs/schema.js";
	import EmailInput from "./components/EmailInput.svelte";
	import NameInput from "./components/NameInput.svelte";
	import SsnInput from "./components/SsnInput.svelte";

	const appName = "Test App";
	const schema = entitySchema;

	const submitValues = async (values) => {
		try {
			const response = await fetch("http://localhost:3009/list", {
				"method": "POST",
				"body": JSON.stringify(values),
				"headers": {
					"content-type": "application/json"
				}
			});

			const data = await response.json();
			console.log(data);
		} catch (err) {
			alert(err);
		} finally {
			console.log("Finished.");
		}
	};

	const { form, errors } = createForm({
		"extend": [validator({ schema })],
		onSuccess() {
			console.log("SUCCESS");
		},
		async onSubmit(values) {
			submitValues(values);
		}
	});

	const options = [
		{ "name": "Full Name", "type": "full_name" },
		{ "name": "Email Address", "type": "email_addr" },
		{ "name": "Social Security No.", "type": "doc_ssn" }
	];

	let selected = "";

	$: console.log("CURRENT SELECTION:", selected);
</script>

<main>
	<div id="errors-block">
		{#each Object.keys($errors) as error}
			{#if $errors[error]}
				<p>Warning: {$errors[error]} ({error})</p>
			{/if}
		{/each}
	</div>

	<h1>{appName}</h1>

	<h3>Choose Your PII Element:</h3>
	<select bind:value={selected}>
		{#each options as option}
			<option value={option.type}>
				{option.name}
			</option>
		{/each}
	</select>

	{#if selected}
		<form use:form>
			{#if selected === "full_name"}
				<NameInput />
			{:else if selected === "email_addr"}
				<EmailInput />
			{:else if selected === "doc_ssn"}
				<SsnInput />
			{/if}
			<button type="submit">Submit</button>
		</form>
	{/if}
</main>

<style>
	h3 {
		font-weight: 201;
	}
</style>
