<script>
    import { createCar } from '$lib/utils/carFunctions'
	let id;
    let inputId;
    
    let car

	let data = {
		make: '',
		model: '',
		images: '',
		year: null,
		description: '',
		sold: false
	};

    const setId = async () => {
        id = await createCar(data)
    }

	

    async function getCar() {
		const url = '/api/entities/car/get-car';
		const res = await fetch(url, {
			method: 'POST',
			body: inputId,
		});

		car = await res.json();
        car = car.data;
	}
</script>

<input bind:value={data.make} type="text" placeholder={Object.keys(data)[0]} />
<input bind:value={data.model} type="text" placeholder={Object.keys(data)[1]} />
<input bind:value={data.images} type="text" placeholder={Object.keys(data)[2]} />
<input bind:value={data.year} type="number" placeholder={Object.keys(data)[3]} />
<input bind:value={data.description} type="text" placeholder={Object.keys(data)[4]} />
<label>
	<input bind:checked={data.sold} type="checkbox" />
	{Object.keys(data)[5]}
</label>
<button on:click={setId}>Submit</button>
{#if id}
	<div>Created Car:{id['id']}</div>
{/if}

<br>
<br>
<input bind:value={inputId} type="text" placeholder="get item by id">
<button on:click={getCar}>Get car</button>
{#if car}
    <div>{car['make']}</div>
{/if}
