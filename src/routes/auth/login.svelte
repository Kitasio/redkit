<script lang="ts">
	let email: string;
	let password: string;
	let error: string = undefined;

	const login = async () => {
		error = undefined;

		const res = await fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (res.ok) {
            window.location.href = '/admin'
		} else {
			error = 'Error occured';
		}
	};
</script>

<h1>Login page</h1>
<form on:submit|preventDefault={login}>
	<input bind:value={email} type="email" placeholder="Email" required />
	<input bind:value={password} type="password" placeholder="Password" required minlength="10" />
	<button type="submit">Login</button>
</form>
{#if error}
	<p>{error}</p>
{/if}
