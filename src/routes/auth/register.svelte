<script lang="ts">
	let email: string;
	let password: string;
	let name: string;
	let error: string = undefined;

	const register = async () => {
		error = undefined;
		const res = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({ email, password, name }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (res.ok) {
			window.location.href = '/admin'
		} else {
			error = 'Error occured';
		}
	};
</script>

<h1>Register page</h1>
<form on:submit|preventDefault={register}>
	<input bind:value={email} type="email" placeholder="Email" required />
	<input bind:value={name} type="text" placeholder="Name" required />
	<input bind:value={password} type="password" placeholder="Password" required minlength="10" />
	<button type="submit">Register</button>
</form>
{#if error}
	<p>{error}</p>
{/if}
